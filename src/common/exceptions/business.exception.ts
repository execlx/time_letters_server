import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constants/errorcode.constant';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    errorCode: keyof typeof ErrorCode,
    statusCode: number = HttpStatus.BAD_REQUEST
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