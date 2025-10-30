import {
  Injectable,
  NestMiddleware,
  ForbiddenException,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { FastifyRequest } from "fastify";
import * as jwt from "jsonwebtoken";
import { UserService } from "../services/admin/user.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: FastifyRequest, _res: any, next: () => void) {
    next();
    return;
    try {
      const authHeader = req.headers.authorization as string;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ForbiddenException("Bạn không có quyền truy cập");
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        throw new ForbiddenException("Token không hợp lệ");
      }

      let decoded: any;
      try {
        decoded = jwt.verify(token, process.env.SECRET_KEY!);
      } catch (err: any) {
        if (err.name === "TokenExpiredError") {
          throw new UnauthorizedException("Token hết hạn");
        } else {
          throw new ForbiddenException("Token không hợp lệ");
        }
      }

      const user = await this.userService.getUserById(decoded.userId);
      console.log("user", user);
      if (!user || user.privateKey !== decoded.privateKey) {
        throw new ForbiddenException("Token không hợp lệ");
      }

      // Gắn user vào request
      (req as any).user = user;

      next();
    } catch (err) {
      console.error(err);
      // Nếu là exception NestJS, nó sẽ tự trả code, còn không thì trả 500
      if (
        err instanceof ForbiddenException ||
        err instanceof UnauthorizedException
      ) {
        throw err;
      } else {
        throw new InternalServerErrorException("Lỗi server khi xác thực token");
      }
    }
  }
}
