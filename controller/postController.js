const dbUtils = require('../model/db-config');
const UUID = require('uuid');
const dateFormatter = require('../utils/dateFormatter');

exports.queryMyAllPost = async (req, res) => {
    var classify = req.query.classify;
    var limit = req.query.limit;
    var page = req.query.page;
	var pagesize = req.query.pagesize;
	var name = req.query.name;
	var count = null;
    //console.log(req.params)
    //console.log(req.query)
    var sql = 'select t.*, u.user_name, u.nick_name from T_BLOG t left join t_sys_user u on t.user_id = u.user_id where 1=1 '; //where user_id = "' + userId + '"';

    if(classify){
    	sql += ' and t.classify = "'+ classify +'" ';
    }

    if(name){
		sql += ' and (t.title like "%' + name + '%" or t.description like "%' + name + '%" ';
		sql += '  or u.user_name like "%' + name + '%" or u.nick_name like "%' + name + '%") ';
	}

    sql += ' order by t.create_time desc ';
    if(page){
    	var countSql = 'select count(*) count from (' + sql + ') n ';
		count = await dbUtils.queryData(countSql,[]);
		sql += ' limit ' + (page-1)*pagesize + ',' + pagesize;
    }

    if(limit){
    	sql += ' limit 0,'+ (parseInt(limit) || 10) +' ';
    }


	//console.log(sql)
    var userpost = await dbUtils.queryData(sql,[]);

	//console.log(users[0])
	if(userpost.length === 0){
		//console.log(users)
		return res.json({'resCode':'02', 'resData': 'userpost not found'});
	}
	//console.log(userpost)
	//return res.json(users);
	//res.end(JSON.stringify(users));
	// response.writeHead(200, {"Content-Type": "text/plain"});
 //    response.end("Hello world!");
 	if(count){
 		//console.log(count[0].count)
 		userpost[0].total = count[0].count;
 	}
	return res.json(
		{
			//这里可以只返回title，当点击title时，在加载具体的文章
			'resCode':'01',
			'resData': JSON.stringify(userpost)
		}
	);
}

 
exports.queryPostById = async (req, res) => {
	var blogId = req.params.blog_id;
    var sql = 'select * from T_BLOG where blog_id = "' + blogId + '"';
    var userpost = await dbUtils.queryData(sql,[]);
	//console.log(users[0])
	if(userpost.length === 0){
		//res.writeHead(404,{"Content-Type":"text/html"});
		return res.json({'resCode':'02', 'resData': 'post not found'});
	} else {
		//res.writeHead(200,{"Content-Type":"application/json"});
		return res.json(
			{
				//这里可以只返回title，当点击title时，在加载具体的文章
				'resCode':'01',
				'resData': JSON.stringify(userpost)
			}
		);
	}

	//return res.json(users);
	//res.end(JSON.stringify(users));	
}


exports.addOrUpdatePost = async(req, res) => {
	//console.log(req.body)
  var userId = req.body.userId;
  var userName = req.body.userName;
  var content = req.body.content;
  var blogSumary = req.body.blogSumary;
  var classify = req.body.classify;
  var description = req.body.description;
  var title = req.body.title;
  var blogId = req.body.blogId;

  var newpost = [];
  var sql = '';

  if(blogId){
  	//此时是更新
  	sql = ' update T_BLOG set ';
  	if(content){
		sql += ' content = "' + content + '" ,';  //oracle用and链接
	}
	if(blogSumary){
		sql += ' blog_sumary = "' + blogSumary + '" ,';
	}
	if(classify){
		sql += ' classify = "' + classify + '" ,';
	}
	if(description){
		sql += ' description = "' + description + '" ,';
	}
	if(title){
		sql += ' title = "' + title + '" ,';
	}
	sql += ' update_date = "' + dateFormatter.dateFormatter(new Date(),'yyyy-MM-dd') + '" ';
	//sql = sql.substring(0, sql.length - 1);
	
	sql += ' where blog_id = "' + blogId + '" ';
	newpost = await dbUtils.queryData(sql,[]);
  } else {
  	//此时是新增
  	var ID = UUID.v1().replace(/\-/g,"");

	sql = " insert into T_BLOG (blog_id,title,blog_sumary,classify,user_id,content,create_time,hits,description) values (?,?,?,?,?,?,?,?,?) ";
	newpost = await dbUtils.queryData(sql,[ID,title,blogSumary,classify,userId,content,dateFormatter.dateFormatter(new Date(),'yyyy-MM-dd'),0,description]);

  }
  
  if(newpost.length === 0){
		//console.log(users)
		return res.json({'resCode':'03', 'resData': '文章更新失败'});
  }

  return res.json({'resCode':'01', 'resData': JSON.stringify(newpost)});
}



exports.delPost = async(req, res) => {
	//console.log(req.body)
  var blogId = req.query.blogId;

  var sql = " delete from T_BLOG where blog_id = ? ";
  var resp = await dbUtils.queryData(sql,[blogId]);

  if(resp.length === 0){
		//console.log(users)
		return res.json({'resCode':'03', 'resData': '文章删除失败'});
  }

  return res.json({'resCode':'01', 'resData': JSON.stringify(resp)});
}


exports.getHits = async(req, res) => {

  var sql = " select hits, title from T_BLOG order by hits desc limit 0,5";
  var resp = await dbUtils.queryData(sql,[]);

  if(resp.length === 0){
		//console.log(users)
		return res.json({'resCode':'03', 'resData': '文章查找失败'});
  }

  return res.json({'resCode':'01', 'resData': JSON.stringify(resp)});
}
