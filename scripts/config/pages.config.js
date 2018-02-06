const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths.config');
const htmlMinify = require('./html.minify.config');
const DIR_PROJECT = "../../";
const REGEX_HBS = /\.hbs$/;
const DIR_PAGES = path.join(__dirname, DIR_PROJECT, paths.pages);
const DIR_HELPERS = [
    path.join(__dirname, DIR_PROJECT, paths.helpers)
];
const DIR_PARTIALS = [
    path.join(__dirname, DIR_PROJECT, paths.partials)
];

// Read all files in src/pages folder
// Pick only *.hbs files
const pages = fs.readdirSync(DIR_PAGES).filter(fileName => REGEX_HBS.test(fileName));

// Create custom webpack-plugin for every available page to render it as *.html
const pagesPlugins = pages.map(fileName => {
    const tpl = path.join(DIR_PAGES, fileName); // src/pages/index.hbs
    const html = fileName.replace(REGEX_HBS, '.html'); // index.hbs -> index.html

    return new HtmlWebpackPlugin({
        filename: html,
        template: tpl,
        inject: false,
        xhtml: true,
        minify: htmlMinify
    })
});

module.exports = {
    entry: {},

    loaders: [
        // Compile handlebars template
        {
            test: /\.hbs$/, 
            loader: 'handlebars-loader', 
            options: {
                helperDirs: DIR_HELPERS,
                partialDirs: DIR_PARTIALS
            } 
        }
    ],

    plugins: pagesPlugins
};