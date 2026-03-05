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
  updateDto: any,
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
          error,
        );
      }
    }

    @Get("get-list")
    @ApiOperation({ summary: "Get list of records" })
    @ApiQuery({
      name: "isEncrypted",
      required: false,
      type: Boolean,
      description: "Return encrypted data",
      example: false,
    })
    @ApiQuery({
      name: "search",
      required: false,
      type: String,
      description: "Search keyword",
      example: "",
    })
    @ApiQuery({
      name: "pageCurrent",
      required: false,
      type: Number,
      description: "Current page number",
      example: 1,
    })
    @ApiQuery({
      name: "pageSize",
      required: false,
      type: Number,
      description: "Number of records per page",
      example: 10,
    })
    @ApiQuery({
      name: "sortList",
      required: false,
      type: String,
      description: "Sort fields",
      example: JSON.stringify([
        { key: "firstName", value: "asc" },
        { key: "lastName", value: "desc" },
      ]),
    })
    async getList(@Query() query?: any) {
      try {
        query.pageCurrent = Number(query?.pageCurrent || 1);
        query.pageSize = Number(query?.pageSize || 10);
        query.skip = (query.pageCurrent - 1) * query.pageSize;
        query.limit = query.pageSize;
        query.sortList = query.sortList ? JSON.parse(query.sortList) : [];
        query.search = query.search ? query.search : undefined;
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
          error,
        );
      }
    }

    @Get(`find-one/:${primaryKey}`)
    @ApiOperation({ summary: `Get one record by ${primaryKey}` })
    @ApiQuery({
      name: "isEncrypted",
      required: false,
      type: Boolean,
      description: "Return encrypted data",
    })
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
          error,
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
          body,
        );

        return result;
      } catch (error) {
        return this.ExceptionError(
          `/api/v1/admin/${this.service}/update`,
          error,
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
          error,
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
          error,
        );
      }
    }
  }

  // 👇 bắt buộc để swagger render DTO
  ApiExtraModels(createDto, updateDto)(CrudBaseController);

  return CrudBaseController;
}
