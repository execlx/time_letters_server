import { UserService } from './user.service';
import { CreateUserDto, PhoneRegisterDto, WechatRegisterDto, SetPasswordDto, ResetPasswordDto, UpdateUserDto, EmailRegisterDto } from './dto/user-dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    createByPhone(registerDto: PhoneRegisterDto): Promise<import("./entities/user.entity").User>;
    createByEmail(registerDto: EmailRegisterDto): Promise<import("./entities/user.entity").User>;
    createByWechat(registerDto: WechatRegisterDto): Promise<import("./entities/user.entity").User>;
    setPassword(setPasswordDto: SetPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
}
