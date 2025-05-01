import { 
  Controller, 
  Post, 
  Body, 
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/auth.local';
import { PhoneAuthGuard } from './local/auth.phone';
import { WechatAuthGuard } from './local/auth.wechat';
import { Public } from './decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { 
  UsernamePasswordLoginDto, 
  PhonePasswordLoginDto,
  PhoneLoginDto, 
  WechatLoginDto,
  TokenResponseDto,
  EmailLoginDto
} from './dto/auth-dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCode } from '../../common/constants/errorcode.constant';
import { EmailAuthGuard } from './local/auth.email';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '用户名密码登录' })
  @ApiResponse({ status: 200, description: '登录成功', type: TokenResponseDto })
  @ApiResponse({ status: 401, description: '登录失败' })
  @ApiBody({ type: UsernamePasswordLoginDto })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login/username')
  async loginByUsernamePassword(@Request() req) {
    try {
      return this.authService.generateToken(req.user);
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('登录失败', ErrorCode.LOGIN_FAILED);
    }
  }

  @ApiOperation({ summary: '手机号密码登录' })
  @ApiResponse({ status: 200, description: '登录成功', type: TokenResponseDto })
  @ApiResponse({ status: 401, description: '登录失败' })
  @ApiBody({ type: PhonePasswordLoginDto })
  @Public()
  @Post('login/phone/password')
  async loginByPhonePassword(@Body() loginDto: PhonePasswordLoginDto) {
    try {
      const user = await this.authService.validateUserByPhonePassword(loginDto.phone, loginDto.password);
      return this.authService.generateToken(user);
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('登录失败', ErrorCode.LOGIN_FAILED);
    }
  }

  @ApiOperation({ summary: '手机号验证码登录' })
  @ApiResponse({ status: 200, description: '登录成功', type: TokenResponseDto })
  @ApiResponse({ status: 401, description: '登录失败' })
  @ApiBody({ type: PhoneLoginDto })
  @Public()
  @UseGuards(PhoneAuthGuard)
  @Post('login/phone/code')
  async loginByPhone(@Request() req) {
    try {
      return this.authService.generateToken(req.user);
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('登录失败', ErrorCode.LOGIN_FAILED);
    }
  }

  @ApiOperation({ summary: '微信登录' })
  @ApiResponse({ status: 200, description: '登录成功', type: TokenResponseDto })
  @ApiResponse({ status: 401, description: '登录失败' })
  @ApiBody({ type: WechatLoginDto })
  @Public()
  @UseGuards(WechatAuthGuard)
  @Post('login/wechat')
  async loginByWechat(@Request() req) {
    try {
      return this.authService.generateToken(req.user);
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('微信登录失败', ErrorCode.WECHAT_LOGIN_FAILED);
    }
  }

  @ApiOperation({ summary: '邮箱验证码登录' })
  @ApiResponse({ status: 200, description: '登录成功', type: TokenResponseDto })
  @ApiResponse({ status: 401, description: '登录失败' })
  @ApiBody({ type: EmailLoginDto })
  @Public()
  @UseGuards(EmailAuthGuard)
  @Post('login/email')
  async loginByEmail(@Request() req) {
    try {
      return this.authService.generateToken(req.user);
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('邮箱登录失败', ErrorCode.EMAIL_LOGIN_FAILED);
    }
  }
}