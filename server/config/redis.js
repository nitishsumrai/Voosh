// Using Docker Image of Redis

const redis = require("redis");
var Promise = require("bluebird");


const client = redis.createClient({
   host: 'redis-server',
   port:6379
});

Promise.promisifyAll(redis.RedisClient.prototype);

module.exports=client;