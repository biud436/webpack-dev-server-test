const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {webpack.Configuration}
 */
module.exports = {
    mode: "production",
    entry: `./src/index.ts`,
    output: {
        path: path.resolve(__dirname, "dist", "js"),
        filename: `bundle.js`,
    },
    module: {
        rules: [
            // {
            //     test: /\.tsx?$/,
            //     use: "ts-loader",
            //     exclude: /node_modules/,
            // },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                            },
                        },
                    },
                },
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "libs")],
                exclude: /(node_modules|bower_components)/,
                use: [],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                include: [path.resolve(__dirname, "images")],
                exclude: /(node_modules|bower_components)/,
                use: ["file-loader"],
            },
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, "public")],
                exclude: /(node_modules|bower_components)/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            publicPath: "/",
            templateContent: fs.readFileSync(
                path.resolve(__dirname, "public", "index.html"),
                "utf8"
            ),
        }),
    ],
    // hot reloading
    devServer: {
        compress: true,
        hot: true,
        open: true,
        historyApiFallback: true,
        liveReload: true,
        webSocketServer: {
            type: "ws",
        },
        client: {
            progress: true,
        },
    },
    devtool: "source-map",
};
