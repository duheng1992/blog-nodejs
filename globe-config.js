/*
	全局配置参数
*/

let path = require("path")

module.exports = {
	//1.数据库配置
	db : {
		host      : '127.0.0.1',
		port      : '3306',
		user      : 'root',
		password  : 'remember160316',
		database  : 'nuxtBlog'
	},

	//2.文件临时目录
	uploadDir : path.join(__dirname, './public/files'),

	//服务器所在地址
	host1: 'http://localhost',
	//host2 : 'http://192.168.1.88',
	host2: 'http://122.112.216.70',
	movieUrl : "https://douban.uieee.com/v2/movie",
	movieUrl2 : "https://api.douban.com/v2/movie"
}
