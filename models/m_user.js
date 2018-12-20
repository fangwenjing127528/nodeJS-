

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
};


// 添加新用户信息
exports.insertUser=(body,callback)=>{
  // 拼写sql
  const sqlstr = 'insert into `users` set ?';
  //执行sql
  connection.query(sqlstr,body,(err,data)=>{
    if(err){
      callback(err,null);
    }else{
      callback(null,data);
    }
  });
}


//检测昵称的sql
exports.checkNiceName=(nickname,callback)=>{
  // 拼写sql
  const sqlstr = 'select * from `users` where nickname=?';
  //执行sql
  connection.query(sqlstr,nickname,(err,data)=>{
    if(err){
      callback(err,null);
    }else{
      callback(null,data);
    }
  });
}
