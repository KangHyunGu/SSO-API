const fs = require('fs');
const path = require('path');
const Router = require('@koa/router');

function autoRouter(prefix, router, root) {
    prefix = prefix == '/' ? '' : prefix;

    const dir = fs.readdirSync(root, {
        withFileTypes : true
    });

    dir.forEach( p => {
        if (p.isDirectory()) {
            if (p.name != '_model') {
                arguments.callee(`${prefix}/${p.name}`, router, `${root}/${p.name}`);
            }
        } else {
            let moduleName = '/' + p.name.replace(/\.js/g, '');
            if (moduleName == 'index') {
                moduleName = '';
            }
            console.log(`${prefix + moduleName || '/'} => ${root}/${p.name}`);
            const r = require(`${root}/${p.name}`);
            router.use(`${prefix}${moduleName}`, r.routes());
        }
    })
}

module.exports = (app, root, prefix = "") => {
    const router = new Router();
    autoRouter(prefix, router, root);
    app.use(router.routes()).use(router.allowedMethods());
}