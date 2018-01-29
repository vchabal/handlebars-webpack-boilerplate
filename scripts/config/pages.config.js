const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths.config');
const htmlMinify = require('./html.minify.config');
const DIR_PROJECT = "../../";
const DIR_PAGES = path.join(__dirname, DIR_PROJECT, paths.pages);
const REGEX_HBS = /\.hbs$/;

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

// {{title}} -> {{htmlWebpackPlugin.options.data.title}}
const QUERY = {
    search: /\{\{([\w,\.]*)\}\}/,
    replace: '{{htmlWebpackPlugin.options.data.$1}}',
    flags: 'g'
};

module.exports = {
    loaders: [
        // compile handlebars template
        {test: /\.hbs$/, loader: 'handlebars-loader'}, 
        // add path to expressions
        // {{title}} -> {{htmlWebpackPlugin.options.data.title}}
        {test: /\.hbs$/, loader: 'string-replace-loader', query: QUERY}, 
    ],

    plugins: pagesPlugins
};