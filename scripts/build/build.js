'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const pathsConfig = require('../config/paths.config');
const watchConfig = require('../config/watch.config');

const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const http = require('http');

const DIR_ROOT = path.resolve(__dirname, "../../");
const WATCH = (process.argv.indexOf("--watch") >= 2);
const SERVE = (process.argv.indexOf("--serve") >= 2);
const PORT = SERVE ? parseInt(process.argv[process.argv.indexOf("--serve") + 1]) : -1;

let compiler = webpack({
    // The base directory for resolving entry points and loaders from configuration.
    // This makes configuration independent from CWD.
    context: DIR_ROOT,
    
    output: webpackConfig.output,

    entry: Object.assign({},
        webpackConfig.pages.entry,
        webpackConfig.scss.entry),

    module: {
        loaders: []
            .concat(webpackConfig.pages.loaders)
            .concat(webpackConfig.scss.loaders),
    },

    plugins: []
        .concat(webpackConfig.pages.plugins)
        .concat(webpackConfig.scss.plugins)
});

/** 
 * Simple coloring of console output
 * @example console.log(color.r("Hello World!"));
 * @see https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color#answer-46705010
 */
const color = 'r1 g2 b4 w7 c6 m5 y3 k0'.split(' ').reduce((o, c) => { 
    o[c[0]] = (f=>`\x1b[3${ c[1] }m${ f }\x1b[0m`);
    return o;
}, {});

function time () {
    var date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function callback (err, stats) {
    if (err) {
        throw err;
    }
    
    if (stats.hasErrors()) {
        console.log('  Build finished with errors!\n');
        console.log(stats.toString());
        process.exit(1);
    } else {
        console.log(color.g(stats.toString().split(/\n/).filter(str=>/\[emitted\]/.test(str)).join('\n')));
    }

    console.log(`  [${color.y(time())}]`, WATCH ? 'Watching for changes ...':'Build finished successfully!');
}; 

if (WATCH) {
    compiler.watch(watchConfig, callback);
} else {
    compiler.run(callback);
}

if (SERVE) {
    let distribution = serveStatic('dist', {'index': 'index.html'});
    let server = http.createServer(function onRequest (req, res) {
        distribution(req, res, finalhandler(req, res))
    });

    server.listen(PORT);
    console.log(`  [${color.y(time())}] HTTP server listening on localhost:${PORT}`);
}
