import { Provide, Scope, Autoload, ScopeEnum, Init, Config } from '@midwayjs/decorator';
import * as Redis from 'ioredis';

@Autoload()
@Provide()
@Scope(ScopeEnum.Singleton)
export class RedisService {

  @Config('redis')
  private config;
  
  private redisService;
  private redisSub;
  private redisPub;
	
  @Init()
  async init() {
    // console.log('redis', this.config)
  	this.redisService = new Redis(this.config);
  	this.redisPub = new Redis(this.config);
  	this.redisSub = new Redis(this.config);
    this.redisSub.subscribe("loggerChannel", function (e) {
      console.log('subscribe channel: loggerChannel');
    });
    this.redisSub.on("message", function (channel, res) {
      console.log('channel: ', channel);
      console.log(typeof res); // string
      console.log('res:', res);
    });
    this.redisSub.on("error", function (err) {
        console.log("loggerChannel response err:" + err)
    });
  }
  
  getRedisClient() {
  	return this.redisService;
  }

  sendMsg(msg: string) {
    console.log('send msg', msg)
    this.redisPub.publish('demoChannel', msg)
  }
}