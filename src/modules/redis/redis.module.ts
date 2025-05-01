import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRedisConfig } from './redis.config';

@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: getRedisConfig,
            inject: [ConfigService],
        }),
    ],
    exports: [CacheModule],
})
export class RedisModule {} 