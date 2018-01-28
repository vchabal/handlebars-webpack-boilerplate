# Handlebars Webpack Boilerplate
A basic Webpack with Handlebars setup

## Usage
This project template is recommended to use with node 8+ version. 

## Functionality
- `npm run build` to create HTML files out of HBS templates *(in development)*
  - Static assets compiled from templates in `src/pages/`
  - HTML minified with [kangax/html-minifier](https://github.com/kangax/html-minifier). You can specify configuration in `scripts/config/html.minify.config.js`.