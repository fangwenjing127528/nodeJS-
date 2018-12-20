// 路由配置模块
// 导包
const express = require('express');
// 导入c_user.js模块
const c_user = require('./controller/c_user');
const c_topic = require('./controller/c_topic');
// 实例化router对象
const router = express.Router();


// 发送请求
router.get('/signin',c_user.showSignin);
// 发送表单提交请求
router.post('/signin',c_user.handleSignin);
// 发送跳转到列表页的请求
router.get('/',c_topic.showTopic);
// 点击发起按钮，跳转到create.html页面发送请求
router.get('/topic/create',c_topic.createTopic);
// 发布文章请求
router.post('/createTopic',c_topic.uploadTopic);
// 发送用户退出请求
router.get('/signout',c_user.handleSignout);
// 展示话题详情请---配置动态的标识
// router.get('/detail/topic',c_topic.showTopicDetail);
// 动态配置的固定写法;router.get('/标识/:形参名');
router.get('/detail/topic/:topicId',c_topic.showTopicDetail);
// 删除文章anniu
router.get('/topic/:topicId/delete',c_topic.handleDeleTopic);
// 编辑文章anniu
router.get('/topic/:topicId/edit',c_topic.showEditTopic);
// 发送修改form表单的form请求
router.post('/topic/edit/:topicId',c_topic.editTopic);

// 发送注册请求
router.get('/signup',c_user.handleSignup);
// 发送注册新用户请求
router.post('/signup',c_user.insertUserInfo);

// 导出router对象
module.exports = router;