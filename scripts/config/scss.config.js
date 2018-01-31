const path = require('path');
const paths = require('./paths.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('[name]');

module.exports = {
    entry: {
        'styles.css': ("./" + path.join(paths.pages, 'index.scss'))
    },

    loaders: [
        {
            test: /\.scss$/,
            loader: extractSass.extract({
                use: [
                    {loader: 'css-loader', options: {minimize: true}}, 
                    {loader: 'sass-loader'}
                ]
            }),
        }
    ],

    plugins: [
        extractSass
    ]
}