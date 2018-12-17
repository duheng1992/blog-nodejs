const dbUtils = require('../model/db-config');
const UUID = require('uuid');
const dateFormatter = require('../utils/dateFormatter')

exports.queryMenuList = async (req, res) => {
	//console.log(req.session.cookie)
    var sql = 'select menu_id, menu_name, parent_menu_id, icon, isLeaf, menu_url from T_MGMT_MENU';
    var menus = await dbUtils.queryData(sql,[]);
	//console.log(users[0])
	if(menus.length === 0){
		//console.log(users)
		return res.json({'resCode':'02', 'resData': 'items not found'});
	}
	//console.log(JSON.stringify(menus))
	return res.json(
		{
			//这里可以只返回title，当点击title时，在加载具体的文章
			'resCode':'01',
			'resData': JSON.stringify(menus)
		}
	);
}
