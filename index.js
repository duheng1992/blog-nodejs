// 引入
const express = require('express');
const routerConfig = require('./router/router-config').routerConfig;
var bodyParser = require('body-parser');  //调用模板

const cookieParser = require('cookie-parser');
const session = require('express-session');

var multer = require('multer')
const upload = multer({ dest: 'uploads/' });


// 创建服务器
const app = express();

const expressArtTemplate = require('express-art-template');
// 配置模板引擎 ,参数1也是后缀名
app.engine('art',expressArtTemplate);


app.set('view options', {
    //  debug 表示是否压缩文件,是否使用缓存
    //（开发环境或者是生产环境）
    debug: process.env.NODE_ENV !== 'production'
});

//处理静态资源
app.use(express.static('./public'));  //设置文件目录

app.use(upload.single('file')); //或者upload.any()

// app.get('/form_index.html',function(req,res){
//     res.sendFile(__dirname+"/"+form_index.html); //提供静态文件
// })
app.use(bodyParser.json());
// 只支持 application/x-www-form-urlencoded 文件结构
app.use(bodyParser.urlencoded({ extended: false })); //返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。

app.use(cookieParser());//开启cookie
app.use(session({//开启session(在定义路由前写)
    secret : 'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
    },
}));




// app.all('/user/login',function (req, res, next) {
//   //res.header('Access-Control-Allow-Origin', 'http://localhost:8070'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
//   res.header('Access-Control-Allow-Credentials', true); // 允许服务器端发送Cookie数据
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); //这样写，只有8080可以访问。
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');//设置方法
//   //if (req.method == 'OPTIONS') {
//   //  res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
//   //}
//   //else {
//     next();
//   //}
// });


//登录拦截器，必须放在静态资源声明之后、路由导航之前
// app.use(function (req, res, next) {
//     var url = req.originalUrl;
//     if (url != "/user/login" && !req.session.cookie.user) {
//         return res.redirect("/user/login");
//     }
//     next();
// });
app.use(cookieParser('hello!'));

app.use(session({
    name: 'hello', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    secret: '8awe34nced9dsvnsd9sdsd', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: { maxAge: 30*60*1000 , HttpOnly: false },  //HttpOnly是为了防止XSS攻击
    resave: true,  // 强制更新 session
    saveUninitialized: false
    //这里需要存在redis里才会生效
}));

//配置跨域（要放到路由注册之前）
const host1 = require('./globe-config').host1;
const host2 = require('./globe-config').host2;
var allowCrossDomain = function (req, res, next) {
    //console.log(req.headers.origin) //可能会是localhost或者具体的ip
    //console.log(host2+':8088')
    if(req.headers.origin == (host1+':1818') || req.headers.origin == (host1+':8080') || req.headers.origin == (host1+':8088') ||
        req.headers.origin == (host2+':1818') || req.headers.origin == (host2+':8080') || req.headers.origin == (host2+':8088')){
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    // res.header('Access-Control-Allow-Origin', 'http://localhost:1818');//自定义中间件，设置跨域需要的响应头。 //博客
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8080');//自定义中间件，设置跨域需要的响应头。//后台管理
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8088');//自定义中间件，设置跨域需要的响应头。//豆瓣app
    res.header('Access-Control-Allow-Credentials', true); // 允许服务器端发送Cookie数据
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); //这样写，只有8080可以访问。
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');//设置方法
    next();
};
app.use(allowCrossDomain);

// 加入到中间件中
app.use(routerConfig);
//app.use(routerConfig.allowedMethods());



// 开启监听
app.listen(8888,()=>{
  console.log('服务器启动了');
});


//cookie(容量有限，不安全)
// const cookieParser = require('cookie-parser');
// server.use(cookieParser('hello!')); //签名

// server.get('/login', (req,res) => {

//     res.cookie('user', 'dudu', {
           // maxAge: 30*60*1000,

//         secure: true, ////只用于https
//         signed: true  //用req.signedCookies获取，纺织客户端篡改
//     });

//     res.end();
// });


//session（基于cookie，session_id放在cookie里，需设置防篡改）
// const cookieSession = require('cookie-session');
// server.use(cookieSession({
//     secret: 'fhdsupfhsaf23'
// }));
// server.get('/login', (req,res) => {

//     req.session['user'] = 'dudu';  //浏览器关闭消失
//     res.send(`haaaaa${req.session}`);
// });

//两者结合(在cookie里放置sessionId)
// const cookieParser = require('cookie-parser');
// server.use(cookieParser('hello!'));
// const session = require('express-session');
// server.use(session({
//     name: '12qwea', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
//     secret: '8awe34nced9dsvnsd9sdsd',
//     cookie: { maxAge: 30*60*1000 , HttpOnly: true },  //HttpOnly是为了防止XSS攻击
//     resave: true,
//     saveUninitialized: false
// }));


// server.get('/login', (req,res) => {
//  //每一次访问时，session对象的user会自动的保存或更新内存中的session中去。
//     req.session['user'] = 'dudu';
//     res.send(`haaaaa${req.session.cookie.maxAge}`);
// });