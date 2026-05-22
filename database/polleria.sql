-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: polleria
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alergias`
--

DROP TABLE IF EXISTS `alergias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alergias` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alergias`
--

LOCK TABLES `alergias` WRITE;
/*!40000 ALTER TABLE `alergias` DISABLE KEYS */;
INSERT INTO `alergias` VALUES (1,'Lácteos'),(2,'Huevo'),(3,'No tiene'),(4,'Gluten'),(5,'Soya'),(7,'Ajo '),(8,'Chocolate');
/*!40000 ALTER TABLE `alergias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Salida de productos','Brasas'),(2,'Agua','Bebidas'),(6,'Comida','Postres'),(16,'Salida de productos','Guarniciones'),(17,'otros','Hamburguesas'),(18,'Conjunto de frutas y/o verduras variadas','Ensaladas'),(19,'Variedad de carnes cocinadas acompañadas de guarniciones','Parrillas'),(20,'Variedad de pollos freidos','Broasters'),(21,'Una gran variedad de cremas para acompañar sus platos favoritos','Cremas');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` varchar(255) NOT NULL,
  `descripcion` varchar(3000) NOT NULL,
  `total` varchar(255) NOT NULL,
  `venta_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKiv9ulmbbk6gd03x3rf6oud890` (`venta_id`),
  CONSTRAINT `FKhj0bf0515yg7equ11ab4xgq3f` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
INSERT INTO `detalle_venta` VALUES (3,'1','1/4 Pollo a la Brasa','25.9',18),(4,'7','SuperOferta + 4 Piezas Broasters x1 + Torta de Chocolate x1 + 1.5L CocaKola x1 + Ají  x2','70.8',19);
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingrediente_plato`
--

DROP TABLE IF EXISTS `ingrediente_plato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingrediente_plato` (
  `ingrediente_id` bigint NOT NULL,
  `plato_id` bigint NOT NULL,
  KEY `FK4dcdcfbabnlaohiruf0rce2gd` (`plato_id`),
  KEY `FK8dpvqpbio7bgfdukc1nsfyfk` (`ingrediente_id`),
  CONSTRAINT `FK4dcdcfbabnlaohiruf0rce2gd` FOREIGN KEY (`plato_id`) REFERENCES `platos` (`id`),
  CONSTRAINT `FK8dpvqpbio7bgfdukc1nsfyfk` FOREIGN KEY (`ingrediente_id`) REFERENCES `ingredientes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingrediente_plato`
--

LOCK TABLES `ingrediente_plato` WRITE;
/*!40000 ALTER TABLE `ingrediente_plato` DISABLE KEYS */;
INSERT INTO `ingrediente_plato` VALUES (4,43),(3,42),(5,42),(2,29),(6,42),(7,42),(8,42),(9,42),(10,43),(11,43),(12,43),(13,43),(14,43),(15,43),(16,43),(17,37),(18,38),(19,39),(20,40),(21,41),(22,37),(23,38),(24,39),(25,40),(26,41),(27,37),(28,38),(29,39),(30,40),(31,41),(32,47),(33,50),(34,47),(35,50),(36,47),(37,50),(38,47),(39,50),(40,47),(41,50),(42,47),(43,50),(44,48),(45,48),(46,48),(47,48),(48,48),(49,56),(50,57),(51,60),(52,61),(53,56),(54,57),(55,60),(56,61),(57,56),(58,57),(59,60),(60,61),(61,56),(62,57),(63,60),(64,61),(65,61),(66,61),(67,65),(68,65),(69,65),(70,65),(71,65),(72,65),(73,62),(74,62),(75,67),(76,67),(77,67),(78,67),(79,67),(80,67),(81,67),(82,67),(83,66),(84,66),(85,66),(87,66),(88,66),(89,66),(90,66),(91,66),(92,66),(93,68),(95,68),(96,68),(97,68),(98,68),(99,68),(100,68),(101,68),(102,68),(103,68);
/*!40000 ALTER TABLE `ingrediente_plato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredientes`
--

DROP TABLE IF EXISTS `ingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredientes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `alergia_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgo21c08m9ub4dar0p7w6q8tqd` (`alergia_id`),
  CONSTRAINT `FKgo21c08m9ub4dar0p7w6q8tqd` FOREIGN KEY (`alergia_id`) REFERENCES `alergias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredientes`
--

LOCK TABLES `ingredientes` WRITE;
/*!40000 ALTER TABLE `ingredientes` DISABLE KEYS */;
INSERT INTO `ingredientes` VALUES (2,'Limón',3),(3,'Huevo',2),(4,'Huevo',2),(5,'Lechuga',3),(6,'Limón',3),(7,'Queso Parmesano',1),(8,'Pollo',3),(9,'Aceite de Oliva',3),(10,'Lechuga',3),(11,'Tomate',3),(12,'Tocino',3),(13,'Palta',3),(14,'Queso Azul',1),(15,'Pollo',3),(16,'Cebolla',3),(17,'Trigo',4),(18,'Trigo',4),(19,'Trigo',4),(20,'Trigo',4),(21,'Trigo',4),(22,'Huevo',2),(23,'Huevo',2),(24,'Huevo',2),(25,'Huevo',2),(26,'Huevo',2),(27,'Ajo ',7),(28,'Ajo ',7),(29,'Ajo ',7),(30,'Ajo ',7),(31,'Ajo ',7),(32,'Huevo',2),(33,'Huevo',2),(34,'Cebolla China',3),(35,'Cebolla China',3),(36,'Sillao',5),(37,'Sillao',5),(38,'Ajo ',7),(39,'Ajo ',7),(40,'Kion',3),(41,'Kion',3),(42,'Pollo',3),(43,'Pollo',3),(44,'Cebolla',3),(45,'Tomate',3),(46,'Ajo ',7),(47,'Sillao',5),(48,'Vinagre',3),(49,'Trigo',4),(50,'Trigo',4),(51,'Trigo',4),(52,'Trigo',4),(53,'Lechuga',3),(54,'Lechuga',3),(55,'Lechuga',3),(56,'Lechuga',3),(57,'Tomate',3),(58,'Tomate',3),(59,'Tomate',3),(60,'Tomate',3),(61,'Huevo',2),(62,'Huevo',2),(63,'Huevo',2),(64,'Huevo',2),(65,'Queso Chédar',1),(66,'Tocino',3),(67,'Ajo ',7),(68,'Vinagre',3),(69,'Comino',3),(70,'Orégano',3),(71,'Ají Panca',3),(72,'Limón',3),(73,'Ajo ',7),(74,'Pollo',3),(75,'Trigo',4),(76,'Mantequilla',1),(77,'Azúcar',3),(78,'Leche',1),(79,'Huevo',2),(80,'Limón',3),(81,'Manzana',3),(82,'Canela',3),(83,'Trigo',4),(84,'Cacao en Polvo',8),(85,'Azúcar',3),(87,'Huevo',2),(88,'Mantequilla',1),(89,'Leche',1),(90,'Vainilla',3),(91,'Chocolate',8),(92,'Polvo de Hornear',3),(93,'Trigo',4),(95,'Huevo',2),(96,'Azúcar',3),(97,'Vainilla',3),(98,'Leche Evaporada',1),(99,'Leche Condensada',1),(100,'Nata',1),(101,'Polvo de Hornear',3),(102,'Chantilly',3),(103,'Canela',3);
/*!40000 ALTER TABLE `ingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `correo` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT INTO `mensajes` VALUES (1,'correo@gmail.com','dasd','asdasd'),(2,'correo@gmail.com','Probando el formulario de contacto','Manuel');
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodopago`
--

DROP TABLE IF EXISTS `metodopago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodopago` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodopago`
--

LOCK TABLES `metodopago` WRITE;
/*!40000 ALTER TABLE `metodopago` DISABLE KEYS */;
INSERT INTO `metodopago` VALUES (1,'Yape'),(2,'Efectivo'),(3,'Plin');
/*!40000 ALTER TABLE `metodopago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ofertas`
--

DROP TABLE IF EXISTS `ofertas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ofertas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `nombre` varchar(70) NOT NULL,
  `precio_actual` double NOT NULL,
  `precio_nuevo` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ofertas`
--

LOCK TABLES `ofertas` WRITE;
/*!40000 ALTER TABLE `ofertas` DISABLE KEYS */;
INSERT INTO `ofertas` VALUES (1,2,'InkaKola + Gaseosa','SuperOferta',40,30),(2,3,'Plato + Gaseosa + CocaKola','SuperOfertaUno',42,30);
/*!40000 ALTER TABLE `ofertas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platos`
--

DROP TABLE IF EXISTS `platos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `categoria_id` bigint DEFAULT NULL,
  `descripcion` varchar(500) NOT NULL,
  `precio` double NOT NULL,
  `imagen` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1q3vxt814ymgxp8hlnspb8phc` (`categoria_id`),
  CONSTRAINT `FK1q3vxt814ymgxp8hlnspb8phc` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platos`
--

LOCK TABLES `platos` WRITE;
/*!40000 ALTER TABLE `platos` DISABLE KEYS */;
INSERT INTO `platos` VALUES (1,'3L Coca Cola',2,'Gaseosa Coca Cola de 3L',17.5,'cocacola3.jpg'),(19,'3L Inca Kola',2,'Gaseosa Inca Kola de 3L',17.5,'incakola3.jpg'),(21,'Coca Cola Personal',2,'Gaseosa Coca Cola de 500ML',6,'cocacola500.jpg'),(22,'Inca Kola Personal',2,'Gaseosa de Inca Kola de 500ML',6,'incakola500.jpg'),(25,'1.5L Inca Kola',2,'Gaseosa Inca Kola de 1.5L',11.9,'bcb10512-3744-4d7c-a6c5-ad167104e9de_incakola15.png'),(26,'1.5L CocaKola',2,'Gaseosa Coca Cola de 1.5L',11.9,'cocacola15.jpg'),(29,'1L Limonada',2,'Limonada de 1L',19.9,'limonada1.jpg'),(30,'1L Maracuyá',2,'Maracuyá de 1L',19.9,'maracuya1.jpg'),(31,'1L Chicha Morada',2,'Chicha Morada de 1L',19.9,'chichamorada1.png'),(32,'1/8 Pollo a la Brasa',1,'1/8 de Pollo a la Brasa acompañado de una guarnición de Papas Fritas',12,'18pollobrasa.jpg'),(33,'1/4 Pollo a la Brasa',1,'1/4 de Pollo a la Brasa acompañado de una guarnición de Papas Fritas',25.9,'14pollobrasa.png'),(34,'1/2 Pollo a la Brasa',1,'1/2 de Pollo a la Brasa acompañado de una guarnición de Papas Fritas',46.9,'12pollobrasa.png'),(35,'1 Pollo a la Brasa',1,'1 Pollo a la Brasa acompañado de una guarnición de Papas Fritas',70.9,'1pollobrasa.jpg'),(37,'2 Piezas Broasters',20,'2 Piezas Broasters acompañado con una guarnición de Papas Fritas',9.9,'2piezasbroasters.jpg'),(38,'4 Piezas Broasters',20,'4 Piezas Broasters acompañado con una guarnición de Papas Fritas',19.9,'4piezasbroasters.jpg'),(39,'6 Piezas Broasters',20,'6 Piezas Broasters acompañado con una guarnición de Papas Fritas',29.9,'6piezasbroasters.jpg'),(40,'8 Piezas Broasters',20,'8 Piezas Broasters acompañado con una guarnición de Papas Fritas',39.9,'8piezasbroasters.jpg'),(41,'10 Piezas Broasters',20,'10 Piezas Broasters acompañado con una guarnición de Papas Fritas',49.9,'8piezasbroasters.jpg'),(42,'Ensalada César',18,'Ensalada que contiene lechuga, ajo, sal, jugo de limón, queso parmesano y trozos de pollo a la brasa',30,'ensaladacesar.jpg'),(43,'Ensalada Cobb',18,'Ensalada que contiene lechuga, tomate, tocino, huevo, palta, queso azul y trozos de pollo a la parrilla',34,'ensaladacobb.jpg'),(44,'Ensalada de Frutas',18,'Ensalada que contiene manzana, plátano, uva, fresas, piña, durazno, etc.',35,'ensaladafrutas.jpg'),(45,'Papas Fritas Familiar',16,'Papas Fritas de tamaño familiar',15,'papasfamiliar.jpg'),(46,'Papas Nativas Familiar',16,'Papas Nativas de tamaño familiar',18,'papasnativasfamiliar.jpg'),(47,'Arroz Chaufa',16,'Arroz Chaufa con trozos de Pollo a la Brasa',17,'arrozchaufa.jpg'),(48,'Lomo Saltado',16,'Lomo Saltado acompañado de Papas Fritas y Arroz Blanco',22,'lomosaltado.jpg'),(49,'Arroz Blanco',16,'Arroz Blanco',13,'arrozblanco.jpg'),(50,'Arroz Chaufa Personal',16,'Arroz Chaufa de tamaño personal con trozos de Pollo a la Brasa',7,'arrozchaufapersonal.jpg'),(51,'Arroz Blanco Personal',16,'Arroz Blanco de tamaño personal',6,'arrozblancopersonal.jpg'),(52,'Papas Fritas Personal',16,'Papas Fritas de tamaño personal',6,'papaspequeñas.jpg'),(53,'Papas Nativas Personal',16,'Papas Nativas de tamaño personal',8,'papasnativasmedianas.jpg'),(54,'Papas Fritas Mediana',16,'Papas Fritas de tamaño mediano',11,'papasmedianas.jpg'),(55,'Papas Nativas Mediana',16,'Papas Nativas de tamaño mediano',13,'papasnativasmedianas.jpg'),(56,'Hamburguesa de Carne',17,'Hamburguesa de carne acompañada de Papas Fritas, lechuga, tomate y mayonesa',16,'hamburguesacarne.jpg'),(57,'Hamburguesa de Pollo',17,'Hamburguesa con trozos de Pollo a la Brasa acompañada de Papas Fritas, lechuga, tomate, mayonesa y mostaza',19,'hamburguesapollobrasa.jpg'),(60,'Hamburguesa de Pollo Broaster',17,'Hamburguesa con un Pollo Broaster acompañado con Papas Fritas, lechuga, tomate y mayonesa',19,'7613a909-2f6d-49f2-8065-dc3374760c90_hamburguesapollobroaster.jpg'),(61,'Hamburguesa Extrema',17,'Hamburguesa con 2 carnes acompañado de lechuga, tomate, tocino, queso y Papas Fritas',23,'c8f5a303-d5cd-43c6-a448-6c26af39772f_hamburguesaextrema.jpg'),(62,'Pechuga de Pollo a la Parrilla',19,'1 Pechuga de Pollo acompañado de Papas Fritas',25,'f325297d-3c19-497c-b5a7-7fb0dac844fb_pechugapolloparrilla.jpg'),(63,'Chuleta a la Parrilla',19,'1 Chuleta acompañado de Papas Fritas',22,'8821ac32-2753-4956-aa64-ff5beda7d64e_chuletaparrilla.jpg'),(64,'Bife a la Parrilla',19,'1 Bife acompañado de Papas Fritas',40,'475fe37e-8637-4ea6-aa23-21f2ed2ec49f_bifeparrilla.jpg'),(65,'Parrilla Carretillera',19,'2 palos de anticucho con chorizo, molleja, 300gr de pancita, papa sancochada, salchichas y choclo',46,'871a720e-db87-4394-a053-f9a86b2c73f1_parrillacarretillera.jpg'),(66,'Torta de Chocolate',6,'1 tajada de torta bañada en chocolate',9,'20d1a0fc-ddd1-41a2-b065-bf3b3d0f192f_tortachocolate.jpg'),(67,'Pie de Manzana',6,'1 tajada de un pie con relleno de manzana',10,'ff3f43c0-9a83-4d19-9b94-410a609c0745_piemanzana.jpg'),(68,'Tres Leches',6,'Pequeño pastel sabor a vainilla de masa con textura esponjosa, fresca y húmeda, bañada en tres leches, cubierto con crema de leche (chantilly) y canela espolvoreada.',10,'5ce20a42-a9c8-42a3-acfd-2cc7c3039376_tresleches.jpg'),(69,'Mayonesa',21,'Salsa cremosa elaborada con huevo, sal, jugo de limón y aceite',0,'d80100fe-cdd6-4190-a7ca-a9ac6a80bca9_mayonesa.jpg'),(70,'Mostaza',21,'Salsa amarilla con sabor agridulce elaborado con semillas de mostaza, mayonesa y vinagre o limón',0,'6402b959-de77-4695-929f-6d33e5d4b645_mostaza.jpg'),(71,'Ketchup',21,'Salsa roja con sabor agridulce elaborado con pure de tomaté, vinagre, azúcar, sal y especias',0,'c8c25170-a214-4d51-8e38-21736f531654_ketchup.jpg'),(72,'Ají ',21,'Salsa cremosa amarilla elaborado con ajís amarillos, ajo, sal, pimienta, leche y mostaza',0,'2f14fd5f-9e59-4622-ad13-43bb961f08fa_ajipolleria.jpg');
/*!40000 ALTER TABLE `platos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (6,'ROLE_USER'),(10,'ROLE_ADMIN');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_rol`
--

DROP TABLE IF EXISTS `usuario_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_rol` (
  `usuario_id` bigint NOT NULL,
  `rol_id` bigint NOT NULL,
  KEY `FK610kvhkwcqk2pxeewur4l7bd1` (`rol_id`),
  KEY `FKktsemf1f6awjww4da0ocv4n32` (`usuario_id`),
  CONSTRAINT `FK610kvhkwcqk2pxeewur4l7bd1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`),
  CONSTRAINT `FKktsemf1f6awjww4da0ocv4n32` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_rol`
--

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` VALUES (14,6),(16,6),(8,10);
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `apellido` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol_id` bigint DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `zona_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhgjerbltbmqb9yf6adg4yh0t8` (`rol_id`),
  KEY `FKed6shrtpj0mrlq3hueusyopt` (`zona_id`),
  CONSTRAINT `FKed6shrtpj0mrlq3hueusyopt` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`id`),
  CONSTRAINT `FKhgjerbltbmqb9yf6adg4yh0t8` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (8,'Lope','Manuel','$2a$10$ZdgYlDzXXeg5yqrt5j/ARuH18Imo0NbZgQixdSmopfd/8z/Qe.Qge',10,'Av.Los Jardines','987654321','admin@gmail.com',1),(9,'Perez','Juan','$2a$10$CFJJKU37OKlfkwxgoM25Bem8jd6oDQg7Ru7obR5Y6ciRrE9yvxHs2',NULL,NULL,NULL,NULL,NULL),(10,'Alvarez','Octavio','$2a$10$4jfTt4uW4Mr8ZR3rzp69O.X5rS5lRlpdGGer2C7/ZXQzcYKYlEC7O',NULL,NULL,NULL,NULL,NULL),(11,'Ramirez','Kenny','$2a$10$rezsPZJU89qC/CZtYRpLtOWdwCy.bmtWhsFhn4jQCYng/a4OAggai',NULL,NULL,NULL,NULL,NULL),(13,'Morales','Arturo','123456',6,NULL,NULL,NULL,NULL),(14,'Fonsi','Luis','$2a$10$XULLa1VMum6DEY7tIZNrzOhNlL.8LYcsdP8XDfI/iSn4OgrkuRouK',NULL,NULL,NULL,'luis.fonsi@gmail.com',NULL),(16,'Apellido','Nombre','$2a$10$nZqJcEuHs6Qjz8glTrTMc.a7yXDpXeBnog8sN5dVVrylMihP/cffG',NULL,'Direccion','12312','nombre.apellido@gmail.com',4);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `metodopago_id` bigint DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  `zona_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo5wowuoiqkerma046bdaggrf0` (`metodopago_id`),
  KEY `FKlostuvs99qor7x91k50ufof16` (`usuario_id`),
  KEY `FK8awnmmh61i91c5x622a03lemb` (`zona_id`),
  CONSTRAINT `FK8awnmmh61i91c5x622a03lemb` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`id`),
  CONSTRAINT `FKlostuvs99qor7x91k50ufof16` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `FKo5wowuoiqkerma046bdaggrf0` FOREIGN KEY (`metodopago_id`) REFERENCES `metodopago` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (18,'18/5/2026, 23:43:17','Manuel','admin@gmail.com',2,8,1),(19,'18/5/2026, 23:56:31','Manuel','admin@gmail.com',2,8,1);
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zonas`
--

DROP TABLE IF EXISTS `zonas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zonas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `departamento` varchar(60) NOT NULL,
  `distrito` varchar(60) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `provincia` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonas`
--

LOCK TABLES `zonas` WRITE;
/*!40000 ALTER TABLE `zonas` DISABLE KEYS */;
INSERT INTO `zonas` VALUES (1,'Lima','SJL','San Juan de Lurigancho','Lima'),(4,'LaLibertad','sadasda','asdasd','Otuzco');
/*!40000 ALTER TABLE `zonas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-22 16:09:58
