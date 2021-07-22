import { Aspect, IMethodAspect, JoinPoint, Provide } from '@midwayjs/decorator';
import { HomeController } from '../controller/home';
import { APIController } from '../controller/api';

@Provide()
@Aspect(HomeController)
@Aspect(APIController)
export class LoggerInfo implements IMethodAspect {
    async after(point: JoinPoint) {
        const ctx = point.target.ctx
        const req = ctx.request
        ctx.logger.info(`${req.method} ${req.url}`)
    }
}