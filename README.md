[//]: # ( )
[//]: # (This file is automatically generated by a `metapak`)
[//]: # (module. Do not change it  except between the)
[//]: # (`content:start/end` flags, your changes would)
[//]: # (be overridden.)
[//]: # ( )
# simple-redis-service
> A simple Redis wrapper around the ioredis module.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nfroidure/simple-redis-service/blob/main/LICENSE)


[//]: # (::contents:start)

This simple project is intended to mock real key value stores likes Redis or
 file system based stores. It can also be used in local scripts to run code
 that assume a key value store exists.

It requires a `delay` services to be passed in, you can find an implementation
 in the [`common-services`](https://github.com/nfroidure/common-services)
 project.

[//]: # (::contents:end)

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

# Authors
- [Nicolas Froidure](http://insertafter.com/en/index.html)

# License
[MIT](https://github.com/nfroidure/simple-redis-service/blob/main/LICENSE)
