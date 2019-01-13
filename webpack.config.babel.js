import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import path from 'path';

const mode = process.env.NODE_ENV;
const isProduction = mode === 'production';

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
});

const config = {
    __MODE__: JSON.stringify(mode || 'production'),
};

export default {
    entry: './src/app.tsx',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: `${__dirname}/dist`,
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: isProduction ? '(none)' : 'source-map',
    devServer: {
        contentBase: './dist',
        watchOptions: {
            poll: !isProduction,
            ignored: /node_modules/,
        },
        host: '0.0.0.0',
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
        alias: {
            config: path.resolve(__dirname, './src/config'),
            views: path.resolve(__dirname, './src/views'),
            utils: path.resolve(__dirname, './src/utils'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
            },
            // All files with a '.ts' or '.tsx' extension will be
            // handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        ],
    },
    plugins: [
        htmlPlugin,
        new webpack.DefinePlugin(config),
    ],
};
