// 导入m_topic.js包
const m_topic = require('../models/m_topic');
// 导入moment包---设置时间
const moment = require('moment');

// 展示文章列表
exports.showTopic = (req,res)=>{
  m_topic.findAllTopic ((err,data)=>{
    // 处理错误信息---app.js中用中间件处理
    if(err){
      // 调用next(err)方法--带参数，匹配有四个参数的中间件
      return next(err);
    }
    res.render('index.html',{
      items:data,
    });
      // user:req.session.user
  });
}


// 跳转到编辑新的文章
exports.createTopic = (req,res)=>{
  res.render('topic/create.html',{
    user:req.session.user
  });
}

// 发布新文章
exports.uploadTopic = (req,res)=>{
  // 获取新数据
  const body = req.body;
  // 给body增加createAt和userId成员
  body.createdAt = moment().format();
  body.userId = req.session.user.id;
  m_topic.insertNewTopic(body,(err,data)=>{
    if(err){
      return next(err)
    }
    res.send({
      code:200,
      message:'添加数据成功'
    })
  });
}
// 展示文章详情页
exports.showTopicDetail = (req,res)=>{
  // 得到当前文章的id
  const topicId = req.params.topicId;
  // 让m根据id查询数据
  m_topic.findTopicById(topicId,(err,data)=>{
    if(err){
      return next(err)
    }
    //数据不能存在
    // if(data[0].length===0){
    //   return res.send({
    //     code:1,
    //     message:'该文章不存在，可能已被删除'
    //   });
    // }
    // console.log(data);
   // if(req.session.user){
       res.render('topic/show.html',{
        topicInfo:data[0],
        // sessionUserId:req.session.user?req.session.user.id:0
      });
    //}else{
    ///  res.render('topic/show.html',{
       // topicInfo:data[0]
      //});
   // }
    
  });
};

// 删除文章
exports.handleDeleTopic = (req,res)=>{
  // 得到当前文章的id
  const topicId = req.params.topicId;
  // 使用id，删除文章---操作sql语句
  m_topic.deleTopicById(topicId,(err,data)=>{
    if(err){
      return next(err)
    }
   return res.redirect('/');
  })
};


// 渲染指定编辑页
exports.showEditTopic = (req,res)=>{
  // 得到当前文章的id
  const topicId = req.params.topicId;
  // 根据id查询数据库，执行sql
  m_topic.findTopicById(topicId,(err,data)=>{
    if(err){
      return next(err);
    }
    //将查询结果渲染到页面
    res.render('topic/edit.html',{
      topic:data[0]
    });
  });
};


// 修改文章内容
exports.editTopic = (req,res)=>{
  // 获取数据
  const body = req.body;
  // 获取当前文章的id
  const topicId = req.params.topicId;
  //根据数据和id执行sql
  m_topic.editTopic(body,topicId,(err,data)=>{
    if(err){
      return next(err);
    }
    res.send({
      code:200,
      message:'修改成功'
    })
  });
}
