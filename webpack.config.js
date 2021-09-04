const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production'; //define uma variável de ambiente
  //__dirname refere-se ao diretório onde está o arquivo webpack.config.js
  //a função resolve pega o caminho correto de acordo com o sistema operacional

module.exports = {
  mode: isDevelopment? 'development':'production', //modo de execução do webpack
  devtool: isDevelopment? 'eval-source-map' : 'source-map', //desfaz o código gerado no bundle retornando ao código original, útil para depurar erros no navegador
  entry: path.resolve(__dirname, 'src', 'index.tsx'), //arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), //arquivo de saída
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] //pode ler aquivos js ou jsx ou ts ou tsx
  },
  devServer: {
    hot:true,
    static:{
      directory: path.resolve(__dirname, 'public'),
    }
  },//server para que o webpack possa observar alterações nos arquivos da pasta src e atualizar a aplicação sozinho
  plugins:[
    isDevelopment && new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html') //serve para criar um arquivo html no dist já referenciando o bundle.js
    })
  ].filter(Boolean),
  module: { //configurações de como a aplicação vai funcionar de acordo com os tipos de arquivos
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use:{ 
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        } //pacote que faz a integração entre o babel e o webpack, neste caso quando o webpack encontrar um arquivo jsx irá converter utilizando o babel-loader
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']//pacote que faz a integração entre o babel e o webpack, neste caso quando o webpack encontrar um arquivo jsx irá converter utilizando o babel-loader
      },
    ],
  }
}