const mysql = require("mysql");
const dbConfig = require("../globe-config").db;

let pool = mysql.createPool(dbConfig);

let data = {};

//封装查询语句(异步使用：内部使用promise， 外部使用async+await接受)
data.queryData = (sql, param) => {
	return new Promise( (resolve, reject) => {
		pool.getConnection((err, connection) => {
			connection.query(sql,param,(err, result)=>{
				connection.release();

				if(err){
					return reject(err);
				}

				resolve(result);
			})
		});
	} )
}

module.exports = data;