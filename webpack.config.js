const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

 
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: [{
          directory: path.join(__dirname, "dist"),
        }]
    },
    watch: true,
    output: {
        filename: '[name].[contenthash].js', // динамичное и уникальное имя файла
        path: path.resolve(__dirname, 'dist'),
        clean: true, // для очистки папки dist при новом билде
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'Наш заголовок страницы',
        }),
    ],
    module: {
        rules: [
            /** Babel **/
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
                // npm install babel-loader @babel/core @babel/preset-env -D
            },
            /** CSS */
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
                // npm i style-loader css-loader -D
            },
            /** SCSS/SAAS */
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
                // npm i style-loader css-loader sass sass-loader -D
            },
            /** Картинки */
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            /** Шрифты */
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
              }
        ],
    },
};

