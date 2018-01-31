const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('[name]');

module.exports = {
    loaders: [ {
        test: /\.scss$/,
        loader: extractSass.extract(['css-loader', 'sass-loader']),
    }],

    plugins: [
        extractSass
    ]
}