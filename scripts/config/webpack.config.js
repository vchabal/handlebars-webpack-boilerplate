const path = require('path');
const paths = require('./paths.config');
const pages = require('./pages.config');
const scss = require('./scss.config');

module.exports = {
    entry: {
        'bundle.js': ("./" + path.join(paths.src, 'index.js')),
        'styles.css': ("./" + path.join(paths.scss, 'styles.scss'))
    },

    output: {
        filename: '[name]',
        path: path.join(__dirname, "../../", paths.dist)
    },

    pages: pages,
    scss: scss
};