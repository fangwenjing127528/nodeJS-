//入口函数模块
// 导入express
const express = require('express');
// 导入router.js模块
const router = require('./router');
// 导入body-parser包
const bodyParser = require('body-parser');
// 导入express-session包
const session = require('express-session');
// 导入express-mysql-session
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'news'
};
const sessionStore = new MySQLStore(options);
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
// 配置express-mysql-session包
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// 处理监听session的中间件---公共成员复制的中间件
app.use((req,res,next)=>{
  app.locals.sessionUser=req.session.user;
  next();
})

//使用路由
app.use(router);

// 处理404
app.use((req,res,next)=>{
  res.render('404.html');
  next();
})



//统一配置所有的错误
app.use((err,req,res,next)=>{
  res.send({
    code:500,
    message:err.message
  });
});
//监听接口
app.listen(12347,() => {
  console.log('run it-----');
})