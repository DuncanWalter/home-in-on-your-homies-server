const webpack = require('webpack');
const path = require('path');
const options = require('minimist')(process.argv.slice(2));
const createConfig = require('./webpack.config');
const { spawn } = require('child_process');

const runDevBuild = createConfig => options => {
    console.log("> Starting dev build...");
    webpack(createConfig(options), () => {
        console.log("> Completed dev build!");
    });
};

const runProdBuild = createConfig => options => {
    console.log("> Starting production build...");
    webpack(createConfig(options), () => {
        console.log("> Completed production build!");
    });
};

const runTestSuite = createConfig => options => {
    webpack(createConfig(options), () => {
        const p = spawn('node', [path.join(__dirname, '../dist/index.bundle.js')]);
        p.stdout.on('data', d => console.log('' + d));
        p.stderr.on('data', d => console.log('' + d));
    });
};

const executeBundle = options => {
    switch(true){
        case options.dev:{
            return runDevBuild(createConfig)(options);
        }
        case options.prod:{
            return runProdBuild(createConfig)(options);
        }
        case options.test:{
            return runTestSuite(createConfig)(options);
        }
    }
};

if(path.join(__dirname, 'webpack.js') === process.argv[1]){
    if(options.run){
        executeBundle(options);
    }
} else {
    module.exports = executeBundle;
}


































// const webpack = require('webpack');
// const UglifyPlugin = require('uglifyjs-webpack-plugin');
// const path = require('path');
// const options = require('minimist')(process.argv.slice(2));
// const env = require('babel-preset-env');
// const { spawn } = require('child_process');

// const plugins = [...(options => {
//     return options.prod ? [
//         new UglifyPlugin(),
//         new webpack.LoaderOptionsPlugin({
//             minimize: true,
//             debug: false,
//         }),
//     ] : [];
// })(options), 
//     new webpack.DefinePlugin({
//         argv: 'process.argv',
//     }),
// ];

// const config = {
//     entry: './src/index.js',
//     output: {
//         path: path.join(__dirname, './../dist'),
//         filename: 'index.bundle.js',
//         libraryTarget: 'umd',
//     },
//     module: { 
//         rules: [{
//             test: /\.js$/,
//             exclude: /node_modules\//,
//             use: [{
//                 loader: 'babel-loader',
//                 options: {
//                     plugins: ['babel-plugin-transform-async-to-generator'],
//                     presets: [[env, {
//                         targets: {
//                             browsers: ['> 5%'],
//                             node: 'current',
//                         },
//                     }]],
//                     cacheDirectory: true,
//                 },
//             }],
//         }],
//     },
//     resolve: {
//         alias: {
//             '~': path.join(__dirname, './../'),
//         },
//     },
//     externals: /^[^\.].+$/,
//     plugins,
// };

// if(options.dev){
//     const compiler = webpack(config);
    
//     console.log('> Starting dev server...');
//     devMiddleware.waitUntilValid(() => {
//         // TODO: take as a CLI argument so that the
//         // three libraries can interact via shelljs
//         // TODO: export a cmd / bash thingy.
//         const port = 3674;
//         const uri = `http://localhost:${port}`;
//         console.log(`> Listening at ${uri}\n`);      
//         app.listen(port);
//     });

// } else if(options.prod){
//     console.log("> Starting production build...");
//     webpack(config, () => {
//         console.log("> Completed production build!");
//     });
// }