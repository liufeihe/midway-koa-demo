import { loggers, LoggerLevel } from '@midwayjs/logger'
const moment = require('moment')
const path = require('path')

export const myLog = loggers.createLogger('logger', {
    dir: path.join(__dirname, '../../logs/midway-koa-demo/'),
    level: 'info',
    errorLogName: 'error.log',
    fileLogName: 'server.log',
    disableFile: true,
    disableError: true,
    printFormat: info => {
        // console.log(info)
        const obj = {
            T: moment(info.timestamp).toISOString(),
            L: info.level,
            M: info.message,
            self: {
                pid: info.pid
            }
        }

        // 通过链路上下文调用的，需要打印请求和返回
        const ctx = info.ctx
        if (ctx) {
            const req = ctx.request
            const res = ctx.response

            obj['req'] = {
                method: req.method,
                path: req.url,
                rawhd: req.header,
                param: req.query || req.body,
            }
            obj['rsp'] = {
                status: res.status,
                code: res.code,
                msg: res.message,
                param: res.body,
            }
            obj['duration'] = info.message
            obj['M'] = ''
        }
        if (info.stack) {
            obj['S'] = info.stack
        }
        
        return JSON.stringify(obj).replace(/\\n/g, '') // 将换行符替换成空
    },
})

export function updateLevel(level: string) {
    // 不知道为啥, 单独设置level会报错
    // loggers.updateLevel(level as LoggerLevel)
    
    // 因为log没有不写file了，所以这边也不用设置
    // loggers.updateFileLevel(level as LoggerLevel)
    loggers.updateConsoleLevel(level as LoggerLevel)
}

export function error(msg: string) {    
    myLog.error(msg)
}

export function warn(msg: string) {    
    myLog.warn(msg)
}

export function info(msg: string) {    
    myLog.info(msg)
}

export function debug(msg: string) {    
    myLog.debug(msg)
}
