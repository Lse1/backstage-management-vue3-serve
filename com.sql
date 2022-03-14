/*
 Navicat MySQL Data Transfer

 Source Server         : com
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : com

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 14/03/2022 16:26:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for 价格
-- ----------------------------
DROP TABLE IF EXISTS `价格`;
CREATE TABLE `价格`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `商品` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `价值` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of 价格
-- ----------------------------
INSERT INTO `价格` VALUES (1, '小米', '2999');
INSERT INTO `价格` VALUES (2, '苹果', '5999');
INSERT INTO `价格` VALUES (3, 'vivo', '1500');
INSERT INTO `价格` VALUES (4, 'oppo', '1999');
INSERT INTO `价格` VALUES (5, '魅族', '2200');
INSERT INTO `价格` VALUES (8, '萨达', 'sad');
INSERT INTO `价格` VALUES (14, '请问前往', 'wqqq');

-- ----------------------------
-- Table structure for 新建表
-- ----------------------------
DROP TABLE IF EXISTS `新建表`;
CREATE TABLE `新建表`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `列1` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `列2` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `列3` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of 新建表
-- ----------------------------
INSERT INTO `新建表` VALUES (1, '123', '312das', '231asd');
INSERT INTO `新建表` VALUES (2, '123', '312ad', '231ad');
INSERT INTO `新建表` VALUES (3, 'ZX', 'zX', 'xz');
INSERT INTO `新建表` VALUES (5, '78', 'jjkl', 'hhj');
INSERT INTO `新建表` VALUES (6, '阿萨', '撒旦', '是的');

-- ----------------------------
-- Table structure for 用户
-- ----------------------------
DROP TABLE IF EXISTS `用户`;
CREATE TABLE `用户`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `星期` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `新用户` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `活跃用户` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of 用户
-- ----------------------------
INSERT INTO `用户` VALUES (1, '周一', '5', '200');
INSERT INTO `用户` VALUES (2, '周二', '10', '500');
INSERT INTO `用户` VALUES (3, '周三', '12', '550');
INSERT INTO `用户` VALUES (4, '周四', '60', '800');
INSERT INTO `用户` VALUES (5, '周五', '65', '550');
INSERT INTO `用户` VALUES (6, '周六', '53', '770');
INSERT INTO `用户` VALUES (7, '周日', '33', '170');

-- ----------------------------
-- Table structure for 购买量
-- ----------------------------
DROP TABLE IF EXISTS `购买量`;
CREATE TABLE `购买量`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `商品` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `今日购买` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `本月购买` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `总购买` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of 购买量
-- ----------------------------
INSERT INTO `购买量` VALUES (1, 'oppo', '500', '3500', '22000');
INSERT INTO `购买量` VALUES (2, 'vivo', '300', '2200', '24000');
INSERT INTO `购买量` VALUES (3, '苹果', '800', '4500', '65000');
INSERT INTO `购买量` VALUES (4, '小米', '1200', '6500', '45000');
INSERT INTO `购买量` VALUES (5, '三星', '300', '2000', '34000');
INSERT INTO `购买量` VALUES (6, '魅族', '350', '3000', '22000');
INSERT INTO `购买量` VALUES (7, '萨达', '阿萨德', '萨达', '奥德赛');
INSERT INTO `购买量` VALUES (8, '萨达', '奥德赛', '萨达', '撒旦');

-- ----------------------------
-- Table structure for 销售
-- ----------------------------
DROP TABLE IF EXISTS `销售`;
CREATE TABLE `销售`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `苹果` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `vivo` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `oppo` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `魅族` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `三星` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `小米` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `时间` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 61 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic STATS_PERSISTENT = 1;

-- ----------------------------
-- Records of 销售
-- ----------------------------
INSERT INTO `销售` VALUES (1, '5086', '3175', '7294', '282', '6846', '306', '20191001');
INSERT INTO `销售` VALUES (2, '2433', '1186', '367', '3370', '2846', '2653', '20191002');
INSERT INTO `销售` VALUES (3, '6015', '2758', '481', '5178', '5017', '2241', '20191003');
INSERT INTO `销售` VALUES (5, '4981', '2453', '6299', '2498', '6389', '6653', '20191005');
INSERT INTO `销售` VALUES (7, '4141', '808', '2808', '6850', '1019', '1382', '20191007');
INSERT INTO `销售` VALUES (19, '23132', '21332', '1221', '23132', '12', '3232', '231');
INSERT INTO `销售` VALUES (20, '23132', '21332', '1221', '23132', '12', '3232', '231');
INSERT INTO `销售` VALUES (21, '成功', '充电桩', '注册', '操作在', 'zc', 'zxcx', 'xz');
INSERT INTO `销售` VALUES (22, '成功', '充电桩', '注册', '操作在', 'zc', 'zxcx', 'xz');
INSERT INTO `销售` VALUES (23, '成功', '充电桩', '注册', '操作在', 'zc', 'zxcx', 'xz');
INSERT INTO `销售` VALUES (27, '21w', '213', '213', '213', 'qwe', 'wa', 'da');
INSERT INTO `销售` VALUES (28, 'as', 'as', 'as', 'as', 'sa', 'sa', 'ss');
INSERT INTO `销售` VALUES (29, 'qw1122', 'wq', 'wq', 'wq', 'wq', 'qw', 'wq');
INSERT INTO `销售` VALUES (36, 'qw', 'qw', 'qw', 'qw', 'wq', 'wq', 'qw');
INSERT INTO `销售` VALUES (37, 'qw', 'qw', 'qw', 'qw', 'wq', 'wq', 'qw');

SET FOREIGN_KEY_CHECKS = 1;
