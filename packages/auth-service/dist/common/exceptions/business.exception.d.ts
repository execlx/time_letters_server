import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../constants/errorcode.constant';
export declare class BusinessException extends HttpException {
    constructor(message: string, errorCode: keyof typeof ErrorCode, statusCode?: number);
}
