import { Provide } from '@midwayjs/decorator';
import {
  IWebMiddleware,
  IMidwayKoaContext,
  IMidwayKoaNext,
} from '@midwayjs/koa';

@Provide()
export class LoggerMiddleware implements IWebMiddleware {

  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
      // 控制器前执行的逻辑
      const startTime = Date.now();
      // 执行下一个 Web 中间件，最后执行到控制器
      await next();
      // 控制器之后执行的逻辑
      const duration = Date.now() - startTime
      // console.log(duration);
      // const req = ctx.request
      // const res = ctx.response
      // const body = req.body
      // const query = req.query
      // 请求的日志使用debug级别
      ctx.getLogger('custom').debug({
        type: 'web',
        duration: duration/1000,
      })
      // ctx.logger.debug({
      //   type: 'web',
      //   duration: duration/1000,
      // })
    };
  }

}