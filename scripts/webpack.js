const webpack = require('webpack');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const options = require('minimist')(process.argv.slice(2));
const env = require('babel-preset-env');

const plugins = [...(options => {
    return options.prod ? [
        new UglifyPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
    ] : [];
})(options), 
    new webpack.DefinePlugin({
        argv: 'process.argv',
    }),
];

const config = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './../dist'),
        filename: 'index.bundle.js',
        libraryTarget: 'umd',
    },
    module: { 
        rules: [{
            test: /\.js$/,
            exclude: /node_modules\//,
            use: [{
                loader: 'babel-loader',
                options: {
                    plugins: ['babel-plugin-transform-async-to-generator'],
                    presets: [[env, {
                        targets: {
                            browsers: ['> 5%'],
                            node: 'current',
                        },
                    }]],
                    cacheDirectory: true,
                },
            }],
        }],
    },
    resolve: {
        alias: {
            '~': path.join(__dirname, './../'),
        },
    },
    externals: /^[^\.].+$/,
    plugins,
};

if(options.dev){
    const compiler = webpack(config);
    
    console.log('> Starting dev server...');
    devMiddleware.waitUntilValid(() => {
        // TODO: take as a CLI argument so that the
        // three libraries can interact via shelljs
        // TODO: export a cmd / bash thingy.
        const port = 3674;
        const uri = `http://localhost:${port}`;
        console.log(`> Listening at ${uri}\n`);      
        app.listen(port);
    });

} else if(options.prod){
    console.log("> Starting production build...");
    webpack(config, () => {
        console.log("> Completed production build!");
    });
}