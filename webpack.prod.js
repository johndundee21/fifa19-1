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

module.exports = env => {
    // console.log('NODE_ENV: ', env.NODE_ENV);
    console.log('Production: ', env.mode);
    let env_mode, env_prod;

    if (env.mode === 'prod') {
        env_mode = 'production';
        env_prod = true;
    } else {
        env_mode = 'development';
        env_prod = false;
    }

    return {
        mode: env_prod ? 'production' : 'development',
        context: __dirname + "/src",
        entry: {
            vendor: ["./js/vendor.js"],
            app: (env_prod) ? ['./js/app.js'] : [hot_cfg, './js/app.js'],
            script: ["./js/script.js"]
        },
        output: {
            filename: '[name].bundle.js',
            chunkFilename: "['name'].bundle.js",
            path: path.resolve(__dirname, 'src/dist'),
            publicPath: '/'
        },
        plugins: (env_prod) ? ProductionPlugins : DevelopmentPlugins
    }
};
