import { 
  Controller, 
  Post, 
  Body, 
  Patch, 
  Param, 
  HttpException, 
  HttpStatus, 
  ParseIntPipe, 
  UseGuards 
} from '@nestjs/common';
import { UserService } from './user.service';
import { 
  CreateUserDto, 
  PhoneRegisterDto, 
  WechatRegisterDto,
  SetPasswordDto,
  ResetPasswordDto,
  UpdateUserDto 
} from './dto/user-dto';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { Public } from '../../common/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 创建用户
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to create user', HttpStatus.BAD_REQUEST);
    }
  }

  // 通过手机号创建用户
  @Public()
  @Post('phone')
  async createByPhone(@Body() registerDto: PhoneRegisterDto) {
    try {
      return await this.userService.createByPhone(registerDto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to create user with phone', HttpStatus.BAD_REQUEST);
    }
  }

  // 通过微信创建用户
  @Public()
  @Post('wechat')
  async createByWechat(@Body() registerDto: WechatRegisterDto) {
    try {
      return await this.userService.createByWechat(registerDto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to create user with WeChat', HttpStatus.BAD_REQUEST);
    }
  }

  // 设置密码
  @UseGuards(JwtAuthGuard)
  @Post('password/set')
  async setPassword(@Body() setPasswordDto: SetPasswordDto) {
    try {
      await this.userService.setPassword(parseInt(setPasswordDto.userId), setPasswordDto.password);
      return { message: 'Password set successfully' };
    } catch (error) {
      throw new HttpException(error.message || 'Failed to set password', HttpStatus.BAD_REQUEST);
    }
  }

  // 重置密码
  @Public()
  @Post('password/reset')
  async resetPassword(@Body() resetDto: ResetPasswordDto) {
    try {
      await this.userService.resetPassword(resetDto.phone, resetDto.password);
      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new HttpException(error.message || 'Failed to reset password', HttpStatus.BAD_REQUEST);
    }
  }

  // 更新用户信息
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message || 'Failed to update user', HttpStatus.BAD_REQUEST);
    }
  }
}