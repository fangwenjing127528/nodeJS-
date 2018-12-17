// 导入m_user
const m_user = require('../models/m_user');


// 处理函数模块
// 1、处理登录页面函数
exports.showSignin = (req, res) => {

  res.render("signin.html");
};

// 处理表单提交函数
exports.handleSignin = (req, res) => {
  // 获取表单数据req.body
  const body = req.body;
  // 验证邮箱
  // 查询数据操作
  //使用数据库的操作结果
  m_user.checkEmail(body.email, (err, data) => {
    if (err) {
      // throw err;
      return res.send({
        code: 500,
        message: '服务器错误'
      });
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
    // 返回200的响应
    res.send({
      code: 200,
      message: "登陆成功！"
    });
  });
}