export class CreateUserDto {
  username: string;
  email?: string;
  password: string;
  profilePicture?: string;
}

export class PhoneLoginDto {
  phone: string;
  code: string;
}

export class PhoneRegisterDto {
  phone: string;
  code: string;
  username: string;
  password: string;
}

export class SendCodeDto {
  phone: string;
}

export class UpdateUserDto {
  username?: string;
  email?: string;
  profilePicture?: string;
}

export class ResetPasswordDto {
  phone: string;
  code: string;
  password: string;
}

export class UsernamePasswordLoginDto {
  username: string;
  password: string;
}

export class WechatLoginDto {
  code: string;
}

export class WechatRegisterDto {
  code: string;
  username: string;
  password: string;
}

export class SetPasswordDto {
  userId: string;
  password: string;
}
