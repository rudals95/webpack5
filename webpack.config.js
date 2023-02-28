const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "eval",
  entry: {
    main: "./src/index.jsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "./dist/",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      api: path.resolve(__dirname, "./src/api/"),
      utils: path.resolve(__dirname, "./src/utils/"),
      store: path.resolve(__dirname, "./src/store/"),
      pages: path.resolve(__dirname, "./src/page/"),
      layout: path.resolve(__dirname, "./src/layout/"),
      components: path.resolve(__dirname, "./src/components/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|gif|png|svg|eot|woff|ttf)$/i,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
        generator: {
          filename: "asset/resource/[name][ext]", // 생성 파일 이름 custom
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "", //css 파일경로 output 으로 따르게함
            },
          },
          "css-loader",
        ],
      },

      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 chrome versions"] },
                debug: false,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        },
        exclude: path.join(__dirname, "node_modules"), // 바벨에서 제외
      },
    ],
  },

  plugins: [
    new RefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // src/index.html 파일을 읽는다.
      filename: "index.html", // output으로 출력할 파일은 index.html 이다.
    }),
    new MiniCssExtractPlugin({ filename: "app.css" }),
  ],

  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname, "dist") },
    hot: true,
    port: 3001,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
};
