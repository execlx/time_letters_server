export declare class SendCodeDto {
    phone: string;
}
export declare class VerifyCodeDto {
    phone: string;
    code: string;
}
export declare class SendCodeResponseDto {
    success: boolean;
}
export declare class VerifyCodeResponseDto {
    isValid: boolean;
}
