const dbUtils = require('../model/db-config');
const UUID = require('uuid');
const dateFormatter = require('../utils/dateFormatter')
   
//校验用户是否存在
exports.checkUser = async (req,res) => {
	//接受参数
    //req.body用于接收post请求,post请求将数据放在request正文中，因此req.body.keyname可以得到其请求数据。
    //req.params的参数包含在路径当中，例如请求路径为http://localhost:3000/test/myparam，服务端定义其中的参数为
	//console.log(req.body)
	var username = req.body.user_name;
	//console.log(username)
	//console.log("------userController-----------")
	var sql = 'select user_id, user_name from t_sys_user where user_name = ?';
	var users = await dbUtils.queryData(sql,[username]);
	//console.log(users[0])
	if(users.length === 0){
		//console.log(users)
		return res.json({'resCode':'02', 'resData': 'user not found'});
	}

	//return res.json(users);
	//res.end(JSON.stringify(users));
	//res.writeHead(200,{"Content-Type":"text/html"});
	return res.json(
		{
			'resCode':'01',
			'resData': JSON.stringify(users)
		}
	);
}



//登录
exports.login = async (req,res) => {

	//接受参数
	console.log(req.body)

	var username = req.body.username || req.body.params.username;
	var password = req.body.password || req.body.params.password;

	req.session['user'] = username;
	//1.也可以设置token来判断登陆
	//npm install jsonwebtoken
	// let secretOrPrivateKey="suiyi" // 这是加密的key（密钥） 
 //    let token = jwt.sign({username,password}, secretOrPrivateKey, {
 //        expiresIn: 60*60*1  // 1小时过期
 //    });
 //    //2.将这个token传到前端
 //    //前端：localStorage.setItem('token', response.data.token);

 //    //3.后端再次接受时判断
 //    let token = req.body.token; // 从body中获取token
 //    let secretOrPrivateKey="suiyi"; // 这是加密的key（密钥） 

 //    jwt.verify(token, secretOrPrivateKey, function (err, decode) {
 //        if (err) {  //  时间失效的时候/ 伪造的token          
 //            res.send({'status':0});  //错误          
 //        } else {
 //            //成功
 //        }
 //    })
	//console.log(username)


//     res.send(`haaaaa${req.session.cookie.maxAge}`);
	//console.log("------userController-----------")	
	var sql = 'select t.user_id, t.nick_name user_name, t.src_img, t.user_class, c.blog_itemname  ' +
		' from t_sys_user t ' +
		' left join  m_sys_catrgory c on c.user_id = t.user_id and c.is_on = "1" ' +
		' where user_name = ? and user_password = ?';
	var users = await dbUtils.queryData(sql,[username, password]);


	if(users.length === 0){
		//console.log(users)
		return res.json({'resCode':'02', 'resData': 'user not found'});
	}

	//return res.json(users);
	//res.end(JSON.stringify(users));
	//console.log(users)
	return res.json({'resCode':'01', 'resData': users});
}

//注册
exports.regist = async (req,res) => {
	//接受参数
	//console.log(req.body)
	// name: '',
	// nickName:'',
	// sex: 1,
	// zone: '',
	// phone:'',
	// email:''
	var username = req.body.name;
	var password = '123456'; // 初始
	var email = req.body.email;
	var phone = req.body.phone;
	var zone = req.body.zone;
	var nickName = req.body.nickName;
	var sex = req.body.sex;
	var userclass = req.body.userClass;

	// console.log(username)
	// console.log(email)
	// console.log(phone)
	// console.log(zone)
	// console.log(nickName)
	// console.log(sex)
	// console.log(userclass)

	//console.log("------userController-----------")
	var sql = 'select user_id, user_name from t_sys_user where user_name = ?';
	var users = await dbUtils.queryData(sql,[username]);
	//console.log(users[0])
	if(users.length != 0){
		//console.log(users)
		return res.json({'resCode':'02', 'resData': '用户名已存在！'});
	}

	users = [];
	var ID = UUID.v1().replace(/\-/g,"");
	//console.log(ID)
	if(username && password){
		//console.log(username)
		if(username.length > 16 || username.length < 3){
			return res.json({'resCode':'03', 'resData': '用户名必须介于3-16位之间'});
			//console.log("------userController-----------")
		}
		if(password.length > 16 || password.length < 3){
			return res.json({'resCode':'03', 'resData': '密码必须介于3-16位之间'});
			//console.log("------userController-----------")
		}
		var sql = 'insert into t_sys_user (user_id,'+
			' user_name, nick_name, user_password, email, phone, zone, user_class, sex, create_date, update_date)'+
			' values("'+ID+'",?,?,?,?,?,?,?,?,"' + dateFormatter.dateFormatter(new Date(),'yyyy-MM-dd') + '", "'+ dateFormatter.dateFormatter(new Date(),'yyyy-MM-dd') +'")';
		users = await dbUtils.queryData(sql,[username,nickName,password,email,phone,zone,userclass,sex]);
	}


	if(users.length === 0){
		//console.log(users)
		return res.json({'resCode':'03', 'resData': '用户插入失败'});
	}

	//return res.json(users);
	//res.end(JSON.stringify(users));
	return res.json({'resCode':'01', 'resData': JSON.stringify(users)});
}

//用户信息查询byId（用于本用户查询本用户的信息）
module.exports.queryUser = async (req,res) => {
	//需要传入用户ID
	var userId = req.body.user_id;
	var users = [];
	if(userId){
		var sql = 'select * from t_sys_user where user_id = ?';
		users = await dbUtils.queryData(sql,[userId]);
	}

	if(users && users.length > 0){
		return res.json({'resCode':'01', 'resData': JSON.stringify(users)});
	} else {
		return res.json({'resCode':'02', 'resData': 'user not found'});
	}
}

//用户删除byId
module.exports.removeUser = async (req,res) => {
	//需要传入用户ID
	var userId = req.query.id;
	//console.log(userId)
	var users = [];
	if(userId){
		var sql = 'delete from t_sys_user where user_id = ?';
		users = await dbUtils.queryData(sql,[userId]);
	}

	if(users.affectedRows && users.affectedRows > 0){
		return res.json({'resCode':'01', 'resData': '删除成功！'});
	} else {
		return res.json({'resCode':'02', 'resData': 'user not found'});
	}
}


//用户信息修改
module.exports.modifyUser = async (req,res) => {
	//需要传入用户ID
	//console.log(req)
	var userId = req.body.user_id;
	var username = req.body.user_name;
	var nickNime = req.body.nick_name;
	var email = req.body.email;
	var phone = req.body.phone;
	var zone = req.body.zone;
	var sex = req.body.sex;
	var src_img = req.body.rc_img;
	var userclass = req.body.user_class;
	var users = [];
	var sql = 'update t_sys_user set ';
	if(userId){
		if(username){
			sql += ' user_name = "' + username + '" ,';  //oracle用and链接
		}
		if(nickNime){
			sql += ' nick_name = "' + nickNime + '" ,';
		}
		if(email){
			sql += ' email = "' + email + '" ,';
		}
		if(phone){
			sql += ' phone = "' + phone + '" ,';
		}
		if(zone){
			sql += ' zone = "' + zone + '" ,';
		}
		if(userclass){
			sql += ' user_class = "' + userclass + '" ,';
		}
		if(sex){
			sql += ' sex = "' + sex + '" ,';
		}
		if(src_img){
			sql += ' src_img = "' + src_img + '" ,';
		}
		sql += ' update_date = "' + dateFormatter.dateFormatter(new Date(),'yyyy-MM-dd') + '" ';
		//sql = sql.substring(0, sql.length - 1);
		
		sql += ' where user_id = "' + userId + '" ';
		//console.log(sql)

		users = await dbUtils.queryData(sql,[]);
	}
	//console.log(users.affectedRows)
	if(users.affectedRows && users.affectedRows > 0){
		return res.json({'resCode':'01', 'resData': '用户更新成功！'});
	} else {
		return res.json({'resCode':'02', 'resData': 'user not found'});
	}
}


//普通会员列表查询
module.exports.queryUserList = async (req,res) => {
	//需要查询的用户昵称
	//console.log(req)
	var nameForSearch = req.query.name;
	var page = req.query.page;
	var pagesize = req.query.pagesize;
	//console.log(nameForSearch)
	var sql = 'select t.* from t_sys_user t ';
	sql += ' inner join m_sys_catrgory c on c.blog_itemcode = t.user_class where 1=1 ';
	var users = [];
	if(nameForSearch){
		sql += ' and t.nick_name like "%' + nameForSearch + '%"';
	}

	sql += ' and c.blog_itemcode != "001" ';
	var countSql = 'select count(*) count from (' + sql + ') n ';
	
	sql += ' limit ' + (page-1)*pagesize + ',' + pagesize;

	users = await dbUtils.queryData(sql,[]);
	count = await dbUtils.queryData(countSql,[]);
	//console.log(count)
	sql += ' ';


	
	if(users && users.length > 0){
		users[0].total = count[0].count;
		return res.json({'resCode':'01', 'resData': JSON.stringify(users)});
	} else {
		return res.json({'resCode':'02', 'resData': JSON.stringify({})});
	}
}

//管理员列表查询
module.exports.queryAdminUserList = async (req,res) => {
	var nameForSearch = req.query.name;
	var page = req.query.page;
	var pagesize = req.query.pagesize;
	//console.log(nameForSearch)
	var sql = 'select t.* from t_sys_user t ';
	sql += ' inner join m_sys_catrgory c on c.blog_itemcode = t.user_class where 1=1 ';
	var users = [];
	if(nameForSearch){
		sql += ' and t.nick_name like "%' + nameForSearch + '%"';
	}

	sql += ' and c.blog_itemcode = "001" ';
	var countSql = 'select count(*) count from (' + sql + ') n ';
	
	sql += ' limit ' + (page-1)*pagesize + ',' + pagesize;

	users = await dbUtils.queryData(sql,[]);
	count = await dbUtils.queryData(countSql,[]);
	//console.log(count)
	sql += ' ';
	
	if(users && users.length > 0){
		users[0].total = count[0].count;
		return res.json({'resCode':'01', 'resData': JSON.stringify(users)});
	} else {
		return res.json({'resCode':'02', 'resData': JSON.stringify({})});
	}
}
