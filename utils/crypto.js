var crypto = require('crypto');
//加密
exports.encrypt = function encrypt(str, secret) {
   /* var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;*/

    const hash = crypto.createHash('md5');

	// 可任意多次调用update():
	hash.update('Hello, world!');
	//hash.update('Hello, nodejs!');

	console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544
}
//解密
exports.decrypt = function decrypt(str, secret) {
    /*var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;*/
}


