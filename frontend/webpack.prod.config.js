const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: [
    './src/entry'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
        chunks: "async",
        minSize: 1000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
            default: {
                minChunks: 1,
                priority: -20,
                reuseExistingChunk: true,
            },
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            }
        }
    }
},
  module: {
    rules: [
      { test: /\.js?$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/},
      { test: /\.css?$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ],
        include: path.join(__dirname, 'src', 'styles') },
      { test: /\.png$/,
        use: 'img' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: 'file'}
    ]
  }
}
