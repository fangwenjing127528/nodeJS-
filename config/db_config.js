// 连接数据库
const mysql = require('Mysql');
//配置数据库
const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'news'
});
//连接数据库
connection.connect();
// 导出connection
module.exports  =connection;