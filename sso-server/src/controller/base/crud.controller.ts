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
import { ApiOperation, ApiExtraModels, ApiBody } from "@nestjs/swagger";
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
      try {
        const result = await (this.service as any).create(body);
        return result;
      } catch (error) {
        return this.ExceptionError(
          `/api/v1/admin/${this.service}/create`,
          error
        );
      }
    }

    @Get("get-list")
    @ApiOperation({ summary: "Get list of records" })
    async getList(@Query() query?: any) {
      try {
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
      } catch (error) {
        return this.ExceptionError(
          `/api/v1/admin/${this.service}/get-list`,
          error
        );
      }
    }

    @Get(`find-one/:${primaryKey}`)
    @ApiOperation({ summary: `Get one record by ${primaryKey}` })
    async findOne(@Param(primaryKey) value: string, @Query() query?: any) {
      try {
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
      } catch (error) {
        return this.ExceptionError(
          `/api/v1/admin/${this.service}/find-one`,
          error
        );
      }
    }

    @Put(`update/:${primaryKey}`)
    @ApiOperation({ summary: `Update one record by ${primaryKey}` })
    @ApiBody({ type: updateDto })
    async update(@Param(primaryKey) value: string, @Body() body: any) {
      try {
        const result = await (this.service as any).update(
          primaryKey,
          value,
          body
        );

        return result;
      } catch (error) {
        return this.ExceptionError(
          `/api/v1/admin/${this.service}/update`,
          error
        );
      }
    }

    @Patch("soft-delete/:id")
    @ApiOperation({ summary: `Soft delete record by ${primaryKey}` })
    async softDelete(@Param("id") id: string) {
      try {
        const result = await (this.service as any).softDelete({
          [primaryKey]: id,
        });
        return Success(result, "Xóa mềm thành công");
      } catch (error) {
        return this.ExceptionError(
          `/api/v1/admin/${this.service}/soft-delete`,
          error
        );
      }
    }

    @Delete("delete/:id")
    @ApiOperation({ summary: `Hard delete record by ${primaryKey}` })
    async delete(@Param("id") id: string) {
      try {
        const result = await (this.service as any).delete({
          [primaryKey]: id,
        });
        return result;
      } catch (error) {
        return this.ExceptionError(
          `/api/v1/admin/${this.service}/delete`,
          error
        );
      }
    }
  }

  // 👇 bắt buộc để swagger render DTO
  ApiExtraModels(createDto, updateDto)(CrudBaseController);

  return CrudBaseController;
}
