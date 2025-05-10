export declare class UsernamePasswordLoginDto {
    username: string;
    password: string;
}
export declare class PhonePasswordLoginDto {
    phone: string;
    password: string;
}
export declare class PhoneLoginDto {
    phone: string;
    code: string;
}
export declare class WechatLoginDto {
    code: string;
}
export declare class TokenResponseDto {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
}
export declare class EmailLoginDto {
    email: string;
    code: string;
}
