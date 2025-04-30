import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy, LocalAuthGuard } from '../local/auth.local';
import { PhoneStrategy, PhoneAuthGuard } from '../local/auth.phone';
import { WechatStrategy, WechatAuthGuard } from '../local/auth.wechat';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    PhoneStrategy,
    WechatStrategy,
    LocalAuthGuard,
    PhoneAuthGuard,
    WechatAuthGuard,
  ],
  exports: [
    AuthService,
    LocalAuthGuard,
    PhoneAuthGuard,
    WechatAuthGuard,
  ],
})
export class AuthModule {}
