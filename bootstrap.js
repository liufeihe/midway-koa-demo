const WebFramework = require('@midwayjs/koa').Framework;
import { myLog } from './src/util/logger';

const web = new WebFramework().configure({
  port: 7001,
  logger: myLog,
  appLogger: myLog,
});

const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap.load(web).run();
