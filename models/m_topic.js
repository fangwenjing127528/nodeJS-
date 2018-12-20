// 与数据库建立连接，查询数据库，将文章信息显示在列表页

// 导入db_config.js包
const connection = require('../config/db_config');
// 查询数据函数
exports.findAllTopic = (callback)=>{
    // 拼写sql语句
  const sqlstr = 'select * from `topics` order by id desc';
  // 执行sql语句
  connection.query(sqlstr,(err,data)=>{
    if(err){
      callback(err,null);
    }else{
      callback(null,data);
    }
  })
};


// 插入新数据
exports.insertNewTopic = (newData,callback)=>{
  // 拼写sql
  const sqlstr = 'insert into `topics` set ?';
  // 执行sql
  connection.query(sqlstr,newData,(err,data)=>{
    if(err){
      callback(err);
    }else{
      callback(null,data);
    }
  });
};


// 根据id找到文章
exports.findTopicById = (topicId,callback)=>{
  const sqlstr = 'select * from `topics` where id = ?';
  connection.query(sqlstr,topicId,(err,data)=>{
    if(err){
      callback(err);
    }else{
      callback(null,data);
    }
  });
}

// 删除文章方法
exports.deleTopicById = (topicId,callback)=>{
  const sqlstr = 'delete from `topics` where id=?';
  connection.query(sqlstr,topicId,(err,data)=>{
    if(err){
      callback(err);
    }else{
      callback(null,data);
    }
  });
}


// 修改文章
exports.editTopic = (someone,topicId,callback)=>{
  const sqlstr = 'update `topics` set ? where id=?';
  connection.query(sqlstr,[someone,topicId],(err,data)=>{
    if(err){
      callback(err);
    }else{
      callback(null,data);
    }
  });
}


