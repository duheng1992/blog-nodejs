/*
 Navicat Premium Data Transfer

 Source Server         : hello
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : nuxtBlog

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 10/29/2018 19:55:50 PM
*/

--SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `M_SYS_CATRGORY`
-- ----------------------------
DROP TABLE IF EXISTS `M_SYS_CATRGORY`;
CREATE TABLE `M_SYS_CATRGORY` (
  `blog_category_id` varchar(32) NOT NULL,
  `blog_id` varchar(32) DEFAULT NULL,
  `blog_itemcode` varchar(32) NOT NULL,
  `blog_itemname` varchar(100) NOT NULL,
  `is_on` int(1) NOT NULL,
  `update_date` date NOT NULL,
  `create_date` date NOT NULL,
  `user_id` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`blog_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `M_SYS_CATRGORY`
-- ----------------------------
BEGIN;
INSERT INTO `M_SYS_CATRGORY` VALUES ('011', null, '001', '超级管理员', '1', '2018-10-20', '2018-10-20', '0d69de60c0d111e8a7387160b1126090'), ('023we', null, '002', '博主', '1', '2018-10-24', '2018-10-24', null);
COMMIT;

-- ----------------------------
--  Table structure for `T_BLOG`
-- ----------------------------
DROP TABLE IF EXISTS `T_BLOG`;
CREATE TABLE `T_BLOG` (
  `blog_id` varchar(32) NOT NULL,
  `blog_title` varchar(64) NOT NULL,
  `blog_sumary` varchar(100) NOT NULL,
  `readed_cont` bigint(255) NOT NULL,
  `blog_class` varchar(32) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `blog_content` text NOT NULL,
  `create_date` date NOT NULL,
  `update_date` date NOT NULL,
  PRIMARY KEY (`blog_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `T_BLOG`
-- ----------------------------
BEGIN;
INSERT INTO `T_BLOG` VALUES ('12123', 'jquery', 'jquery简介', '2', '31240', 'a31c5140c0d111e89c066bbe925849bd', '额问题为各位覅覆盖一风格是否堵塞的复苏方式发送给粉丝扶手椅服公司分管算法师傅也是个费用是否故意发给三月份算运费告诉if算法', '2018-09-26', '2018-09-26');
COMMIT;

-- ----------------------------
--  Table structure for `T_MGMT_MENU`
-- ----------------------------
DROP TABLE IF EXISTS `T_MGMT_MENU`;
CREATE TABLE `T_MGMT_MENU` (
  `menu_id` varchar(32) NOT NULL,
  `menu_name` varchar(12) NOT NULL,
  `create_date` date NOT NULL,
  `update_date` date DEFAULT NULL,
  `parent_menu_id` varchar(32) DEFAULT NULL,
  `icon` varchar(32) DEFAULT NULL,
  `isLeaf` int(1) NOT NULL,
  `menu_url` varchar(32) NOT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `T_MGMT_MENU`
-- ----------------------------
BEGIN;
INSERT INTO `T_MGMT_MENU` VALUES ('001', '用户管理', '2018-10-20', '2018-10-20', null, 'el-icon-star-on', '0', '/'), ('002', '博文管理', '2018-10-20', '2018-10-20', null, 'el-icon-document', '1', '/blogMgmt'), ('003', '图表统计', '2018-10-20', '2018-10-20', null, 'el-icon-picture', '1', '/chartMgmt'), ('004', '管理员', '2018-10-22', '2018-10-22', '001', 'el-icon-location', '1', '/adminTable'), ('005', '普通会员', '2018-10-22', '2018-10-22', '001', 'el-icon-location', '1', '/userTable'), ('006', '图片列表', '2018-10-26', '2018-10-26', null, 'el-icon-picture-outline', '0', '/picMgmt'), ('007', '飞机', '2018-10-26', '2018-10-26', '006', 'el-icon-tickets', '1', '/plane');
COMMIT;

-- ----------------------------
--  Table structure for `T_SYS_USER`
-- ----------------------------
DROP TABLE IF EXISTS `T_SYS_USER`;
CREATE TABLE `T_SYS_USER` (
  `user_id` varchar(32) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_password` varchar(32) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(50) NOT NULL,
  `zone` varchar(50) DEFAULT NULL,
  `user_class` varchar(10) NOT NULL,
  `create_date` date NOT NULL,
  `update_date` date NOT NULL,
  `src_img` varchar(1000) DEFAULT NULL,
  `nick_name` varchar(16) NOT NULL,
  `sex` varchar(1) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `T_SYS_USER`
-- ----------------------------
BEGIN;
INSERT INTO `T_SYS_USER` VALUES ('0be8d5d0d84d11e8ab416305cdf469c4', 'zhouchang', '123456', 'zhouc1993@sina.com', '15022016599', '上海', '002', '2018-10-25', '2018-10-25', null, '周畅', '0'), ('0d69de60c0d111e8a7387160b1126090', 'duheng', '123456', '3233@qq.com', '234576645w', 'shanghai', '001', '2018-09-25', '2018-10-28', 'duheng.jpg', '杜衡', '1'), ('1592f1e0d92111e8b4a75d2f662b83f9', 'qwe1223', '123456', '2饿2饿2', '123908', '2342的', '002', '2018-10-26', '2018-10-26', null, '嘿嘿', '1'), ('2530bf60d92111e8b4a75d2f662b83f9', '二道湾r', '123456', '无法水电费', '1321咕~~(╯﹏╰)b', 's\'d\'c\'f\'se\'d \'we', '002', '2018-10-26', '2018-10-26', null, 'wwfsdf', '1'), ('508ad490da7311e8a3de1d8f8d4af6ac', 'aaaa', '123456', '231w1', '21', '2qwew', '001', '2018-10-28', '2018-10-28', null, 'cccc', '1'), ('68eeba10da7311e8a3de1d8f8d4af6ac', 'qqqq', '123456', 'qqq', 'qqq', 'qqq', '001', '2018-10-28', '2018-10-28', null, 'qqqq', '1'), ('74926720d92111e8b4a75d2f662b83f9', '12331aassdd', '123456', '3werfesesf2SDSD', '606-434-323', 'wedefsf', '002', '2018-10-26', '2018-10-26', null, 'qwr_wev@sd', '1'), ('801c3300d92111e8b4a75d2f662b83f9', '12123', '123456', '45678987654', '1209865432', 'fgbnjuytredx', '002', '2018-10-26', '2018-10-26', null, 'wersdfjb', '0'), ('90cd5a60d92311e89f37ed07eaa5a899', '111', '123456', '2142让5', '111', '轻微的所', '001', '2018-10-26', '2018-10-26', null, '超级管理员', '0'), ('a31c5140c0d111e89c066bbe925849bd', 'sdfwefgd', '123456', '3233@qq.com', '234576645w', 'shanghai', '001', '2018-09-25', '2018-10-28', '', '撒大声地', '0'), ('d77b6810d92011e8b4a75d2f662b83f9', '213qewsq', '123456', 'asdawd@qsqw.bom', '123454', 'sedfsf', '002', '2018-10-26', '2018-10-26', null, '嘟嘟', '1'), ('e774c310d92011e8b4a75d2f662b83f9', 'haha', '123456', '4热熔封无法', '123456', '史蒂文无', '002', '2018-10-26', '2018-10-26', null, '呃呃', '0'), ('ecb4bf70d84d11e8ab416305cdf469c4', 'xiaoxiao2', '0', '233而为24Q@163.com', '12131232', '43534', '002', '2018-10-25', '2018-10-26', null, '咕噜咕噜', '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
