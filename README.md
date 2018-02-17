# Handlebars Webpack Boilerplate
A basic Webpack with Handlebars setup

## Usage
This project template is recommended to use with node 8+ version. 

## Functionality
- `npm run build` to create HTML files out of HBS templates *(in development)*
  - Static assets compiled from templates in `src/pages/`
  - HTML minified with [kangax/html-minifier](https://github.com/kangax/html-minifier). You can specify configuration in `scripts/config/html.minify.config.js`.
- `npm run watch` to watch for changes and develop.
  - Outputs sourcemaps files. 
  - Starts Browser Sync server at port 8070. Edit `package.json` to edit the port number.

## How to add new page.
You can find already implemented demo page for demostration purposes. I think it's the best way to get to kow this, but ...

### Handlebars templates, partials, and helpers
All pages source are located in `src/` directory, `src/pages/`, `src/partials`, `src/helpers` respectively. But only pages at `src/pages/` are being producted to `*.html`. Be aware that you need to restart wach in case of new page template is in `src/pages/` directory. More configurations are located in `scripts/config/pages.config.js`.

### Sass
All `src/scss/*.scss` files will be compiled into `dist/*.css`. Configuration file is located in `scripts/config/scss.config.js`

### Resources
This boilerplate is currently set to work with image and font resources. But you can add your own dependencies in `scripts/config/resources.config.js`.
```JavaScript
entry: {
  'README.txt': path.join(__dirname, '../../', 'scr/README.txt'
},
loaders: [
  // previous loaders here
  {
    test: /README\.txt$/,
    loader: 'file-loader?limit=100000',
    options: {name: '[name].[ext]'}
  }
]

```

## Why isn't Sass compiled during `*.hbs` compilation?
There is still some issues regearding ["extract-text-webpack-plugin" loader is used without the corresponding plugin](https://github.com/jantimon/html-webpack-plugin/issues/579), and yet I had no time to find some workaround. No multiple Webpack runs are planed here. 