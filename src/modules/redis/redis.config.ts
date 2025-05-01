import { CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';

export const getRedisConfig = async (configService: ConfigService): Promise<CacheModuleOptions> => ({
    store: redisStore,
    host: configService.get('REDIS_HOST', 'localhost'),
    port: configService.get('REDIS_PORT', 6379),
    password: configService.get('REDIS_PASSWORD'),
    ttl: configService.get('REDIS_TTL', 600), // 默认10分钟
}); 