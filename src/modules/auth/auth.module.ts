import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PhoneModule } from './phone/phone.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { LocalStrategy } from './local/auth.local';
import { WechatStrategy } from './local/auth.wechat';
import { JwtStrategy } from './local/auth.jwt';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PhoneModule,
    EmailModule,
    PassportModule,
    ConfigModule,
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
    AuthGuard,
    LocalStrategy,
    WechatStrategy,
    JwtStrategy,
    {
      provide: 'JWT_CONFIG',
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    },
  ],
  exports: [
    AuthService,
    AuthGuard,
  ],
})
export class AuthModule {}
