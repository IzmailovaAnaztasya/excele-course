const path = require('path'); //стандартый модуль для указания контекста context из списка стандартных пакетов node

module.exports = {
    context: path.resolve(__dirname, 'src'), //через метод resolve соединяем системн перемен __dirname это путь до папки проекта и нужной строки, т.о WP смотрит за всеми исходниками в папке src
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
}