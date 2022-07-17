import { HttpException } from "@nestjs/common";


export class ErrorsResponse {
  responseError(error, message, status): HttpException {
    throw new HttpException({
      message, 
      code: error.code
    }, status);
  }
}