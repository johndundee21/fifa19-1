const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');


const HotModuleReplacement = new webpack.HotModuleReplacementPlugin();
const hot_cfg = 'webpack-hot-middleware/client?path=./__webpack_hmr&timeout=2000&overlay=false&reload=false';

const App_init = new HtmlWebPackPlugin({
    template: './index.html',
    filename: './index.html',
    chunks: ['script']
});


let ProductionPlugins = [
    App_init
];

let DevelopmentPlugins = [
    App_init,
    HotModuleReplacement
];

module.exports = {
  mode: 'development',
  context: __dirname + "/src",
  entry: {
    vendor: ["./js/vendor.js"],
    app: [hot_cfg, './js/app.js'],
    script: ["./js/script.js"]
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: "['name'].bundle.js",
    path: path.resolve(__dirname, 'src/dist'),
    publicPath: '/'
  },
  plugins: DevelopmentPlugins
};