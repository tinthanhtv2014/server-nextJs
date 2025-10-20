import { Controller, Post, Body, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags('System')
@Controller('system')
export class SystemController {
  @Get()
  @ApiOperation({ summary: 'Get all system' })
  async  findAll() {
    return ["ctm","food"];
  }
}
