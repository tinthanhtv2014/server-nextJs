import { Controller, Post, Body, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("System")
@ApiBearerAuth("access-token") // dùng token đã khai báo ở swagger
@Controller("system")
export class SystemController {
  @Get()
  @ApiOperation({ summary: "Get all system" })
  async findAll() {
    return ["ctm", "food"];
  }
}
