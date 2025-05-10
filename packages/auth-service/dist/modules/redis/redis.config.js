"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisConfig = void 0;
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
const getRedisConfig = async (configService) => ({
    store: cache_manager_redis_store_1.redisStore,
    host: configService.get('REDIS_HOST', 'localhost'),
    port: configService.get('REDIS_PORT', 6379),
    password: configService.get('REDIS_PASSWORD'),
    ttl: configService.get('REDIS_TTL', 600),
});
exports.getRedisConfig = getRedisConfig;
//# sourceMappingURL=redis.config.js.map