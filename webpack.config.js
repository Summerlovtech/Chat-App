const path = require('path');
module.exports = {
mode: 'development',
entry: './src/app.js',
devtool: 'source-map',
output: {
filename: 'bundle.js',
path: path.resolve(__dirname, 'public'),
},
module: {
    rules: [
    {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
    loader: 'babel-loader',
    options: { presets: ['@babel/preset-env']},
    }
    }
    ]
},
devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 5000
    },
resolve: {
    fallback: {"crypto": false, 
  }
},
externals: {
  express: 'express'
}
};
