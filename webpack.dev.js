const path = require('path');
const config = require('./webpack.config')
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(config, {
    mode: 'development',
    devServer: {
        liveReload: true,
      },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        assetModuleFilename: 'img/[name][ext]',
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
    ]
});