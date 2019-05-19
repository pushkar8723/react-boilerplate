import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const mode = process.env.NODE_ENV;
const isProduction = mode === 'production';

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
});

const copyPlugin = new CopyPlugin([
    { from: './_redirects', to: './'}
]);

const config = {
    __MODE__: JSON.stringify(mode || 'production'),
};

export default {
    entry: './src/app.ts',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].[hash].js',
        path: `${__dirname}/dist`,
        publicPath: '/'
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
        historyApiFallback: true
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
        alias: {
            config: path.resolve(__dirname, './src/config'),
            views: path.resolve(__dirname, './src/views'),
            utils: path.resolve(__dirname, './src/utils'),
            core: path.resolve(__dirname, './src/core'),
            model: path.resolve(__dirname, './src/model'),
            services: path.resolve(__dirname, './src/services'),
            components: path.resolve(__dirname, './src/components'),
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
            {
                test: /\.(png|jpg|jpeg|gif|ttf|woff2|woff|eot)$/,
                loader: 'url-loader?limit=1000&name=images/[name]_[hash:6].[ext]',
            },
            // All files with a '.ts' or '.tsx' extension will be
            // handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
            },
        },
    },
    plugins: [
        htmlPlugin,
        new webpack.DefinePlugin(config),
        new CompressionPlugin(),
        ...(isProduction ? [ new BundleAnalyzerPlugin({
            analyzerMode: 'static',
        })] : []),
        copyPlugin
    ],
};
