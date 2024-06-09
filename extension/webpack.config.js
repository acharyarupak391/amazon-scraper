module.exports = {
  // mode: 'development',
  // entry: './src/index.tsx',
  // view: './src/view.tsx',
  entry: {
    index: './src/index.tsx',
    view: './src/view.tsx',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/dist',
  },
  devtool: 'source-map',
};