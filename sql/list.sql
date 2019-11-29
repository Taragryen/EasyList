#删除数据库list，如果存在的话
DROP DATABASE IF EXISTS list;

#创建数据库xz，存储数据使用utf-8字符集
CREATE DATABASE list CHARSET=UTF8;

#进入数据库xz
USE list;

#创建用户表list_user
CREATE TABLE `list_user`  (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户的ID，由系统自动生成，为用户的第一标识',
  `email` varchar(64) NULL COMMENT '用户的email，为用户的第二标识',
  `upwd` varchar(32) NULL COMMENT '用户的密码',
  PRIMARY KEY (`uid`)
);

#创建清单表list_pages
CREATE TABLE `list_pages`  (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `time` int(11) NULL,
  `title` varchar(32) NULL,
  `detail` varchar(128) NULL,
  `email` varchar(64) NULL,
  PRIMARY KEY (`pid`)
);