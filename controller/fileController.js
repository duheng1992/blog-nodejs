var fs = require('fs');
var url = require('url');
const dbUtils = require('../model/db-config');
const dateFormatter = require('../utils/dateFormatter')

exports.uploadAvatar = async (req, res) => {
    //console.log(req.body)
    //console.log(req.file)
    var path = url.parse(req.url).path;
    var file = req.file;
	//1.解析url，提取userId
    var userId = path.slice(path.length-32,path.length);
    //2.存入图片(路径为public/images/avator/userId/userName.jpg)
     if (file) {
        var fileNameArr = file.originalname.split('.');
        var suffix = fileNameArr[fileNameArr.length - 1];
        //文件重命名
        fs.renameSync('uploads/' + file.filename, `./uploads/${file.filename}.${suffix}`);
        file['newfilename'] = `${file.filename}.${suffix}`;

         // 创建读取流
        readable = fs.createReadStream( 'uploads/' + `${file.filename}.${suffix}` );
        //console.log(readable)
        // 创建写入流
        fs.exists('public/images/avator/'+ userId + '/',function(exists){
		  if(exists){
		    console.log("目录存在")
		  }
		  if(!exists){
		    fs.mkdirSync('public/images/avator/'+ userId + '/');
		  }
		})
        
        writable = fs.createWriteStream( 'public/images/avator/'+ userId + "/" + `${file.filename}.${suffix}`); 
        // 通过管道来传输流
        readable.pipe( writable );

    }


    //3.数据库设置路径
    var sql = 'update t_sys_user set update_date="'+dateFormatter.dateFormatter(new Date(),'yyyy-MM-dd')+'", src_img = "' + `${file.filename}.${suffix}` 
    		+ '" where user_id = "' + userId + '" ';
	userForUpdate = await dbUtils.queryData(sql,[]);
	console.log(userForUpdate)
    //可以使用res.send({...})
	return res.json(
		{
			//这里可以只返回title，当点击title时，在加载具体的文章
			'resCode':'01',
			//'resData': JSON.stringify(menus)
		}
	);
}


// exports.getAvatar = async (req, res) => {
//     //通过userId可生成服务器图像地址：public/images/avator/userId/imgsrc
//    // console.log(req.body)
//     //   { userId: '0d69de60c0d111e8a7387160b1126090',
//   // userName: '杜衡',
//   // srcImg: 'duheng.jpg',
//   // userClass: '001',
//   // blogItemname: '超级管理员' }
//   //console.log(__dirname)  //Users/duheng/Desktop/nuxt-blog/nodejs/controller
//     //var avatarBase = __dirname + "/../public/images/avator/" + req.body.userId + '/' + req.body.srcImg;
//     //console.log(avatarBase)
//       var options = {
// 	    root: __dirname + '/../public/images/avator/' + req.body.userId + '/', //+ req.body.srcImg,
// 	    //dotfiles: 'deny',
// 	    headers: {
// 	        'x-timestamp': Date.now(),
// 	        'x-sent': true
// 	    }
// 	  };

// 	  var fileName = req.body.srcImg;
// 	  res.sendFile(fileName, options, function (err) {
// 	    if (err) {
// 	      //next(err);
// 	    } else {
// 	      console.log('Sent:', fileName);
// 	    }
// 	  });

  
// }

//上传博客图片
exports.uploadBlogImage = async(req, res) => {
    var file = req.file;
    //console.log(req.file)
    //console.log(res.file)
    //将文件存入路径 static/blogImg
    if (file) {
         var fileNameArr = file.originalname.split('.');
         var suffix = fileNameArr[fileNameArr.length - 1];
        // //文件重命名
        // fs.renameSync('uploads/' + file.filename, `./uploads/${file.filename}.${suffix}`);
        // file['newfilename'] = `${file.filename}.${suffix}`;

         // 创建读取流
        readable = fs.createReadStream( 'uploads/' + `${file.filename}` );
        //console.log(readable)
        //判断目录
        fs.exists('public/blogImg',function(exists){
          if(exists){
            //console.log("目录存在");
          }
          if(!exists){
            fs.mkdirSync('public/blogImg');
          }
        })
        // 创建写入流
        writable = fs.createWriteStream( `public/blogImg/${file.filename}.${suffix}`); 
        // 通过管道来传输流
        readable.pipe( writable );

        return res.json({
            //这里可以只返回title，当点击title时，在加载具体的文章
            'resCode':'01',
            'resData': `blogImg/${file.filename}.${suffix}`
        });

    }
}

// 运行python脚本 （或者使用cluster模块）
exports.runPy = async (req, res) => {
    var exec = require('child_process').exec;
    //var arg1 = 'hello'
    //var arg2 = 'jzhou'
    exec(`python 'uploads/${req.file.filename}'`+ arg1+' '+arg2+' ',function(error,stdout,stderr){
        if(stdout.length >1){
            console.log('you offer args:',stdout);
        } else {
            console.log('you don\'t offer args');
        }
        if(error) {
            console.info('stderr : '+stderr);
        }
    });
}
