const config = require('./config');
const http = require('http');
const Koa = require('koa');

const PORT = config.PORT;
const app = new Koa();
const webServer = http.createServer(app.callback());

// CORS
const cors = require('@koa/cors');
app.use(cors({
	origin: '*',
	credentials: true,
}))

// logger
global.$LOG = require('./plugins/logger');

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  $LOG.info(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});


// logger
global.$LOG = require('./plugins/logger');

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  $LOG.info(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// 바디파서
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 콘트롤러 호출 고차함수
global.$API_CALL = require('./lib/API_CALL');

// 소켓
global.$IO = require('./socket')(webServer);

// 디비
const connectSequlize = require('./plugins/connectSequelize');
global.$DB = connectSequlize(config.DB, __dirname + '/models', false);

// 라우터
const autoRouter = require('./plugins/autoRouter');
autoRouter(app, __dirname + '/routes', "/");

app.use(async (ctx) => {
	ctx.body = {
		success: false,
		data: "No matching router",
		config
	}
})

webServer.listen(PORT, () => {
	console.log(`http://ssoapi.bnb.com:${PORT}`);
});