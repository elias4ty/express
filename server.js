var http = require('http');
var express = require('express');
var app = express();

// ************************************
// This is the real meat of the example
// ************************************


// Step 1: Create & configure a webpack compiler
var webpack = require('webpack');
var webpackConfig = require('./webpack.dev.config');
var compiler = webpack(webpackConfig);

 app.get("/",function(req,res) {
     res.send(njk.render('./index.html'))
 });


// Step 2: Attach the dev middleware to the compiler & the server
app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    })
);

// Step 3: Attach the hot middleware to the compiler & the server
app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    })
);

// Do anything you like with the rest of your express application.


if (require.main === module) {
    var server = http.createServer(app);
    server.listen(1111, function() {
        console.log("Listening on %j", server.address());
    });
}
