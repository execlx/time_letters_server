import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constants/error-code.constant';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super(
      {
        message,
        errorCode,
        statusCode,
      },
      statusCode
    );
  }
} 