'use strict';

// если не указана переменная, то считаем, что сборка для разработки
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
//  context: __dirname + '/clientSrc', // общий путь для entry

  // точки входа, т.е. js файлы которые подключаем в html
  entry: {
    home: "./clientSrc/home"
  },

  output: {
    path: __dirname + '/public/dist',
    filename: "[name].js",  // вместо name подставятся home и about из entry
    library: "[name]"       // модуль home.js будет записан в переменную home, а about.js в about
  }, 

  // перезапуск сборки
  watch: NODE_ENV == 'development',
  
  // для отладки покзывает код как он естЬ в разных модулях
  devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

  plugins: [
    // если при сборке модуля произойдет ошибка, сборка не произойдет
    new webpack.NoErrorsPlugin(),
    // плагин для передачи переменных в модули 
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    // плагин выделяет из всех модулей общую часть
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['about', 'home']   // вынести общую часть из этих модулей в common
    })/*,
    // подключаем three.js
    new webpack.ProvidePlugin({
      THREE: 'three/three.min.js'
    })*/
  ],

  // где и как искать все модули
  // указывать настройку чтобы быстрее искать модуль
  resolve: {
    modulesDirectories: ['node_modules'], // в каких директориях искать если не указан путь
    extensions: ['', '.js']
  },

  // где и как искать модули loader
  // указывать настройку чтобы быстрее искать модуль
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']  
  },

  module: {
    // loaders - это модули
    loaders: [
      {
        test: /\.jsx?$/, // к *.js файлам применять babel
        exclude: /(node_modules|bower_components)/, // не применять к этим папкам
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime'] // чтобы babel не вставлял свои функции в наши модули
        }
      }
    ],
    
    noParse: /three\/three.js/
  }
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}