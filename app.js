//入口函数模块
// 导入express
const express = require('express');
// 导入router.js模块
const router = require('./router');
// 导入body-parser包
const bodyParser = require('body-parser');
// 实例化app
const app = express();
// 配置express-art-template包
// 当渲染html这种文件时，使用express-art-template
// 结果res增加一个render方法
app.engine('html',require('express-art-template'));
// 配置静态资源
app.use("/public", express.static("./public"));
// 配置第三方资源
app.use("/node_modules", express.static("./node_modules"));
// 配置body-parser
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());
//使用路由
app.use(router);
//监听接口
app.listen(12347,() => {
  console.log('run it-----');
})