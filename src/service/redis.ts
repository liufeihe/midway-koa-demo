import { Provide, Scope, Autoload, ScopeEnum, Init, Config } from '@midwayjs/decorator';
import * as Redis from 'ioredis';

@Autoload()
@Provide()
@Scope(ScopeEnum.Singleton)
export class RedisService {

  @Config('redis')
  private config;
  
  private redisService;
	
  @Init()
  async init() {
    // console.log('redis', this.config)
  	this.redisService = new Redis(this.config);
    // this.redisService.subscribe("mychannel", function (e) {
    //   console.log('subscribe channel: mychannel');
    // });
    // this.redisService.on("message", function (channel, res) {
    //   console.log('channel: ', channel);
    //   console.log(typeof res); // string
    //   console.log('res:', res);
    // });
    // this.redisService.on("error", function (err) {
    //     console.log("response err:" + err)
    // });
  }
  
  getRedisClient() {
  	return this.redisService;
  }

  sendMsg(msg: string) {
    console.log('send msg', msg)
    this.redisService.publish('mychannel', msg)
  }
}