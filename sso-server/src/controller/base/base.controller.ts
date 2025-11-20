import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { LogService } from "../../services/helper/log.service";
import { ExceptionError, ProcessError } from "../../shared/utils/response.util";

export class BaseController {
  public readonly logger = new LogService();

  BadRequest(message: string = "Bad Request", code: number = 400) {
    const procesErr = ProcessError(message, code);
    return new BadRequestException(procesErr);
  }
  ExceptionError(apiPath: string = "", error?: any) {
    const ex = ExceptionError("Internal Server Error");
    this.logger.exceptionErrorLog(apiPath, ex.message, error);
    throw new InternalServerErrorException(ex);
  }

  NotFound(message: string = "Not Found", code: number = 404) {
    const procesErr = ProcessError(message, code);
    return new NotFoundException(procesErr);
  }

  Forbidden(message: string = "Forbidden", code: number = 403) {
    const procesErr = ProcessError(message, code);
    return new ForbiddenException(procesErr);
  }

  Conflict(message: string = "Conflict", code: number = 409) {
    const procesErr = ProcessError(message, code);
    return new ConflictException(procesErr);
  }

  ConvertMessageToLange(code: "GB404", lang: string = "vn") {
    if (lang === "vn") {
      return "Không tìm thấy dữ liệu";
    }
    return "Data not found";
  }
}
