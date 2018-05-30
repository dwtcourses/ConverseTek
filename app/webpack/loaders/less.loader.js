/* eslint-disable */
var webpack = require('webpack');

module.exports = function(config, APP_DIR) {
    console.log('Using css and less loader');

    config.module.rules.push({
        test: /\.less$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                }
            },
            {
                loader: 'less-loader',
                options: {
                    // modifyVars: { "@primary-color": "#52c41a" }
                }
            }
        ]
    });

    return config;
}
