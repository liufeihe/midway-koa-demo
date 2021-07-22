import { Provide } from '@midwayjs/decorator';
import * as logger from '../util/logger'
import { LoggerLevel } from '../interface';

@Provide()
export class LoggerService {
  async updateLevel(level: LoggerLevel) {
    try {
        logger.updateLevel(level || 'info')
    } catch (error) {
        logger.error(error)
    }
  }
}
