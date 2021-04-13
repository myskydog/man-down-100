const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
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
            use: ["style-loader","css-loader"]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
}