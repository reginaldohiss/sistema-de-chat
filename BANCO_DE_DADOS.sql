# ************************************************************
# Sequel Pro SQL dump
# Versão 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.35)
# Base de Dados: batepapo
# Tempo de Geração: 2018-08-30 18:29:33 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump da tabela groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;

INSERT INTO `groups` (`id`, `name`)
VALUES
	(1,'Geral'),
	(2,'Testes'),
	(3,'Desenvolvimento'),
	(4,'Criada via Sistema'),
	(5,'Sala 2');

/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump da tabela messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_group` int(11) NOT NULL,
  `date_msg` datetime NOT NULL,
  `msg` text NOT NULL,
  `msg_type` varchar(20) NOT NULL DEFAULT 'text',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;

INSERT INTO `messages` (`id`, `id_user`, `id_group`, `date_msg`, `msg`, `msg_type`)
VALUES
	(1,1,4,'2018-04-23 12:07:25','oi','text'),
	(2,1,4,'2018-04-23 12:08:17','opa, tudo bem?','text'),
	(3,1,4,'2018-04-23 12:08:20','e ai, como vai...','text'),
	(4,1,4,'2018-04-23 12:08:23','legal demais!','text'),
	(28,1,4,'2018-05-21 10:41:29','lkajsrl','text'),
	(29,1,4,'2018-05-21 10:51:18','mensagem eventual','text'),
	(30,1,4,'2018-05-21 10:51:31','outra mensagem','text'),
	(31,4,4,'2018-05-21 10:53:08','opa galera, tudo bem?','text'),
	(32,1,4,'2018-05-21 10:53:19','beleza, e ai?','text'),
	(33,4,4,'2018-05-21 10:53:30','maravilha, só testando o chat...','text'),
	(34,1,4,'2018-05-21 10:53:37','beleza, eu também!','text'),
	(35,1,4,'2018-05-21 11:05:22','testando mensagem....','text'),
	(36,1,4,'2018-05-21 11:06:02','outra msg...','text'),
	(37,1,3,'2018-05-21 11:06:23','mensagem para a tela de dev....','text'),
	(38,1,4,'2018-05-30 09:41:55','opa, tudo bem?','text'),
	(39,1,4,'2018-05-30 09:42:08','testando novamente','text'),
	(40,1,4,'2018-05-30 09:50:09','3ff10879260c5203375797cb7a5426f2.png','img'),
	(41,1,4,'2018-05-30 09:51:38','08132f99a75ed0c8d50a3d6967d0abdd.png','img'),
	(42,1,4,'2018-05-30 09:53:00','5719e7be5936bae632009a39a8ad6e71.png','img'),
	(43,1,4,'2018-05-30 09:53:11','lkajsrlkajsr','text'),
	(44,1,4,'2018-05-30 09:59:24','laskrjlasr','text');

/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump da tabela users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '',
  `pass` varchar(255) NOT NULL DEFAULT '',
  `loginhash` varchar(32) DEFAULT NULL,
  `last_update` datetime DEFAULT NULL,
  `groups` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `pass`, `loginhash`, `last_update`, `groups`)
VALUES
	(1,'bonieky','$2y$10$oSf2zLbBP8IIT2fO8jM3a.2UjwmDpISliTJlpccnN2GR7E9U6wBGm','b04777f3f364671cbb74e1a2b8b43771','2018-06-04 09:48:04','!1!3!'),
	(4,'teste','$2y$10$g8zE7KgJDzuzUqrzuAy/bOoWsXjIYyENorHmElkqscAyyzubLnWFa','64ea990a8e91c600bcbef601b5fdaa25','2018-06-04 09:18:22','');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
