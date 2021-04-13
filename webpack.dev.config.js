const path = require("path");
const commonConfig = require('webpack.common.config');
const merge = require('webpack-merge').merge;

module.exports = merge(commonConfig, {
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader","css-loader"]
        }]
    },
});