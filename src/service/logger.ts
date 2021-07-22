import { Provide } from '@midwayjs/decorator';
import * as logger from '../util/logger'

@Provide()
export class LoggerService {
  async updateLevel(level: string) {
    try {
        logger.updateLevel(level || 'info')
    } catch (error) {
        logger.error(error)
    }
  }
}
