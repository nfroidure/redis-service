import Redis from 'ioredis';
import { autoProvider } from 'knifecycle';
import type { RedisOptions } from 'ioredis';
import type { Provider } from 'knifecycle';
import type { LogService } from 'common-services';

/* Architecture Note #1: Redis Service

The `redis` service wraps ioredis to make it work
 directly with Knifecycle based frameworks like
 Whook.
*/

export type RedisEnv<
  T extends string extends T
    ? never
    : string = typeof DEFAULT_REDIS_PASSWORD_ENV_NAME,
> = Record<T | 'REDIS_HOST' | 'REDIS_PORT', string>;
export type RedisService = InstanceType<typeof Redis>;
export type RedisConfig<
  T extends string extends T
    ? never
    : string = typeof DEFAULT_REDIS_PASSWORD_ENV_NAME,
> = {
  REDIS?: RedisOptions;
  REDIS_PASSWORD_ENV_NAME?: T;
};
export type RedisDependencies<
  T extends string extends T
    ? never
    : string = typeof DEFAULT_REDIS_PASSWORD_ENV_NAME,
> = RedisConfig<T> & {
  ENV: RedisEnv<T>;
  log: LogService;
};

export const DEFAULT_REDIS_OPTIONS: RedisOptions = {};

export const DEFAULT_REDIS_PASSWORD_ENV_NAME = 'REDIS_PASSWORD';

// Docs: https://github.com/luin/ioredis/blob/master/API.md

export default autoProvider(initRedis);

/**
 * Instantiate the Redis service
 * @name initRedisService
 * @function
 * @param  {Object}     services
 * The services to inject
 * @param  {Object}   [services.ENV]
 * An environment object
 * @param  {Function}   services.REDIS
 * The configuration object as given to `node-redis`
 * @param  {Function}   [services.REDIS_PASSWORD_ENV_NAME]
 * The environment variable name in which to pick-up the
 *  Redis password
 * @param  {Function}   services.log
 * A logging function
 * @return {Promise<RedisService>}
 * A promise of the Redis service
 * @example
 * import initRedisService from 'redis-service';
 *
 * const jwt = await initRedisService({
 *   REDIS: {
 *     host: 'localhost',
 *     port: 6379,
 *   },
 *   ENV: process.env,
 *   log: console.log.bind(console),
 * });
 *
 * const value = await redis.get('my_key');
 */
async function initRedis<
  T extends string extends T
    ? never
    : string = typeof DEFAULT_REDIS_PASSWORD_ENV_NAME,
>({
  REDIS = DEFAULT_REDIS_OPTIONS,
  REDIS_PASSWORD_ENV_NAME = DEFAULT_REDIS_PASSWORD_ENV_NAME as T,
  ENV,
  log,
}: RedisDependencies<T>): Promise<Provider<RedisService>> {
  const client = new Redis({
    ...REDIS,
    host: ENV.REDIS_HOST || REDIS.host,
    port: ENV.REDIS_PORT ? parseInt(ENV.REDIS_PORT, 10) : REDIS.port,
    ...(ENV[REDIS_PASSWORD_ENV_NAME]
      ? { password: ENV[REDIS_PASSWORD_ENV_NAME] }
      : {}),
  });

  log('warning', `🏧 - Redis Service initialized!`);

  return {
    service: client,
    async dispose(): Promise<void> {
      log('warning', '🔌 - Quitting Redis server...');
      client.quit();
    },
  };
}
