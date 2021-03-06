import { getHttpsServerOptions } from "office-addin-dev-certs"
import CopyWebpackPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"

const appUrlDev = "https://localhost:3000/"
const appUrlProd = "https://stamailsummarizeapp.z6.web.core.windows.net/"
const apiUrlDev = "http://localhost:7071/api"
const apiUrlProd = "https://fa-mailsummarize.azurewebsites.net/api"

async function getHttpsOptions() {
    const httpsOptions = await getHttpsServerOptions()
    return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert }
}

export default async (env, options) => {
    const dev = options.mode === "development"
    const buildType = dev ? "dev" : "prod"
    const config = {
        devtool: "source-map",
        entry: {
            polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
            vendor: ["react", "react-dom", "core-js", "@fluentui/react"],
            taskpane: ["react-hot-loader/patch", "./src/taskpane/index.tsx"],
        },
        output: {
            devtoolModuleFilenameTemplate: "webpack:///[resource-path]?[loaders]",
            clean: true,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".html", ".js"],
            plugins: [new TsconfigPathsPlugin()],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-typescript"],
                        },
                    },
                },
                {
                    test: /\.tsx?$/,
                    use: ["react-hot-loader/webpack", "ts-loader"],
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: "html-loader",
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "assets/[name][ext][query]",
                    },
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "assets/*",
                        to: "assets/[name][ext][query]",
                    },
                    {
                        from: "manifest*.xml",
                        to: "[name]." + buildType + "[ext]",
                        transform(content) {
                            if (dev) {
                                return content
                            } else {
                                return content.toString().replace(new RegExp(appUrlDev, "g"), appUrlProd)
                            }
                        },
                    },
                ],
            }),
            new HtmlWebpackPlugin({
                filename: "taskpane.html",
                template: "./src/taskpane/taskpane.html",
                chunks: ["taskpane", "vendor", "polyfills"],
            }),
            new webpack.ProvidePlugin({
                Promise: ["es6-promise", "Promise"],
            }),
            new webpack.DefinePlugin({
                "process.env.API_URL": dev
                    ? JSON.stringify(apiUrlDev)
                    : JSON.stringify(apiUrlProd),
            }),
        ],
        devServer: {
            hot: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            https:
                env.WEBPACK_BUILD || options.https !== undefined
                    ? options.https
                    : await getHttpsOptions(),
            port: process.env.npm_package_config_dev_server_port || 3000,
        },
    }

    return config
}
