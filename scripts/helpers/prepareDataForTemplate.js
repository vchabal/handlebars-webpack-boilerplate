module.exports = function (templateData, customData) {
    /**
     * Object with data passed to compiler looks like this" 
    
    var data = {
        compilation: compilation,
        webpack: compilation.getStats().toJson(),
        webpackConfig: compilation.options,
        htmlWebpackPlugin: {
            files: assets,
            options: self.options
        }
    }

     * And due to this, template needs to have full paths
     * to data with prefix "htmlWebpackPlugin.options.data".
     * 
     * With this function data are moved to templateData object,
     * and can be accessed without prefix, directly: {{title}}, {{name}}
     * 
     * @see html-webpack-plugin index.js:269, function HtmlWebpackPlugin.prototype.executeTemplate
     */

    for(var key in customData) {
        templateData[key] = customData[key];
    }
}