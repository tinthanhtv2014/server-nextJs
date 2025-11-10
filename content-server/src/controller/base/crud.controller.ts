import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  Patch,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiExtraModels,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";
import { BaseController } from "./base.controller";
import {
  Success,
  ProcessError,
  NotfoundError,
} from "../../shared/utils/response.util";
export function BaseCrud<TService>(
  primaryKey: string,
  createDto: any,
  updateDto: any
) {
  class CrudBaseController extends BaseController {
    constructor(public readonly service: TService) {
      super();
    }

    @Post("create")
    @ApiOperation({ summary: "Create new record" })
    @ApiBody({ type: createDto })
    async create(@Body() body: any) {
      const result = await (this.service as any).create(body);
      return result;
    }

    @Get("get-list")
    @ApiQuery({
      name: "isEncrypted",
      required: false,
      type: Boolean,
      description: "Set true if you want the response to be encrypted",
    })
    @ApiOperation({ summary: "Get list of records" })
    async getList(@Query() query?: any) {
      const result = await (this.service as any).getList(query);
      const total = Array.isArray(result) ? result.length : result?.total;
      const isEncrypted =
        query?.encrypted === "true" || query?.isEncrypted === "true"
          ? true
          : false;
      return {
        status: 200,
        message: "Get list successfully",
        isEncrypted: isEncrypted,
        resultApi: result,
        total,
      };
    }

    @Get(`find-one/:${primaryKey}`)
    @ApiQuery({
      name: "isEncrypted",
      required: false,
      type: Boolean,
      description: "Set true if you want the response to be encrypted",
    })
    @ApiOperation({ summary: `Get one record by ${primaryKey}` })
    async findOne(@Param(primaryKey) value: string, @Query() query?: any) {
      const result = await (this.service as any).findOne(primaryKey, value);
      const isEncrypted =
        query?.encrypted === "true" || query?.isEncrypted === "true"
          ? true
          : false;
      return {
        status: 200,
        message: "Get one successfully",
        isEncrypted: isEncrypted,
        resultApi: result,
      };
    }

    @Put(`update/:${primaryKey}`)
    @ApiOperation({ summary: `Update one record by ${primaryKey}` })
    @ApiBody({ type: updateDto })
    async update(@Param(primaryKey) value: string, @Body() body: any) {
      const result = await (this.service as any).update(
        primaryKey,
        value,
        body
      );

      return result;
    }

    @Patch("soft-delete/:id")
    @ApiOperation({ summary: `Soft delete record by ${primaryKey}` })
    async softDelete(@Param("id") id: string) {
      const result = await (this.service as any).softDelete({
        [primaryKey]: id,
      });
      return Success(result, "Xóa mềm thành công");
    }

    @Delete("delete/:id")
    @ApiOperation({ summary: `Hard delete record by ${primaryKey}` })
    async delete(@Param("id") id: string) {
      const result = await (this.service as any).delete({
        [primaryKey]: id,
      });
      return result;
    }
  }

  // 👇 bắt buộc để swagger render DTO
  ApiExtraModels(createDto, updateDto)(CrudBaseController);

  return CrudBaseController;
}
