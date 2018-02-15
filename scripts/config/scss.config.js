const fs = require('fs');
const path = require('path');
const paths = require('./paths.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('[name]');

const DIR_PROJECT = "../../";
const DIR_SCSS = path.join(__dirname, DIR_PROJECT, paths.scss);
const REGEX_SCSS = /\.scss$/;

// Pick only *.scss files
const styles = fs.readdirSync(DIR_SCSS).filter(fileName => REGEX_SCSS.test(fileName));
const entry = styles.reduce((entriesObject, fileName) => {
    const css = fileName.replace(REGEX_SCSS, '.css');
    entriesObject[css] = ("./" + path.join(paths.scss, fileName));
    return entriesObject;
}, {});

module.exports = {
    entry: entry,

    loaders: [
        {
            test: /\.scss$/,
            loader: extractSass.extract({
                use: [
                    {loader: 'css-loader', options: { sourceMap: true, minimize: true }}, 
                    {loader: 'sass-loader', options: { sourceMap: true }}
                ]
            }),
        }
    ],

    plugins: [
        extractSass
    ]
}