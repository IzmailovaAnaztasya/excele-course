const path = require('path'); //стандартый модуль для указания контекста context из списка стандартных пакетов node
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

console.log('IS PROD', isProd);
console.log('IS DEV', isDev);

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ]
  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders;
}

module.exports = {
    context: path.resolve(__dirname, 'src'), //через метод resolve соединяем системн перемен __dirname это путь до папки проекта и нужной строки, т.о WP смотрит за всеми исходниками в папке src
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'), //rкогда мы пишем символ, то сразу же переходим в папку и уже от нее идем
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      port: 3000,
      hot: isDev
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ //подключение плагина плюс настройка
            template: 'index.html', //шаблон для html без укаания папки src
            minify: {
                removeComments: isProd, //удаление комментариев
                collapseWhitespace: isProd //удаление пробелов
            }
        }),
        new CopyPlugin({ //для переноса фавикон
            patterns: [ // в конструктор передаем массив и два объекта
              { 
                  from: path.resolve(__dirname, 'src/favicon.ico'), 
                  to: path.resolve(__dirname, 'dist')
                },
            ],
          }),
        new MiniCssExtractPlugin({
            filename: filename('css')// принимает в себя один параметр которому говорим в какой файл перемещать
        })
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader, //наход в статическ переменной плагина мини cssextract-loader
              // Translates CSS into CommonJS
                "css-loader",
              // Compiles Sass to CSS
                "sass-loader",
            ],
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: jsLoaders()
          },
        ],
      },
}