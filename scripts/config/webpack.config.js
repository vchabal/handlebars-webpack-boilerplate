const path = require('path');
const paths = require('./paths.config');
const pages = require('./pages.config');

module.exports = {
    entry: {
        'bundle.js': ("./" + path.join(paths.src, 'index.js'))
    },

    output: {
        filename: '[name]',
        path: path.join(__dirname, "../../", paths.dist)
    },

    pages: pages
};