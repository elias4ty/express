const path = require('path'),
      webpack = require('webpack');

module.exports = {
  entry : [
      './a.js',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
  ],
  output : {
    publicPath : '/lala/',
    filename : 'bundler.js',
    path : __dirname
  },

  plugins : [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  ]
}
