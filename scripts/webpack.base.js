/*
 * @Author: {zhengzhuang}
 * @Date: 2023-07-20 17:30:43
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-08-03 15:48:29
 * @Description:
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist"), // 打包后的代码放在dist目录下
    filename: "[name].[hash:8].js", // 打包的文件名
    publicPath: "/",
  },
  resolve: {
    // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
    extensions: [".mjs", ".js", ".json", ".jsx", ".ts", ".tsx"], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
  },
  devServer: {
    historyApiFallback: true, // 历史 Api 回退
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets:
                    "iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead", // 根据项目去配置
                  useBuiltIns: "usage", // 会根据配置的目标环境找出需要的polyfill进行部分引入
                  corejs: 3, // 使用 core-js@3 版本
                },
              ],
              ["@babel/preset-typescript"],
              ["@babel/preset-react"],
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          // {
          //   loader: 'file-loader',
          // },
          {
            loader: "url-loader",
            options: {
              limit: 2000,
              // //限制打包图片的大小：
              // //如果大于或等于2000Byte，则按照相应的文件名和路径打包图片；如果小于2000Byte，则将图片转成base64格式的字符串。
              // name: 'img/[name].[hash:8].[ext]',
              // //img:图片打包的文件夹；
              // //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
              // //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 使用自定义模板
    }),
  ],
};
