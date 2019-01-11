const express = require('express');
// 创建路由对象(代替use("/")方法)
let router = express.Router();
let userController = require('../controller/userController');
let postController = require('../controller/postController');
let mgmtController = require('../controller/mgmtController');
let fileController = require('../controller/fileController');
let movieMgmtController = require('../controller/movieMgmtController');

var bodyParser = require('body-parser');  //调用模板

// 配置一些路由规则
// router.get('/',(req,res,next)=>{
//   res.json({name:'jack'});
// })
// .get('/post',(req,res)=>{
//   res.download('./02_use.js');
// })
// .get('/jsonp',(req,res)=>{
//   res.jsonp('我是jsonp书记');
// })
// //渲染模板
// .get('/render',(req,res)=>{
//   res.render('index.art',{
//     text:'hello'
//   })
// })
// res.redirect('/login');
 //創建編碼解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//调用控制器的方法
router.post("/user/checkUser",urlencodedParser, userController.checkUser)
.post("/user/login", userController.login)
.post("/user/regist", userController.regist)
.post("/user/queryUser", userController.queryUser)
.post("/user/modifyUser", userController.modifyUser)
.get("/user/queryUserList", userController.queryUserList)
.get("/user/queryAdminUserList", userController.queryAdminUserList)
.get("/user/removeUser", userController.removeUser)
.post('/user/uploadAvatar/:userId', fileController.uploadAvatar)
//.post('/user/getAvatar', fileController.getAvatar)

//查找用户的个人所有博文
.get('/post', postController.queryMyAllPost)
//按照blog_id查询详细内容
.get('/post/:blog_id', postController.queryPostById)
//添加博客
.post('/post/mgmt/addOrUpdatePost', postController.addOrUpdatePost)
//添加博客图片
.post('/post/uploadBlogImage', fileController.uploadBlogImage)

//删除博客
.get('/post/mgmt/delPost', postController.delPost)
//查找博客点击量
.get('/post/mgmt/getHits', postController.getHits)
//获取侧边栏菜单
.get("/sys/queryMenuList", mgmtController.queryMenuList)

//////////////////////////////////////////////////////////////
//豆瓣电影app
.get("/movie/queryMovieByClass", movieMgmtController.queryMovieByClass)
.get("/movie/queryMovieById", movieMgmtController.queryMovieById)
.get("/movie/queryMovieBySearchKey", movieMgmtController.queryMovieBySearchKey)

module.exports.routerConfig = router;

