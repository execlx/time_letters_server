import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from '../local/auth.local';
import { JwtStrategy } from '../jwt/auth.jwt';
import { PassportModule } from '@nestjs/passport';
import { AppConfigModule } from '../../config/config.module';
import { JwtConfig } from '../../interfaces/config.interface';

@Module({
  imports: [
    UserModule,
    AppConfigModule,
    PassportModule,

    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (config: JwtConfig) => ({
        secret: config.secret,
        signOptions: {expiresIn: config.expiresIn}, // Adjust the expiration time as needed
      }),
      inject: ['JWT_CONFIG'], 
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
