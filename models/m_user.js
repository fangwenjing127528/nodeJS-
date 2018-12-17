

// 将c_user中数据库操作部分提取出来
// 导入db_config包
const connection = require('../config/db_config');
exports.checkEmail =(email,callback)=>{
  // 验证邮箱
  // 查询数据操作
  // 拼写sql语句
  const sqlstr = 'select * from `users` where email=?';
  // 执行sql
  connection.query(sqlstr,email,(err,data)=>{
    if(err){
      callback(err,null);
    }else{
      callback(null,data);
    }
  });
}