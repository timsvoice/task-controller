var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve('server.js');

var config = {
  devtool: 'eval-source-map',
  context: __dirname + '/public',
  entry: ['webpack/hot/dev-server', mainPath],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  target: 'node',
  resolve: {
    extentions: ['', '.node', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [nodeModulesPath]
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"],
      },
      { 
        test: /\.md$/, 
        loader: "html!markdown",
      },
      { 
        test: /\.json$/, 
        loader: "json",
      },
      { 
        test: /\.node$/, 
        loader: "node",
      },      
    ]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;