const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const glob = require('glob');
const path = require('path');

const SCRIPT_FOLDERS = ['background', 'contentScripts'];
let entries = {};
SCRIPT_FOLDERS.forEach((scriptFolder) => {
    let filePaths = glob.sync(scriptFolder + "/**/*.js");
    filePaths.forEach((filePath) => {
        entries[filePath] = "./" + filePath;
    });
});

module.exports = {
    mode: "production",
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name]"
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    // allows to use .toString()
                    'to-string-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin,
        new CopyPlugin([
            // folders
            {from: 'images', to: 'images'},
            {from: 'popupScripts', to: 'popupScripts'},

            // files
            {from: 'manifest.json'},
            {from: 'popup.html'},
            {from: 'styles/style.css', to: 'styles'},
            {from: 'external/materialize/LICENSE', to: 'external/materialize'}
        ])
    ],
    optimization: {
        // Chrome Web Store prohibits code obfuscation
        minimize: false
    },
};
