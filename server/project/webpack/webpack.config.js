/* eslint-disable */
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var commonResolve = {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json']
};

module.exports = [
    {
        name: 'localServer',
        entry: './main.js',
        output: {
            path: path.join(__dirname, '..', '..', 'dist'),
            filename: 'app.js'
        },
        target: 'node',
        externals: [nodeExternals()],
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false,
            setImmediate: false
        },
        resolve: commonResolve,
        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new CopyWebpackPlugin([
                {context: 'public', from: '**/*', to: './public'}
            ]),
            new webpack.optimize.UglifyJsPlugin({
              mangle: true,
              compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: false,
                warnings: false
              }
            }),
        ],
        module: {
            loaders: [
                {
                    test: /\.(js)$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'stage-3'],
                        plugins: [
                            'transform-export-extensions',
                        ]
                    }
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                },
            ]
        },
    }
];
