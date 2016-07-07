module.exports = {
  entry: {
    bookClub: './apps/bookClub/client/app.js',
    budget: './apps/budget/client/App.jsx',
    shiki: './apps/shiki/client/App.jsx',
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
        test: /\.jsx?$/,
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
