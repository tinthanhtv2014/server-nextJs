// src/shared/validators/base-validator.ts
import { ProcessError } from "../shared/utils/response.util";

export class BaseValidator {
  protected required(value: any, field: string) {
    if (value === undefined || value === null || value === "") {
      return ProcessError(`Thiếu trường bắt buộc: ${field}`);
    }
    return null;
  }

  protected isString(value: any, field: string) {
    if (typeof value !== "string") {
      return ProcessError(`Trường ${field} phải là chuỗi`);
    }
    return null;
  }

  protected minLength(value: string, field: string, min: number) {
    if (value.length < min) {
      return ProcessError(`Trường ${field} phải có ít nhất ${min} ký tự`);
    }
    return null;
  }

  protected maxLength(value: string, field: string, max: number) {
    if (value.length > max) {
      return ProcessError(`Trường ${field} không được vượt quá ${max} ký tự`);
    }
    return null;
  }

  protected isSlug(value: string, field: string) {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(value)) {
      return ProcessError(
        `Trường ${field} không hợp lệ (slug chỉ được chứa chữ, số và '-')`
      );
    }
    return null;
  }
}
