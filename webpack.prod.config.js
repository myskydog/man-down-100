const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const commonConfig = require('./webpack.common.config');
const merge = require('webpack-merge').merge;

module.exports = merge(commonConfig, {
    mode: "production",
    module: {
        rules: [{
            test: /\.html$/,
            use: ["html-loader"]
        }, {
            test: /\.(svg|png|jpg|gif)$/,
            loader: "file-loader",
            options: {
                name: "[name].[hash].[ext]",
                outputPath: "assets"
            }

        },{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
            ]
        }]
    },
    optimization: {
        minimizer:[new OptimizeCssAssetsPlugin()]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].[hash].css"}),
        new CleanWebpackPlugin(),
    ],
});