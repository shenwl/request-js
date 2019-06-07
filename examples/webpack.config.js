const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    return entries
  }, {}),
  output: {
    path: path.resolve(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnlu: true
            }
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
}
