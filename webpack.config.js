module.exports = {
  entry: {
    budget: './src/apps/budget/client/App.jsx',
    index: './src/apps/index/client/App.jsx'
  },
  output: {
    filename: './public/bundle/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src/apps']
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  devtool: 'source-map'
}
