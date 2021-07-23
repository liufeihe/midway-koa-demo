import { Provide, Config, Logger } from '@midwayjs/decorator';
import { loggers, ILogger } from '@midwayjs/logger';
import { LoggerLevel } from '../interface';

@Provide()
export class LoggerService {
  @Logger('custom')
  logger: ILogger

  @Config('logger')
  private loggerConfig;

  async updateLevel(level: LoggerLevel) {
    try {
      //没禁止console打印的话，则需要设置对应的level
      if (!this.loggerConfig.disableConsole) {
        loggers.updateConsoleLevel(level || 'info')
      }
      //没禁止file打印的话，则需要设置对应的level
      if (!this.loggerConfig.disableFile) {
        loggers.updateFileLevel(level || 'info')
      }
      throw new Error('test')
    } catch (error) {
      // loggers.getLogger('custom').error(error)
      this.logger.error(error)
    }
  }
}
