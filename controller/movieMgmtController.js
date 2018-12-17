//const dbUtils = require('../model/db-config');
const url = require('url');
const request = require("request"); //引入request来解析https协议
//const dateFormatter = require('../utils/dateFormatter');
const unicode2Ascii = require('../utils/unicode2Ascii');
// const base = 'https://api.douban.com/v2/movie/';
const base = require("../globe-config").movieUrl;
const base2 = require("../globe-config").movieUrl2;  //第一个地址查不到，就是试试第二个


//class有top250、热映、即将上映等
exports.queryMovieByClass = async (req, res) => {
    
    var clazz = req.query.class;
   	
   	var url = base + "/" + clazz;

	//console.log(url)
    //var userpost = await dbUtils.queryData(sql,[]);
    //可以用promise封装一下
	request(url, (error, response, data) => {
		//console.log(data)
		if(error){
			return res.json({
				//这里可以只返回title，当点击title时，在加载具体的文章
				'resCode':'02',
				'resData': "获取错误："+ error
			});
		} else if (data.length <= 0){
			return res.json({
				//这里可以只返回title，当点击title时，在加载具体的文章
				'resCode':'03',
				'resData': "没有更多数据了"
			});
		} else {
			return res.json({
				//这里可以只返回title，当点击title时，在加载具体的文章
				'resCode':'01',
				'resData': data
			});
		}
		
	    
	});

	
}

exports.queryMovieById = async (req, res) => {
    
    //console.log(url.parse(req.url))
    let id = req.query.id;	

    var url = base + "/subject/" + id;
    //console.log(sql)
    //var userpost = await dbUtils.queryData(sql,[]);
    //可以用promise封装一下
	request(url, (error, response, data) => {
		if(error){
			return res.json({
				//这里可以只返回title，当点击title时，在加载具体的文章
				'resCode':'02',
				'resData': "获取错误："+ error
			});
		} else if (data.length <= 0){
			return res.json({
				//这里可以只返回title，当点击title时，在加载具体的文章
				'resCode':'03',
				'resData': "没有数据"
			});
		} else {
			
			return res.json({
				//这里可以只返回title，当点击title时，在加载具体的文章
				'resCode':'01',
				'resData': data
			});
		}
		
	    
	});
	
}



exports.queryMovieBySearchKey = async (req, res) => {
    
    let q = (req.query.q);
    let page = (req.query.page);

    //搜索关键字若是中文，需转换为16进制ascii
    //console.log(typeof unicode2Ascii)
    q = unicode2Ascii.unicode2Ascii(q);

    var url = base + `/search?q=${q}&count=10&start=0`;
    var url2 = base2 + `/search?q=${q}&count=10&start=${page*10}`;
	//console.log(url2)
	request(url2, (error, response, data) => {
		if(error){
			return res.json({
				//这里可以只返回title，当点击title时，在加载具体的文章
				'resCode':'02',
				'resData': "查询错误："+ error
			});
		} else if (data.length <= 0){
			return res.json({
				//这里可以只返回title，当点击title时，在加载具体的文章
				'resCode':'03',
				'resData': "未能找到搜索数据"
			});
		} else { 
			// console.log(url)
			// console.log(data)
			return res.json({
				//这里可以只返回title，当点击title时，在加载具体的文章
				'resCode':'01',
				'resData': data
			});
		}
		
	    
	});
	
}

