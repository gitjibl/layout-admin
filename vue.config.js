const path = require("path");
// TODO: 页面路径
const PAGE_PATH = path.resolve(__dirname, "src");
process.env.VUE_APP_TITLE = 'layout-admin';
module.exports = {
  publicPath: "./",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "static",
  //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@assets": path.join(__dirname, "src/assets"),
        "@components": path.join(__dirname, "src/components"),
        "@views": path.join(__dirname, "src/views"),
      },
    },
  },
  devServer: {
    //被认为是索引文件的文件名
    index: "index.html",
    port: 10237,
    //dev-server在服务器启动后打开浏览器
    open: true,
    // 跨域代理
    proxy: {
      //配置跨域
      "/api": {
        target: "http://localhost:9876",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};