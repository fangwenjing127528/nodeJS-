// 导入m_user
const m_user = require('../models/m_user');


// 处理函数模块
// 1、处理登录页面函数
exports.showSignin = (req, res,next) => {

  res.render("signin.html");
};

// 处理表单提交函数
exports.handleSignin = (req, res,next) => {
  // 获取表单数据req.body
  const body = req.body;
  // 验证邮箱
  // 查询数据操作
  //使用数据库的操作结果
  m_user.checkEmail(body.email, (err, data) => {
    if (err) {
      // throw err;
      return next(err);
    }
    //data---》有数据||‘’
    if (data.length === 0) {
      return res.send({
        code: 1,
        message: "邮箱不存在"
      });
    }
    // 验证密码
    //  如果密码不正确
    if (data[0].password !== body.password) {
      return res.send({
        code: 2,
        message: "密码不正确"
      });
    }
    // 邮箱密码都正确
    // 保存session
      req.session.user=data[0];
    // 返回200的响应
    res.send({
      code: 200,
      message: "登陆成功！"
    });
  });
};


// 用户退出请求
exports.handleSignout = (req,res,next)=>{
  // 1、清除session中的user信息
  delete req.session.user;
  // 跳转到登陆页
  res.redirect('/signin');
}


//注册新用户
exports.handleSignup=(req,res,next)=>{
  // 跳转到注册页
  res.render('signup.html');
}

// 添加新用户信息
exports.insertUserInfo = (req,res,next)=>{
    // 获取用户填写的数据
    const body = req.body;
     // 判断email是否存在
     m_user.checkEmail(body.email,(err,data)=>{
      if(err){
        return next(err)
      }
        if(data[0]){
          return res.send({
            code:1,
            message:'该邮箱已注册，可直接登录'
          });
        }
      // 邮箱不存在，检查昵称
      m_user.checkNiceName(body.nickname,(err,data)=>{
        if(err){
          return next(err)
        }
        if(data[0]){
          return res.send({
            code:2,
            message:'该昵称已被占用'
          });
        }
        // 昵称也不存在，执行插入语句
          m_user.insertUser(body,(err,data)=>{
            if(err){
              return next(err)
            }
            res.send({
              code:200,
              message:'注册成功'
            });
        });
      });
    });
  
}