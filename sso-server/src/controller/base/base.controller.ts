import { BadRequestException } from "@nestjs/common";

export class BaseController {
  badRequest(message: string = "Bad Request", code: number = 400) {
    throw new BadRequestException({
      statusCode: code,
      message,
    });
  }
}
