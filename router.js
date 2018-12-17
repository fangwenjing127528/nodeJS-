// 路由配置模块
// 导包
const express = require('express');
// 导入c_user.js模块
const c_user = require('./controller/c_user');
// 实例化router对象
const router = express.Router();


// 发送请求
router.get('/signin',c_user.showSignin);
// 发送表单提交请求
router.post('/signin',c_user.handleSignin);

// 导出router对象
module.exports = router;