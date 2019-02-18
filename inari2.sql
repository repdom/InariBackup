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
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `cancelado` tinyint(1) NOT NULL DEFAULT '0',
  `foto1` longtext,
  `foto2` longtext,
  `foto3` longtext,
  `foto4` longtext,
  `foto5` longtext,
  `foto6` longtext,
  `foto7` longtext,
  `foto8` longtext,
  `foto9` longtext,
  `foto10` longtext,
  `usuario_admin_area` int(11) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `cedula` varchar(512) NOT NULL,
  `cancelado` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `formulario_modelo`
--

DROP TABLE IF EXISTS `formulario_modelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formulario_modelo` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cancelado` tinyint(1) NOT NULL DEFAULT '0',
  `area_codigo` int(11) NOT NULL,
  `usuario_relacionado` int(11) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `formulario_modelo_area` (`area_codigo`),
  CONSTRAINT `formulario_modelo_area` FOREIGN KEY (`area_codigo`) REFERENCES `area` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `formulario_modelo_item`
--

DROP TABLE IF EXISTS `formulario_modelo_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formulario_modelo_item` (
  `codigo` int(11) DEFAULT NULL,
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
  `definicion` varchar(555) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `imagen` longtext,
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-17 22:46:35
