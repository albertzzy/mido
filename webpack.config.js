var webpack = require('webpack');
var path = require('path');


var plugins = [
    new webpack.SourceMapDevToolPlugin({
        columns: false
    }),
    new webpack.HotModuleReplacementPlugin()
];

var filename = 'mido.js';

module.exports = (env)=>{ 
    
    if (env && env.NODE_ENV === 'pro') {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));
        filename = 'mido.min.js';
    }

    
    return {
        entry: './index.js',

        output: {
            path: path.resolve((env && env.NODE_ENV === 'dev')? './dev':'./dist'),
            filename: filename
        },

        devServer: {
            contentBase: path.join(__dirname),
            compress: true, 
            port: 9000
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    use:[{
                        loader:'babel-loader',
                        options:{
                            presets: ["babel-preset-es2015"]
                        }
                    }] 
                }
            ]
        },
        plugins: plugins
    }
};

