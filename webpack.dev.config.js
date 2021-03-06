const path = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry : {
      'index' : './src/views/mfw/index/main'
      // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
  },
  output : {
    publicPath : '/lala/',
    filename : 'js/[name].js',
    path : __dirname
  },
    resolve : {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.js',
            'public': path.resolve(__dirname, 'public'),
            'view' : path.resolve(__dirname,'src/views')
        }
    },
    module : {
        loaders: [
            {
                test : /\.js$/,
                loader : 'babel-loader',
                include : path.resolve(__dirname,'./public/js'),
                options: {
                    presets : ['es2015']
                }
            },
            {
                test : /\.vue$/,
                loader : 'vue-loader',
                include : path.resolve(__dirname,'./src/views'),
                options: {
                    loaders : {
                        css : ExtractTextPlugin.extract({
                            use : 'css-loader',
                            fallback : 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test : /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use : 'css-loader',
                    fallback : 'vue-style-loader'
                })
            }
        ]
    },
  plugins : [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin({
          filename: 'css/[name].css',
          allChunks : false // 当设置成 false 时，vue 中 require 的 css 文件就要用到 fallback 配置的 loader
      })
  ]
}
