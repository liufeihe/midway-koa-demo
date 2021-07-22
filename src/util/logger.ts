import { loggers, LoggerLevel } from '@midwayjs/logger';
import { getIp } from './common'
const moment = require('moment');
const path = require('path');
const os = require('os')

// 缓存一下ip
const hostIp = getIp()

export const myLog = loggers.createLogger('logger', {
    dir: path.join(__dirname, '../../logs/midway-koa-demo/'),
    level: 'info',
    errorLogName: 'error.log',
    fileLogName: 'server.log',
    disableFile: true,
    disableError: true,
    printFormat: info => {
        // 构造日志
        const obj = {
            T: moment(info.timestamp).toISOString(),
            L: info.level,
            M: info.message,
            self: {
                pid: info.pid
            }
        }
        const data = info.originArgs[0]
        // 通过链路上下文调用的，需要打印请求和返回
        const ctx = info.ctx
        if (ctx && (typeof data === 'object' && data?.type==='web')) {
            // const originalReq = ctx.req
            const req = ctx.request
            const header = req.header
            const res = ctx.response
            obj['req'] = {
                path: req.url,
                method: req.method,
                ua: header['user-agent'],
                rawhd: header,
                ip: header['host'],
                param: req.query || req.body,
            }
            obj['rsp'] = {
                status: res.status,
                code: res.code,
                msg: res.message,
                param: res.body,
            }
            obj['M'] = ''
            // 以秒为单位，传入前就应该处理好
            if (data.duration) {
                obj['duration'] = data.duration
            }
        }
        // 打印堆栈
        if (info.stack) {
            obj['S'] = info.stack
        }
        // 打印自由字段
        if (data?.ext) {
            obj['ext'] = data.ext
        }
        // 打印运行环境的信息
        obj['host'] = {
            name: os.hostname(),
            ip: hostIp
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
