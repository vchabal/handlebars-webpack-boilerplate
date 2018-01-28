'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIR_PROJECT = '../../';
const DIR_BUILD = 'dist/';
const DIR_SRC = 'src/';
const DIR_PAGES = DIR_SRC + 'pages';
const DIR_LOADRES = 'scripts/loaders';
const REGEX_HBS = /\.hbs$/;

const REMOVE_JS_BUNDLE = true;

// Read all files in src/pages folder
// Pick only *.hbs files
let pages = fs.readdirSync(DIR_PAGES).filter(fileName => REGEX_HBS.test(fileName));

// Create custom webpack-plugin for every available page to render it as *.html
let pagesPlugins = pages.map(fileName => {
    const html = fileName.replace(REGEX_HBS, '.html'); // index.hbs -> index.html
    const js = fileName.replace(REGEX_HBS, '.js'); // index.hbs -> index.js
    const tpl = path.resolve(__dirname, DIR_PROJECT, DIR_PAGES, fileName); // src/pages/index.hbs

    const dataPath = path.relative(path.resolve('./'), path.resolve(DIR_PROJECT, DIR_PAGES, js));

    return new HtmlWebpackPlugin({
        filename: html,
        template: tpl,
        inject: false,
        xhtml: true,
        // custom data for template
        data: require(dataPath)
    })
})

// Prepend path to expressions in template
// {{title}} -> {{htmlWebpackPlugin.options.data.title}}
const query = {
    search: /\{\{([\w,\.]*)\}\}/,
    replace: '{{htmlWebpackPlugin.options.data.$1}}',
    flags: 'g'
};

let compiler = webpack({

    // The base directory for resolving entry points and loaders from configuration.
    // This makes configuration independent from CWD.
    context: path.resolve(__dirname, DIR_PROJECT),

    entry: {
        'bundle.js': path.resolve(__dirname, DIR_PROJECT, DIR_SRC, 'index.js')
    },

    output: {
        filename: '[name]',
        path: path.resolve(__dirname, DIR_PROJECT, DIR_BUILD)
    },

    module: {
        loaders: [
            {test: REGEX_HBS, loader: 'handlebars-loader'}, // second, compile handlebars template
            {test: REGEX_HBS, loader: 'string-replace-loader', query: query} // first, add path to expressions
        ]
    },

    plugins: [/* Add custom Plugins here*/].concat(pagesPlugins)
});

compiler.run((err, stats) => {
    if (err) {
        throw err;
    }

    console.log(stats.toString());

    if (stats.hasErrors()) {
        console.log('  Build finished with errors!\n');
        process.exit(1);
    }

    if (REMOVE_JS_BUNDLE) {
        fs.unlinkSync(path.resolve(__dirname, DIR_PROJECT, DIR_BUILD, 'bundle.js'));
    }

    console.log('  Build finished successfully!');
});
