const path = require('path');
const paths = require('./paths.config');
const pages = require('./pages.config');
const scss = require('./scss.config');

module.exports = {
    entry: {
        'styles.css': ("./" + path.join(paths.pages, 'index.scss'))
    },

    output: {
        filename: '[name]',
        path: path.join(__dirname, "../../", paths.dist)
    },

    pages: pages,
    scss: scss
};