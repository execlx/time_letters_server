export declare class CreateUserDto {
    username: string;
    password: string;
    email?: string;
    phone?: string;
}
export declare class PhoneLoginDto {
    phone: string;
    code: string;
}
export declare class PhoneRegisterDto {
    phone: string;
    code: string;
    username?: string;
}
export declare class EmailRegisterDto {
    email: string;
    code: string;
    username?: string;
}
export declare class SendCodeDto {
    phone: string;
}
export declare class UpdateUserDto {
    username?: string;
    email?: string;
    phone?: string;
    profilePicture?: string;
}
export declare class ResetPasswordDto {
    phone: string;
    password: string;
}
export declare class UsernamePasswordLoginDto {
    username: string;
    password: string;
}
export declare class WechatLoginDto {
    code: string;
}
export declare class WechatRegisterDto {
    wechatOpenid: string;
}
export declare class SetPasswordDto {
    userId: number;
    password: string;
}
