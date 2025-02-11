const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
    mode: "production",
    entry: { app: "./src/client/main.js" },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[contenthash].js",
        library: "AppModule",
        libraryTarget: "window"
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false }), new CssMinimizerPlugin()],
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/template.html",
            filename: "main.html",
            inject: "head",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" }),
        new WorkboxPlugin.InjectManifest({ swSrc: "./src/client/sw.js", swDest: "sw.js" }),
    ],
};
