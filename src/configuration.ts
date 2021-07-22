import { Configuration, App } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import * as bodyParser from 'koa-bodyparser';

@Configuration({
  conflictCheck: true,
})
export class ContainerLifeCycle {
  @App()
  app: Application;

  async onReady() {

    // 基于框架的默认日志创建自己的日志，使用的时候获取custom就行
    // this.app.createLogger('custom', {
    //   level: 'info',
    //   errorLogName: 'error.log',
    //   fileLogName: 'server.log',
    // })

    // bodyparser options see https://github.com/koajs/bodyparser
    this.app.use(bodyParser());
  }
}
