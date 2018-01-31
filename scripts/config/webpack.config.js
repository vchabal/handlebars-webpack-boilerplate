const path = require('path');
const paths = require('./paths.config');
const pages = require('./pages.config');
const scss = require('./scss.config');

module.exports = {
    output: {
        filename: '[name]',
        path: path.join(__dirname, "../../", paths.dist)
    },

    pages: pages,
    scss: scss
};