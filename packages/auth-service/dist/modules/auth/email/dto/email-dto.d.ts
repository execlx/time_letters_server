export declare class SendEmailCodeDto {
    email: string;
}
export declare class VerifyEmailCodeDto {
    email: string;
    code: string;
}
export declare class SendEmailCodeResponseDto {
    success: boolean;
    code?: string;
}
export declare class VerifyEmailCodeResponseDto {
    isValid: boolean;
}
