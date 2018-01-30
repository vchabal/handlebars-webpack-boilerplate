const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths.config');
const htmlMinify = require('./html.minify.config');
const DIR_PROJECT = "../../";
const REGEX_HBS = /\.hbs$/;
const DIR_PAGES = path.join(__dirname, DIR_PROJECT, paths.pages);
const DIR_HELPERS = [
    path.join(__dirname, "../helpers"),
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
    const js = fileName.replace(REGEX_HBS, '.js'); // index.hbs -> index.js
    const dataPath = path.relative(__dirname, path.join(DIR_PAGES, js));

    return new HtmlWebpackPlugin({
        filename: html,
        template: tpl,
        inject: false,
        xhtml: true,
        minify: htmlMinify,
        // custom data for template
        data: require(dataPath)
    })
});

module.exports = {
    loaders: [
        // Compile handlebars template
        {
            test: /\.hbs$/, 
            loader: 'handlebars-loader', 
            options: {
                helperDirs: DIR_HELPERS,
                partialDirs: DIR_PARTIALS
            } 
        }, 
        // Move data to be accessible
        {
            test: /\.hbs$/, 
            loader: 'string-replace-loader', 
            query: {
                search: /^(.)/,
                replace: '{{prepareDataForTemplate this htmlWebpackPlugin.options.data}}$1',
            }
        }, 
    ],

    plugins: pagesPlugins
};