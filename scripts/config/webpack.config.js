const path = require('path');
const paths = require('./paths.config');
const pages = require('./pages.config');
const scss = require('./scss.config');
const resources = require('./resources.config');

module.exports = {
    output: {
        filename: '[name]',
        path: path.join(__dirname, "../../", paths.dist)
    },

    resources: resources,
    pages: pages,
    scss: scss
};