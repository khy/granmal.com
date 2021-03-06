var webpack = require('webpack');

module.exports = {
  entry: {
    budget: './apps/budget/client/App.jsx',
    dogEars: './apps/dogEars/client/app.js',
    fran: './apps/fran/client/app.js',
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
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      jQuery: 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
    }),
  ],
  devtool: 'source-map'
}
