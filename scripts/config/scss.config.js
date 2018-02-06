const fs = require('fs');
const path = require('path');
const paths = require('./paths.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('[name]');

const DIR_PROJECT = "../../";
const DIR_PAGES = path.join(__dirname, DIR_PROJECT, paths.pages);
const REGEX_SCSS = /\.scss$/;

// Read all files in src/pages folder
// Pick only *.scss files
const styles = fs.readdirSync(DIR_PAGES).filter(fileName => REGEX_SCSS.test(fileName));
const entry = styles.reduce((entriesObject, fileName) => {
    const css = fileName.replace(REGEX_SCSS, '.css');

    entriesObject[css] = ("./" + path.join(paths.pages, fileName));
    return entriesObject;
}, {});

module.exports = {
    entry: entry,

    loaders: [
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'file-loader?limit=100000',
            options: {name: 'fonts/[name].[hash].[ext]'}
        },
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