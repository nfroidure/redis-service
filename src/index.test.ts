import { constant, Knifecycle } from 'knifecycle';
import initRedisService from '.';
import type { RedisService, RedisConfig } from '.';

describe('Redis service', () => {
  let $: Knifecycle;
  const log = jest.fn();

  beforeEach(() => {
    log.mockReset();
    $ = new Knifecycle();
    $.register(constant('ENV', {}));
    $.register(constant('log', log));
    $.register(
      constant('REDIS', {
        host: 'localhost',
        port: 6379,
      } as RedisConfig),
    );
    $.register(initRedisService);
  });

  it('should init well', async () => {
    const { log, redis } = (await $.run(['log', 'redis'])) as {
      redis: RedisService;
      log: any;
    };

    expect(typeof redis.get).toEqual('function');
    expect(typeof redis.set).toEqual('function');

    await redis.set('testkey', 'testvalue');
    expect(await redis.get('testkey')).toEqual('testvalue');
    await redis.del('testkey');
    expect(await redis.get('testkey')).toBeNull();

    await $.destroy();

    expect(log.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "warning",
          "🏧 - Redis Service initialized!",
        ],
        Array [
          "warning",
          "🔌 - Quitting Redis server...",
        ],
      ]
    `);
  });
});
