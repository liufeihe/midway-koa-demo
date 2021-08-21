import { Provide, Scope, Autoload, ScopeEnum, Init, Config } from '@midwayjs/decorator';
import * as Redis from 'ioredis';
import fs = require('fs')
import path = require('path');

@Autoload()
@Provide()
@Scope(ScopeEnum.Singleton)
export class RedisService {

  @Config('redis')
  private config;
  
  private redisService;
  private redisSub;
  private redisPub;

  private sgMap;
	
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

    this.sgMap = JSON.parse(await this.getValue('sgMap'));
  }
  
  getRedisClient() {
  	return this.redisService;
  }

  async getValue(key: string) {
    return await this.redisService.get(key)
  }

  async setValue(key: string, value: any) {
    await this.redisService.set(key, value)
  }

  sendMsg(msg: string) {
    console.log('send msg', msg)
    this.redisPub.publish('demoChannel', msg)
    this.redisPub.publish('demoChannel2', msg)
  }

  async pubStrategy(code?: string, version?: number) {
    if (code) {
      const filePath = path.join(__dirname, '../config/rules.json');
      const ruleJson = JSON.parse(fs.readFileSync(filePath).toString());
      const strategyFlow = ruleJson?.strategyFlow || {};
      strategyFlow.strategy['version'] = version || 1;
      this.sgMap[code] = ruleJson;
      console.log('sgMap', this.sgMap);
      const sgMapStr = JSON.stringify(this.sgMap)
      await this.setValue('sgMap', sgMapStr)
    }
    
    this.redisPub.publish('event_update_sgEngineMap', {code})
  }
}