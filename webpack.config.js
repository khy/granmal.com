module.exports = {
  entry: './public/app.jsx',
  output: {
    filename: './public/site/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map'
}
