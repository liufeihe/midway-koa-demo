import { Provide } from '@midwayjs/decorator';
import { loggers } from '@midwayjs/logger';
// import * as logger from '../util/logger'
import { LoggerLevel } from '../interface';

@Provide()
export class LoggerService {
  async updateLevel(level: LoggerLevel) {
    try {
        // loggers.updateLevel(level || 'info')
        loggers.updateConsoleLevel(level || 'info')
    } catch (error) {
        loggers.getLogger('custom').error(error)
    }
  }
}
