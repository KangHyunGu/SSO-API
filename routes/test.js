//const Router = require('@koa/router');
const router = new (require('@koa/router'))();

router.get('/', (ctx) => {
    ctx.body = {
        success : true,
        data : "Hello Router"
    }
})

module.exports = router;