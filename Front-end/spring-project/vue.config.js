// vue.config.js
module.exports = {
  publicPath: "./",
  devServer: {
    // 设置默认端口
    port: 8081,
    host: "localhost",
    // 设置代理
    proxy: {
      "/api": {
        // 目标 API 地址
        target: "http://localhost:8080/",
        // 将主机标头的原点更改为目标URL
        changeOrigin: true
      }
    }
  },
  // pages: {
  //   main: {
  //     // page 的入口
  //     entry: "src/main/main.js",
  //     // 模板来源
  //     template: "src/main/index.html",
  //     // 在 dist/index.html 的输出
  //     filename: "index.html",
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: "main Page",
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ["chunk-vendors", "chunk-common", "main"]
  //   },
  //   login: {
  //     // page 的入口
  //     entry: "src/login/main.js",
  //     // 模板来源
  //     template: "src/login/login.html",
  //     // 在 dist/index.html 的输出
  //     filename: "login.html",
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: "login Page",
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ["chunk-vendors", "chunk-common", "login"]
  //   }
  //},
  productionSourceMap: false
};
