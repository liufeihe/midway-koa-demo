import { Controller, Get, Provide, Inject, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
// import  { error } from '../util/logger'

@Provide()
@Controller('/')
export class HomeController {

  @Logger()
  logger: ILogger

  @Inject()
  ctx;
  
  @Get('/')
  async home(): Promise<string> {
    this.logger.info('info-haha2', __filename)
    this.logger.debug('debug-haha2', __filename)
    // this.ctx.logger.info('haha3')
    // error('xxx-log')
    return 'Hello Midwayjs!';
  }
}
