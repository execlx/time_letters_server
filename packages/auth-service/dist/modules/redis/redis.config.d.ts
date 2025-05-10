import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
export declare const getRedisConfig: (configService: ConfigService) => Promise<CacheModuleOptions>;
