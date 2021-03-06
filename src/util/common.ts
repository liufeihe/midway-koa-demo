import os = require('os')

export function getIp() {
    // 在开发环境中获取局域网中的本机iP地址
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (const alias of iface) {
            if (alias.family === 'IPv4' &&
                alias.address !== '127.0.0.1' &&
                !alias.internal) {
                return alias.address;
            }
        }
    }
}