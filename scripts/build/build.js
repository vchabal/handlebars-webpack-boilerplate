'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const pathsConfig = require('../config/paths.config');
const DIR_ROOT = path.resolve(__dirname, "../../");

let compiler = webpack({
    // The base directory for resolving entry points and loaders from configuration.
    // This makes configuration independent from CWD.
    context: DIR_ROOT,

    entry: webpackConfig.entry,

    output: webpackConfig.output,

    module: {
        loaders: []
            .concat(webpackConfig.pages.loaders)
            .concat(webpackConfig.scss.loaders),
    },

    plugins: []
        .concat(webpackConfig.pages.plugins)
        .concat(webpackConfig.scss.plugins)
});

compiler.run((err, stats) => {
    if (err) {
        throw err;
    }

    if (stats.hasErrors()) {
        console.log('  Build finished with errors!\n');
        console.log(stats.toString());
        process.exit(1);
    }

    if (process.env.REMOVE && process.env.REMOVE.length > 0) {
        const remove = process.env.REMOVE.split(',');
        console.log(`  Removing files in ${pathsConfig.dist} directory: ${remove.join(', ')}`);

        fs.readdirSync(path.join(DIR_ROOT, pathsConfig.dist))
            .filter(fileName => remove.indexOf(fileName) >= 0)
            .forEach(fileName => fs.unlinkSync(path.resolve(DIR_ROOT, pathsConfig.dist, fileName)));
    }

    console.log('  Build finished successfully!');
});
