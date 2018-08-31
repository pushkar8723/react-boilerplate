import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';

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
        filename: 'bundle.js',
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
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
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
                use: ['style-loader', 'css-loader'],
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
