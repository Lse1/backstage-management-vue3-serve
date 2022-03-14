/*
 Navicat MySQL Data Transfer

 Source Server         : com
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : mydb

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 14/03/2022 16:26:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for date
-- ----------------------------
DROP TABLE IF EXISTS `date`;
CREATE TABLE `date`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `time` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of date
-- ----------------------------
INSERT INTO `date` VALUES (1, '20191001');
INSERT INTO `date` VALUES (2, '20191002');
INSERT INTO `date` VALUES (3, '20191003');
INSERT INTO `date` VALUES (4, '20191004');
INSERT INTO `date` VALUES (5, '20191005');
INSERT INTO `date` VALUES (6, '20191006');
INSERT INTO `date` VALUES (7, '20191007');

-- ----------------------------
-- Table structure for orderdata
-- ----------------------------
DROP TABLE IF EXISTS `orderdata`;
CREATE TABLE `orderdata`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `苹果` int(0) NULL DEFAULT NULL,
  `vivo` int(0) NULL DEFAULT NULL,
  `oppo` int(0) NULL DEFAULT NULL,
  `魅族` int(0) NULL DEFAULT NULL,
  `三星` int(0) NULL DEFAULT NULL,
  `小米` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orderdata
-- ----------------------------
INSERT INTO `orderdata` VALUES (1, 5086, 3175, 7294, 282, 6846, 306);
INSERT INTO `orderdata` VALUES (2, 2433, 1186, 367, 3370, 2846, 2653);
INSERT INTO `orderdata` VALUES (3, 6015, 2758, 481, 5178, 5017, 2241);
INSERT INTO `orderdata` VALUES (4, 6274, 4448, 1813, 6161, 2917, 7628);
INSERT INTO `orderdata` VALUES (5, 4981, 2453, 6299, 2498, 6389, 6653);
INSERT INTO `orderdata` VALUES (6, 858, 4403, 7760, 1919, 7600, 834);
INSERT INTO `orderdata` VALUES (7, 4141, 808, 2808, 6850, 1019, 1382);

-- ----------------------------
-- Table structure for tabledata
-- ----------------------------
DROP TABLE IF EXISTS `tabledata`;
CREATE TABLE `tabledata`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `monthBuy` int(0) NULL DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `todayBuy` int(0) NULL DEFAULT NULL,
  `totalBuy` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tabledata
-- ----------------------------
INSERT INTO `tabledata` VALUES (1, 3500, 'oppo', 500, 22000);
INSERT INTO `tabledata` VALUES (2, 2200, 'vivo', 300, 24000);
INSERT INTO `tabledata` VALUES (3, 4500, '苹果', 800, 65000);
INSERT INTO `tabledata` VALUES (4, 65000, '小米', 1200, 45000);
INSERT INTO `tabledata` VALUES (5, 2000, '三星', 300, 34000);
INSERT INTO `tabledata` VALUES (6, 3000, '魅族', 350, 22000);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `identity` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `mailbox` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `power` int(0) NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  `lastTime` datetime(0) NULL DEFAULT NULL,
  `thisTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `username`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (5, 'lse', '123456', '超级管理员', '12@qq.com', 3, '2022-01-01 16:39:39', '2022-03-01 00:00:00', '2022-03-08 16:44:50');
INSERT INTO `user` VALUES (6, 'lse1', '123456', '管理员', '123@qq.com', 2, '2022-02-01 16:39:49', '2022-03-02 00:00:00', '2022-03-07 16:44:55');
INSERT INTO `user` VALUES (7, 'lse2', '$2a$10$LucQkdhcsM0WVIKyjblgEepeGXRDohN7IrjFMqn.unP8FpHIMEtba', '管理员', '1221234@qq.com', 2, '2022-03-03 16:39:54', '2022-03-14 16:16:00', '2022-03-14 16:19:17');
INSERT INTO `user` VALUES (11, 'lse5', '$2a$10$tLlGcwR1XZe0QWE0IHH0Ru1aKPbbSEcPeW2.k7sijDV2Uv5EpM5rS', '测试员', '123456@qq.com', 1, '2022-03-08 17:09:00', NULL, NULL);
INSERT INTO `user` VALUES (12, 'asd', '$2a$10$K.z2rRAjF5X1ijyl76f4mujnt3ozN4b9IRZ95VpXIDp.aKeKXVzIi', '管理员', '123456@qq.com', 2, '2022-03-10 15:36:35', NULL, '2022-03-11 15:07:23');
INSERT INTO `user` VALUES (13, 'asds', '$2a$10$u3Uv43TSytpUIb3sx5LSbezuZDlhJY2HlUqTCa1Kv6FC4dminVxWS', '超级管理员', 'asdf', 3, '2022-03-10 15:38:02', '2022-03-14 15:04:28', '2022-03-14 16:16:14');
INSERT INTO `user` VALUES (49, '1212', '$2a$10$L/k9Jx47cKJ6YjeKvANdou4x.TtNnuAIgUgXEC//VCpr7UTxYF/1.', '测试员', '21', 1, '2022-03-11 16:00:16', NULL, NULL);

-- ----------------------------
-- Table structure for userdata
-- ----------------------------
DROP TABLE IF EXISTS `userdata`;
CREATE TABLE `userdata`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `data` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `new` int(0) NULL DEFAULT NULL,
  `active` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userdata
-- ----------------------------
INSERT INTO `userdata` VALUES (1, '周一', 5, 200);
INSERT INTO `userdata` VALUES (2, '周二', 10, 500);
INSERT INTO `userdata` VALUES (3, '周三', 12, 550);
INSERT INTO `userdata` VALUES (4, '周四', 60, 800);
INSERT INTO `userdata` VALUES (5, '周五', 65, 550);
INSERT INTO `userdata` VALUES (6, '周六', 53, 770);
INSERT INTO `userdata` VALUES (7, '周日', 33, 170);

-- ----------------------------
-- Table structure for videodata
-- ----------------------------
DROP TABLE IF EXISTS `videodata`;
CREATE TABLE `videodata`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `value` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of videodata
-- ----------------------------
INSERT INTO `videodata` VALUES (1, '小米', 2999);
INSERT INTO `videodata` VALUES (2, '苹果', 5999);
INSERT INTO `videodata` VALUES (3, 'vivo', 1500);
INSERT INTO `videodata` VALUES (4, 'oppo', 1999);
INSERT INTO `videodata` VALUES (5, '魅族', 2200);
INSERT INTO `videodata` VALUES (6, '三星', 4500);

SET FOREIGN_KEY_CHECKS = 1;
