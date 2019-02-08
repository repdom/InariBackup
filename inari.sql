-- MySQL dump 10.16  Distrib 10.1.32-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: inari
-- ------------------------------------------------------
-- Server version	10.1.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accesstoken`
--

DROP TABLE IF EXISTS `accesstoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accesstoken` (
  `id` varchar(255) NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `scopes` text,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesstoken`
--

LOCK TABLES `accesstoken` WRITE;
/*!40000 ALTER TABLE `accesstoken` DISABLE KEYS */;
INSERT INTO `accesstoken` VALUES ('0RBhA0oBIxJ06XuwFYJ6kCTYJweI4W9d5UO1Tdgl3frvVA0FNwpN9sJqaHLiBgxX',1209600,NULL,'2019-02-08 03:48:25',1),('5FtnxHsvw5OiZcIfjEhmcze5lsbPuvNjOh3v2LVUPhS9t3CNrZOFYu50JmGbuMV4',1209600,NULL,'2019-02-08 03:38:21',1),('5V7b4U2WqOqPvQBmM7vGAgYoYO37SzUQ1BmGyJTx6vUEBN08qP4TPCeIJ5OHP77F',1209600,NULL,'2019-02-08 03:50:14',1),('7khMDxpPhNfSFCEmmnerROLcJ5NE0tgFOHE8lU2x09azOsIJNV7Fxuz8cKKgEiPi',1209600,NULL,'2019-02-08 03:38:39',1),('7n1D5eaJoTKIRNbXGfOKTSbXTRoHuBtJfBv0uhx68IbO2R7myzgYB4HjjlBBOGbA',1209600,NULL,'2019-02-08 01:39:53',1),('b7zuDCeOkUF5kovp1pWuaZf5Nhzcc3renyK6ya8NU0Hpp1n1lojvOv4obrk6HsEV',1209600,NULL,'2019-02-08 03:50:15',1),('BGJEufbLutOUEQI0FAlpJ4pAaIkHPR7jDP6R1BYB91BS5zmVDulsjicPfUf2ITX6',1209600,NULL,'2019-02-08 03:34:43',1),('CrkgIQqwt9lcP7jjQg3zB5lungQhpX9lE1udQVszxLnRmvo9x82UgMt2xgEiclnw',1209600,NULL,'2019-02-08 03:16:36',1),('EHC0CGouCod964PiDmIcSXgNnc5QdqlllYwFiB8UTKtAhaUDSwnp0zpWz2XBmCsw',1209600,NULL,'2019-02-08 03:20:08',1),('eQf1TlnEtRI9ZpK76FTWrhkev2iioTze8LZNrGh56V8uhgFnH0hAsJNDqL6pjgTb',1209600,NULL,'2019-02-08 03:16:26',1),('F5YMOgj7OJHm8rVHXMouMyrEyzXfIYO4LvMXC4LePABVXnposNncudaMM0rgP6HF',1209600,NULL,'2019-02-08 03:33:12',1),('G2yiDjbBTnG5xB8GUkSGhNFxceJGKVczdF1rU0EMtPsBLWpCWfzVp7NHN92V8r21',1209600,NULL,'2019-02-08 03:41:06',1),('jmZjQzkRupdzDP13d9uinEYibG1C5agRTSvC76Kgy8vyAsJnGVlDr5TMCTCDGUeT',1209600,NULL,'2019-02-08 03:53:04',1),('laNE9Qo4kPsuJT87yD77GWW2D99IgmSx29OjmFzq2sIDY9Cd2XBUl4nkahd4bUeG',1209600,NULL,'2019-02-08 03:41:07',1),('m3F5EQfqsF1uQXMACjHYWgJ9zwvOdDOCd89ainOFWiZLhQYyHK6uAjH8ICYozhCO',1209600,NULL,'2019-02-08 03:50:11',1),('mrGsoSHlGjv3jruXE6jEcWDZ79W7MvqM3oijuG8qUGpBe0JHaI6vSTUWHk6GJm3I',1209600,NULL,'2019-02-08 03:51:58',1),('poygKv6Q43FRER8ogVHHW8z9Z18PWdQMyMDDuEIB5KQieX82LBV13w3s5NQBbKf7',1209600,NULL,'2019-02-08 03:48:47',1),('QFhtpcBdA3c96oVXZ0RiyTdEPuUADM6nztV4zDQMqHps2E7mHPLTiXSIfeAIdxsW',1209600,NULL,'2019-02-08 03:50:18',1),('sb7fzxrfehDq7Ny5JvHgWWbo8N9mQFEg5fFBWHSKmygKcPqKiODa93Rl4FOFUFRM',1209600,NULL,'2019-02-08 03:20:43',1),('VQHFKfIIbbjMgdA3kFftOp9Sf2LAdN3E7AU5AxdlwqPkPv3BOjlS5FJi3M9G6bS4',1209600,NULL,'2019-02-08 03:41:08',1),('xeU8nEqW2oKPuUTcs9V0GY3SAYV4MIhbtEB2FTYQv5OjNRbwL9KDkejGKvJ9q1Eh',1209600,NULL,'2019-02-08 03:48:15',1),('z4eT4he5bKom2U0Hm3oipC9zZKcguh1DUsH9qc7P7XMe8g5UMDkkfU8eG1SpG7p9',1209600,NULL,'2019-02-08 03:33:39',1);
/*!40000 ALTER TABLE `accesstoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl`
--

DROP TABLE IF EXISTS `acl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(512) DEFAULT NULL,
  `property` varchar(512) DEFAULT NULL,
  `accessType` varchar(512) DEFAULT NULL,
  `permission` varchar(512) DEFAULT NULL,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl`
--

LOCK TABLES `acl` WRITE;
/*!40000 ALTER TABLE `acl` DISABLE KEYS */;
/*!40000 ALTER TABLE `acl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(64) NOT NULL,
  `cancelado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'Luis Jimenes',0),(2,'En los Alcarrizos',0);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendario`
--

DROP TABLE IF EXISTS `calendario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calendario` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `inicio_calendario` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fin_calendario` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `area_codigo` int(11) NOT NULL,
  `cancelado` tinyint(1) NOT NULL DEFAULT '0',
  `usuario_relacionado` int(11) NOT NULL,
  `formulario_modelo_codigo` int(11) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `calendario_formulario_modelo` (`formulario_modelo_codigo`),
  KEY `calendario_area` (`area_codigo`),
  CONSTRAINT `calendario_area` FOREIGN KEY (`area_codigo`) REFERENCES `area` (`codigo`),
  CONSTRAINT `calendario_formulario_modelo` FOREIGN KEY (`formulario_modelo_codigo`) REFERENCES `formulario_modelo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendario`
--

LOCK TABLES `calendario` WRITE;
/*!40000 ALTER TABLE `calendario` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colaborador`
--

DROP TABLE IF EXISTS `colaborador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colaborador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `primerNombre` varchar(512) NOT NULL,
  `segundoNombre` varchar(512) DEFAULT NULL,
  `primerApellido` varchar(512) NOT NULL,
  `segundoApellido` varchar(512) DEFAULT NULL,
  `realm` varchar(512) DEFAULT NULL,
  `username` varchar(512) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `email` varchar(512) NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colaborador`
--

LOCK TABLES `colaborador` WRITE;
/*!40000 ALTER TABLE `colaborador` DISABLE KEYS */;
INSERT INTO `colaborador` VALUES (1,'manager','manager','manager','managel',NULL,'manager','$2a$10$aZanI3CpL09NdqQqC.69bOAVcJ3It2MlKt1/EgPEIZO.tqA4m0oqa','manager@manager.com',NULL,NULL);
/*!40000 ALTER TABLE `colaborador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario_evaluacion`
--

DROP TABLE IF EXISTS `formulario_evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formulario_evaluacion` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_guardado` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `foto1` blob,
  `foto2` blob,
  `foto3` blob,
  `foto4` blob,
  `foto5` blob,
  `foto6` blob,
  `foto7` blob,
  `foto8` blob,
  `foto9` blob,
  `foto10` blob,
  `usuario_relacionado` int(11) NOT NULL,
  `formulario_modelo_codigo` int(11) NOT NULL,
  `area_codigo` int(11) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `formulario_evaluacion_area` (`area_codigo`),
  KEY `formulario_evaluacion_formulario_modelo` (`formulario_modelo_codigo`),
  CONSTRAINT `formulario_evaluacion_area` FOREIGN KEY (`area_codigo`) REFERENCES `area` (`codigo`),
  CONSTRAINT `formulario_evaluacion_formulario_modelo` FOREIGN KEY (`formulario_modelo_codigo`) REFERENCES `formulario_modelo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario_evaluacion`
--

LOCK TABLES `formulario_evaluacion` WRITE;
/*!40000 ALTER TABLE `formulario_evaluacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `formulario_evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario_modelo`
--

DROP TABLE IF EXISTS `formulario_modelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formulario_modelo` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `foto1` blob,
  `foto2` blob,
  `foto3` blob,
  `foto4` blob,
  `foto5` blob,
  `foto6` blob,
  `foto7` blob,
  `foto8` blob,
  `foto9` blob,
  `foto10` blob,
  `cancelado` tinyint(1) NOT NULL DEFAULT '0',
  `area_codigo` int(11) NOT NULL,
  `usuario_relacionado` int(11) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `formulario_modelo_area` (`area_codigo`),
  CONSTRAINT `formulario_modelo_area` FOREIGN KEY (`area_codigo`) REFERENCES `area` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario_modelo`
--

LOCK TABLES `formulario_modelo` WRITE;
/*!40000 ALTER TABLE `formulario_modelo` DISABLE KEYS */;
/*!40000 ALTER TABLE `formulario_modelo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario_modelo_item`
--

DROP TABLE IF EXISTS `formulario_modelo_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formulario_modelo_item` (
  `formulario_modelo_codigo` int(11) NOT NULL,
  `item_codigo` int(11) NOT NULL,
  `cancelado` tinyint(1) NOT NULL DEFAULT '0',
  KEY `formulario_modelo_item_formulario_modelo` (`formulario_modelo_codigo`),
  KEY `formulario_modelo_item_item` (`item_codigo`),
  CONSTRAINT `formulario_modelo_item_formulario_modelo` FOREIGN KEY (`formulario_modelo_codigo`) REFERENCES `formulario_modelo` (`codigo`),
  CONSTRAINT `formulario_modelo_item_item` FOREIGN KEY (`item_codigo`) REFERENCES `item` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario_modelo_item`
--

LOCK TABLES `formulario_modelo_item` WRITE;
/*!40000 ALTER TABLE `formulario_modelo_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `formulario_modelo_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cancelado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_evaluacion`
--

DROP TABLE IF EXISTS `item_evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_evaluacion` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_guardado` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `evaluacion` tinyint(1) NOT NULL DEFAULT '0',
  `comentario` varchar(264) NOT NULL,
  `formulario_evaluacion_codigo` int(11) NOT NULL,
  `imagen` blob NOT NULL,
  `usuario_relacionado` int(11) NOT NULL,
  `item_codigo` int(11) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `item_evaluacion_item` (`item_codigo`),
  KEY `item_evaluacion_formulario_evaluacion` (`formulario_evaluacion_codigo`),
  CONSTRAINT `item_evaluacion_formulario_evaluacion` FOREIGN KEY (`formulario_evaluacion_codigo`) REFERENCES `formulario_evaluacion` (`codigo`),
  CONSTRAINT `item_evaluacion_item` FOREIGN KEY (`item_codigo`) REFERENCES `item` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_evaluacion`
--

LOCK TABLES `item_evaluacion` WRITE;
/*!40000 ALTER TABLE `item_evaluacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Administrador','Tiene acceso a todo el sistema.','2019-02-08 00:11:17','2019-02-08 00:11:17'),(2,'Evaluador','Puede hacer las evaluaciones.','2019-02-08 00:11:17','2019-02-08 00:11:17');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolemapping`
--

DROP TABLE IF EXISTS `rolemapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolemapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(255) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `principalId` (`principalId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolemapping`
--

LOCK TABLES `rolemapping` WRITE;
/*!40000 ALTER TABLE `rolemapping` DISABLE KEYS */;
INSERT INTO `rolemapping` VALUES (1,'USER','1',1);
/*!40000 ALTER TABLE `rolemapping` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-08  5:45:03
