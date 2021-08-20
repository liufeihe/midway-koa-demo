import { Inject, Controller, Post, Provide, Query, Body, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
// import { loggers } from '@midwayjs/logger'
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user';
import { LoggerService } from '../service/logger'
import { RedisService } from '../service/redis';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  loggerService: LoggerService;

  @Inject()
  redisService: RedisService;

  @Logger('logger')
  logger: ILogger

  @Post('/get_user')
  async getUser(@Query() uid) {
    let user = {}
    // this.ctx.logger.info(`getUser ${uid}`)
    try {
      user = await this.userService.getUser({ uid });
    } catch (error) {
      this.logger.error(error)
    }
    
    return { success: true, message: 'OK', data: user };
  }

  @Post('/update_log_level')
  async updateLogLevel(@Body() level) {
    // this.ctx.logger.info(`updateLogLevel ${level}`)
    this.loggerService.updateLevel(level)
    return { success: true, message: 'OK', data: null };
  }

  @Post('/redis/pub')
  async pub(@Body() code, @Body() version) {
    // this.ctx.logger.info(`updateLogLevel ${level}`)
    await this.redisService.pubStrategy(code, version)
    return { success: true, message: 'OK', data: null };
  }
}
