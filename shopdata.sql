/*
 Navicat MySQL Data Transfer

 Source Server         : com
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : shopdata

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 14/03/2022 16:26:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for shopdata
-- ----------------------------
DROP TABLE IF EXISTS `shopdata`;
CREATE TABLE `shopdata`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `编号` int(0) NULL DEFAULT NULL,
  `商品图片` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `商品名称` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `价格` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `库存` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `销量` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  UNIQUE INDEX `bianhao`(`编号`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shopdata
-- ----------------------------
INSERT INTO `shopdata` VALUES (1, 1, '64ea14bdb4d807ae71900f172dbd79de.png', '用户图', '6', '1', '1');
INSERT INTO `shopdata` VALUES (3, 2, '349e8900db6e027af03b27d221436570.png', '黄色纹路', '2', '2', '2');
INSERT INTO `shopdata` VALUES (9, 5, '262e3a997d6edcffaaf77009b0c4974c.png', '红色爱心', '6', '32', '32');

SET FOREIGN_KEY_CHECKS = 1;
