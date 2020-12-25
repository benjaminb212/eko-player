const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['react-hot-loader/babel'],
                    },
                },
            },
            {
                test: /\.s?css$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        // Creates `style` nodes from JS strings
                        loader: 'style-loader',
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                            },
                        },
                    },
                    {
                        // Translates CSS into CommonJS
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        // Compiles Sass to CSS
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        // Copies individual files or entire directories, which already exist, to the build directory.
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, 'dist'),
                    from: './src/*.html',
                },
            ],
        }),
        new webpack.HotModuleReplacementPlugin(),
        // simplifies creation of HTML files to serve your webpack bundles.
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            title: 'Production',
        }),
        /**
         * extracts CSS into separate files.
         * creates a CSS file per JS file which contains CSS
         * supports On-Demand-Loading of CSS and SourceMaps
         *  */
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        // cleans build directory
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        // uses imagemin to optimize images
        new ImageMinimizerPlugin({
            minimizerOptions: {
                // Lossless optimization with custom option
                // Feel free to experiment with options for better result for you
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    [
                        'svgo',
                        {
                            plugins: [
                                {
                                    removeViewBox: false,
                                },
                            ],
                        },
                    ],
                ],
            },
        }),
    ],

    optimization: {
        // uses html-minifier-terser to optimize and minify HTML.
        minimize: true,
        minimizer: [new HtmlMinimizerPlugin()],
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        hot: true,
    },
};
