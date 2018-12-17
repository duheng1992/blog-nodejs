## node + mysql 后端 采用express 仓库内其他项目会用到该服务

对数据库获取进行封装，避免express的回调地狱：
```
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
```

在调用时只需：
```
 var res = await dbUtils.queryData(sql,[参数]);
```
