module.exports = {
  entry: {
    budget: './src/budget/client/app.jsx',
    root: './src/root/client/app.jsx'
  },
  output: {
    filename: './public/bundle/[name].js'
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
