var njk = require('nunjucks')
var koa =  require('koa');
var router = require('koa-router')();
var app = new koa();
var express = require('express');
var ex = express();

var webpack = require('webpack');
var webpackConfig = require('./webpack.dev.config');
var compiler = webpack(webpackConfig);

ex.get("/",async function(req,res) {
    this.body = njk.render('./index.html')
});

app
    .use(router.routes())
    .use(router.allowedMethods());

ex.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    })
);

// Step 3: Attach the hot middleware to the compiler & the server
ex.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    })
);

ex.listen(1111,(err) => {
    console.log('listen at 1111')
})

