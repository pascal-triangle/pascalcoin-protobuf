const path = require("path")
const nodeExternals = require("webpack-node-externals")

const serverConfig = {
    target: "node",
    optimization: {
        minimize: true,
    },
    output: {
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, "dist"),
        filename: "lib.node.js"
    },
    externals: [nodeExternals()]
}

const clientConfig = {
    target: "web",
    optimization: {
        minimize: true,
    },
    output: {
        libraryTarget: "umd",
        globalObject: "this",
        path: path.resolve(__dirname, "dist"),
        filename: "lib.web.js"
    },
    node: false
}

module.exports = [ serverConfig, clientConfig ]
