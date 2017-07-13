var redis = require('redis');
var logging = require('winston');
var bluebird = require('bluebird');
var env = require('../../config/index');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

logging.level = env.log_level;


var client = redis.createClient(env.cache_url, env.cache_port);

client.on('connect', function() {
    logging.log('info', 'Redis connected!')
});

function redisObject(){
    this.redis = redis;
    this.client = client;
}

module.exports = new redisObject();