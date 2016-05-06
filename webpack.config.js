module.exports = {
  entry: {
    budget: './apps/budget/client/App.jsx',
    haiku: './apps/haiku/client/App.jsx',
    index: './apps/_index/client/App.jsx'
  },
  output: {
    filename: './public/bundle/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'apps', '.']
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
