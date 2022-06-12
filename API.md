# API
<a name="initRedisService"></a>

## initRedisService(services) ⇒ <code>Promise.&lt;RedisService&gt;</code>
Instantiate the Redis service

**Kind**: global function  
**Returns**: <code>Promise.&lt;RedisService&gt;</code> - A promise of the Redis service  

| Param | Type | Description |
| --- | --- | --- |
| services | <code>Object</code> | The services to inject |
| [services.ENV] | <code>Object</code> | An environment object |
| services.REDIS | <code>function</code> | The configuration object as given to `node-redis` |
| [services.REDIS_PASSWORD_ENV_NAME] | <code>function</code> | The environment variable name in which to pick-up the  Redis password |
| services.log | <code>function</code> | A logging function |

**Example**  
```js
import initRedisService from 'simple-redis-service';

const redis = await initRedisService({
  REDIS: {
    host: 'localhost',
    port: 6379,
  },
  ENV: process.env,
  log: console.log.bind(console),
});

const value = await redis.get('my_key');
```
