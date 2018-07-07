/**
 * Created by zsp on 2018/1/26.
 */
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var deps = [
    'react/dist/react.min.js'
];

var config = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {}
    },
    module: {
        noParse: [],
        loaders: [
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    }
};
deps.forEach(function (dep) {
    var depPath = path.resolve(node_modules_dir, dep);
    config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
});
module.exports = config;