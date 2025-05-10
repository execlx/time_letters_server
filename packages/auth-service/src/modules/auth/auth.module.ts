import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { JwtStrategy } from './local/auth.jwt';
import { LocalStrategy } from './local/auth.local';
import { PhoneStrategy } from './local/auth.phone';
import { WechatStrategy } from './local/auth.wechat';
import { EmailStrategy } from './local/auth.email';
import { EmailModule } from './email/email.module';
import { PhoneModule } from './phone/phone.module';
import { UserModule } from '../user/user.module';
import { EmailAuthGuard } from './local/auth.email';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwt.secret'),
                signOptions: { expiresIn: configService.get('jwt.expiresIn') },
            }),
            inject: [ConfigService],
        }),
        forwardRef(() => UserModule),
        EmailModule,
        PhoneModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: 'JWT_CONFIG',
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('jwt.secret'),
                expiresIn: configService.get('jwt.expiresIn'),
            }),
            inject: [ConfigService],
        },
        JwtStrategy,
        LocalStrategy,
        PhoneStrategy,
        WechatStrategy,
        EmailStrategy,
        EmailAuthGuard,
    ],
    exports: [AuthService],
})
export class AuthModule {}
