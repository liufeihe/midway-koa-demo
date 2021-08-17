export default {
    keys: '12314',
    logger: {
        level: 'info',
        errorLogName: 'error.log',
        fileLogName: 'server.log',
        disableConsole: false,
        disableFile: false,
        disableError: false,
    },
    redis: {
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        family: 4, // 4 (IPv4) or 6 (IPv6)
        password: "",
        db: 0,
    }
  };
