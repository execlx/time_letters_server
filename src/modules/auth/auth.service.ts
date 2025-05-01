import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH_STRATEGY } from './constants/auth.constants';
import { UserService } from '../user/user.service';
import { PhoneService } from './phone/phone.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCode } from '../../common/constants/errorcode.constant';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  private readonly logger: LoggerService;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly phoneService: PhoneService,
    private readonly emailService: EmailService,
  ) {
    this.logger = new LoggerService();
    this.logger.setContext('认证服务');
  }

  async validateUserByUsernamePassword(username: string, password: string) {
    this.logger.debug(`开始验证用户名密码登录: ${username}`, 'validateUserByUsernamePassword');
    
    // 检查用户名和密码是否为空
    if (!username || !password) {
        this.logger.warn(`用户名或密码为空: ${username}`, 'validateUserByUsernamePassword');
        throw new BusinessException('用户名和密码不能为空', ErrorCode.INVALID_CREDENTIALS);
    }

    // 检查密码长度
    if (password.length < 6) {
        this.logger.warn(`密码长度不足: ${username}`, 'validateUserByUsernamePassword');
        throw new BusinessException('密码长度不能少于6位', ErrorCode.INVALID_CREDENTIALS);
    }

    // 验证用户
    const user = await this.userService.validateUser(username, password);
    if (!user) {
        this.logger.warn(`用户名或密码错误: ${username}`, 'validateUserByUsernamePassword');
        throw new BusinessException('用户名或密码错误', ErrorCode.INVALID_CREDENTIALS);
    }

    // 检查用户状态（如果需要）
    if (user.status !== 'active') {
        this.logger.warn(`用户状态异常: ${username}`, 'validateUserByUsernamePassword');
        throw new BusinessException('用户状态异常', ErrorCode.USER_STATUS_ERROR);
    }

    this.logger.log(`用户名密码登录成功: ${username}`, 'validateUserByUsernamePassword');
    return user;
  }

  async validateUserByPhonePassword(phone: string, password: string) {
    this.logger.debug(`开始验证手机号密码登录: ${phone}`, 'validateUserByPhonePassword');
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      this.logger.warn(`用户不存在: ${phone}`, 'validateUserByPhonePassword');
      throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
    }
    if (!user.password) {
      this.logger.warn(`手机号未设置密码: ${phone}`, 'validateUserByPhonePassword');
      throw new BusinessException('该手机号未设置密码', ErrorCode.PASSWORD_ERROR);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      this.logger.warn(`密码错误: ${phone}`, 'validateUserByPhonePassword');
      throw new BusinessException('密码错误', ErrorCode.PASSWORD_ERROR);
    }
    this.logger.log(`手机号密码登录成功: ${phone}`, 'validateUserByPhonePassword');
    return user;
  }

  async validateUserByWechat(code: string) {
    this.logger.debug('开始验证微信登录', 'validateUserByWechat');
    // TODO: 获取微信用户信息
    const openid = 'mock_openid'; // 实际应该从微信接口获取
    const user = await this.userService.findByWechat(openid);
    if (!user) {
      this.logger.warn(`微信用户不存在: ${openid}`, 'validateUserByWechat');
      throw new BusinessException('微信用户不存在', ErrorCode.WECHAT_USER_NOT_FOUND);
    }
    this.logger.log(`微信登录成功: ${openid}`, 'validateUserByWechat');
    return user;
  }

  async validateUserByPhone(phone: string, code: string) {
    this.logger.debug(`开始验证手机验证码登录: ${phone}`, 'validateUserByPhone');
    // TODO: 验证手机验证码
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      this.logger.warn(`用户不存在: ${phone}`, 'validateUserByPhone');
      throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
    }
    this.logger.log(`手机验证码登录成功: ${phone}`, 'validateUserByPhone');
    return user;
  }

  async validateUserByEmail(email: string, code: string) {
    // 验证邮箱验证码
    const isValid = await this.emailService.validateVerificationCode(email, code);
    if (!isValid) {
      throw new BusinessException('验证码无效或已过期', ErrorCode.INVALID_EMAIL_VERIFICATION_CODE);
    }

    // 查找用户
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
    }

    return user;
  }

  async validateRequest(request: any, strategy: string): Promise<boolean> {
    switch (strategy) {
      case AUTH_STRATEGY.LOCAL:
        return this.validateLocal(request);
      case AUTH_STRATEGY.PHONE:
        return this.validatePhone(request);
      case AUTH_STRATEGY.JWT:
        return this.validateJwt(request);
      default:
        throw new BusinessException('Invalid authentication strategy', ErrorCode.INVALID_AUTH_STRATEGY);
    }
  }

  private async validateLocal(request: any): Promise<boolean> {
    const { username, password } = request.body;
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new BusinessException('Invalid credentials', ErrorCode.INVALID_CREDENTIALS);
    }
    request.user = user;
    return true;
  }

  private async validatePhone(request: any): Promise<boolean> {
    const { phone, code } = request.body;
    const isValid = await this.phoneService.validateVerificationCode(phone, code);
    if (!isValid) {
      throw new BusinessException('Invalid phone verification code', ErrorCode.INVALID_PHONE_VERIFICATION_CODE);
    }
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new BusinessException('User not found', ErrorCode.USER_NOT_FOUND);
    }
    request.user = user;
    return true;
  }

  private async validateJwt(request: any): Promise<boolean> {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new BusinessException('No token provided', ErrorCode.NO_TOKEN_PROVIDED);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findById(payload.sub);
      if (!user) {
        throw new BusinessException('User not found', ErrorCode.USER_NOT_FOUND);
      }
      request.user = user;
      return true;
    } catch {
      throw new BusinessException('Invalid token', ErrorCode.INVALID_TOKEN);
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async generateToken(user: any) {
    this.logger.debug(`开始生成用户令牌: ${user.id}`, 'generateToken');
    const payload = { 
      sub: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    };
    
    const token = {
      access_token: this.jwtService.sign(payload),
    };

    this.logger.log(`用户令牌生成成功: ${user.id}`, 'generateToken');
    return token;
  }
} 