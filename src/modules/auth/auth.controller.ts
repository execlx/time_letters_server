import { 
  Controller, 
  Post, 
  Body, 
  UseGuards,
  Request,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../local/auth.local';
import { PhoneAuthGuard } from '../local/auth.phone';
import { WechatAuthGuard } from '../local/auth.wechat';
import { Public } from '../../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 用户名密码登录
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login/username')
  async loginByUsernamePassword(@Request() req) {
    try {
      return this.authService.generateToken(req.user);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to login', HttpStatus.UNAUTHORIZED);
    }
  }

  // 手机号验证码登录
  @Public()
  @UseGuards(PhoneAuthGuard)
  @Post('login/phone')
  async loginByPhone(@Request() req) {
    try {
      return this.authService.generateToken(req.user);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to login', HttpStatus.UNAUTHORIZED);
    }
  }

  // 微信登录
  @Public()
  @UseGuards(WechatAuthGuard)
  @Post('login/wechat')
  async loginByWechat(@Request() req) {
    try {
      return this.authService.generateToken(req.user);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to login with WeChat', HttpStatus.UNAUTHORIZED);
    }
  }
}