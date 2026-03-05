import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  Success,
  ProcessError,
  NotfoundError,
  Unauthorized,
  ConflictError,
  ExceptionError,
  SuccessEncrypted,
} from "../utils/response.util"; // 👈 nhớ đúng path nhé bro
@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data: any) => {
        // 👈 THÊM :any Ở ĐÂY
        if (data && typeof data.status === "number") {
          console.log(`🔁 Interceptor đổi status HTTP thành: ${data.status}`);
          response.status(data.status);

          switch (data.status) {
            case 200:
            case 201:
              if (data.isEncrypted) {
                return SuccessEncrypted(
                  data.resultApi ?? data,
                  data.total ?? 1,
                  data.message ?? "Success",
                );
              }

              return Success(
                data.resultApi ?? data,
                data.message ?? "Success",
                data.total,
              );

            case 400:
              return ProcessError(
                data.message ?? "Bad Request",
                400,
                data.error,
                data.errorDetail,
                data.resultApi,
              );

            case 401:
              return Unauthorized(data.message ?? "Unauthorized");

            case 404:
              return NotfoundError(data.message ?? "Not Found");

            case 409:
              return ConflictError(data.message ?? "Conflict");

            case 500:
              return ExceptionError(data.message ?? "Internal Server Error");

            default:
              return data;
          }
        }

        return Success(data);
      }),
    );
  }
}
