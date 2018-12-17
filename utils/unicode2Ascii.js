/**
	只转化中文字符
*/

exports.unicode2Ascii = (data) => {
   if(data == '') return "";

   var ss = data.split("");
   var newss = [];
   for(c of ss){
	  if(isChinese(c)){
	  	newss.push(toAscii(c));
	  }else{
		newss.push(c);
	  }
   }

	
   return newss.join().replace((new RegExp(",","gm")),"");


}


function isChinese(temp) {
   var han=/[^\\u4e00-\\u9fa5]/ig;
   if (!han.test(temp)) return false ;
   return true ;
}

function toAscii(data){
   var str =''; 
   for(var i=0;i<data.length;i++){
      str+="\\u"+parseInt(data[i].charCodeAt(0),10).toString(16);
   }
   return str;
}