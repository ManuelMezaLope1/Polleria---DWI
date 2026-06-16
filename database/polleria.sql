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
-- Table structure for table `categoria_ingrediente`
--

DROP TABLE IF EXISTS `categoria_ingrediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_ingrediente` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_ingrediente`
--

LOCK TABLES `categoria_ingrediente` WRITE;
/*!40000 ALTER TABLE `categoria_ingrediente` DISABLE KEYS */;
INSERT INTO `categoria_ingrediente` VALUES (1,'Verduras'),(2,'Frutas'),(3,'Carnes'),(4,'Lácteos'),(5,'Huevos'),(6,'Cereales'),(7,'Aceites'),(8,'Condimentos'),(9,'Salsas'),(10,'Repostería'),(11,'Endulzantes');
/*!40000 ALTER TABLE `categoria_ingrediente` ENABLE KEYS */;
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
  `cantidad` int DEFAULT NULL,
  `descripcion` varchar(3000) NOT NULL,
  `total` double DEFAULT NULL,
  `venta_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKiv9ulmbbk6gd03x3rf6oud890` (`venta_id`),
  CONSTRAINT `FKhj0bf0515yg7equ11ab4xgq3f` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
INSERT INTO `detalle_venta` VALUES (3,1,'1/4 Pollo a la Brasa',25.9,18),(4,7,'SuperOferta + 4 Piezas Broasters x1 + Torta de Chocolate x1 + 1.5L CocaKola x1 + Ají  x2',70.8,19),(5,11,'SuperOfertaTres + 1/8 Pollo a la Brasa x1 + 8 Piezas Broasters x1 + Coca Cola Personal x1 + Mostaza x3, Mayonesa x3',142.9,20),(6,8,'1/8 Pollo a la Brasa + Ensalada Cobb x1 + Papas Nativas Mediana x1 + 1.5L CocaKola x1 + Mayonesa x4',70.9,21),(7,6,'1 Pollo a la Brasa + Papas Fritas Familiar x1 + 1L Chicha Morada x1 + Mostaza x3, Mayonesa x4, Ají  x3',105.8,22),(8,3,'SuperOferta',30,23),(9,5,'SuperOfertaCinco + Torta de Chocolate x1',64.5,24),(10,12,'SuperOfertaDos + 1/4 Pollo a la Brasa x1 + Hamburguesa de Carne x3 + Coca Cola Personal x2 + Ketchup x4, Mayonesa x3',157.9,25),(11,3,'Ensalada César + Hamburguesa Extrema x1 + 1L Limonada x1',72.9,26),(12,1,'Lomo Saltado',22,27),(13,8,'Parrilla Carretillera + 1/8 Pollo a la Brasa x1 + Pie de Manzana x1 + Papas Fritas Familiar x1 + Ají  x4, Mayonesa x4',83,28),(14,6,'1/4 Pollo a la Brasa + 1/4 Pollo a la Brasa x1 + Arroz Blanco x1 + Mostaza x2, Ají  x3',64.8,29),(15,11,'1 Pollo a la Brasa + Parrilla Carretillera x1 + Torta de Chocolate x3 + Papas Nativas Familiar x2 + 3L Coca Cola x1 + Mayonesa x3',197.4,30),(16,4,'SuperOfertaCinco',55.5,31),(17,8,'8 Piezas Broasters + Ensalada de Frutas x1 + Lomo Saltado x1, Arroz Chaufa Personal x2 + Ketchup x4',110.9,32),(18,4,'SuperOfertaCinco',55.5,33),(19,3,'2 Piezas Broasters + Hamburguesa de Pollo Broaster x1 + Ají  x1',28.9,34),(20,6,'SuperOfertaTres + 1L Maracuyá x1',104.9,35),(21,2,'Ensalada Cobb + 1L Chicha Morada x1',53.9,36),(22,5,'Arroz Chaufa + 1/8 Pollo a la Brasa x1 + Papas Fritas Personal x1 + Mayonesa x2',35,37),(23,6,'Hamburguesa Extrema + Ensalada César x1 + Pie de Manzana x1 + Mayonesa x3',63,38),(24,4,'SuperOfertaDos + Inca Kola Personal x1',78,39),(25,8,'SuperOfertaUno + Hamburguesa de Pollo x1 + Chuleta a la Parrilla x1 + Mostaza x3',101.5,40),(26,6,'SuperOfertaCuatro + Ensalada de Frutas x1 + Tres Leches x1 + 1L Limonada x1',104.9,41),(27,9,'SuperOferta + 1/4 Pollo a la Brasa x1 + Arroz Blanco x1 + Mayonesa x4',68.9,42),(28,8,'6 Piezas Broasters + Ensalada Cobb x2 + Hamburguesa de Carne x1 + Torta de Chocolate x2 + Inca Kola Personal x2',143.9,43),(29,1,'Ensalada de Frutas',35,44),(30,3,'Arroz Chaufa + Lomo Saltado x1 + 1L Chicha Morada x1',58.9,45),(31,4,'SuperOfertaCinco',55.5,46),(32,4,'10 Piezas Broasters + 1.5L Inca Kola x1 + Ají  x2',61.8,47),(33,3,'1/8 Pollo a la Brasa + Torta de Chocolate x1 + Inca Kola Personal x1',27,48),(34,5,'SuperOfertaTres',85,49),(35,4,'SuperOfertaCuatro + 1L Chicha Morada x1',59.9,50),(36,6,'8 Piezas Broasters + Arroz Blanco x1 + 1.5L CocaKola x1 + Mayonesa x4, Ají  x3',64.8,51),(37,4,'SuperOfertaDos + Ensalada de Frutas x1',107,52),(38,6,'SuperOfertaCinco + Ensalada Cobb x1 + 1L Chicha Morada x1',109.4,53),(39,4,'8 Piezas Broasters + Ensalada de Frutas x1 + Hamburguesa de Carne x1 + 1L Limonada x1',110.8,54),(40,2,'Ensalada César + 1L Maracuyá x1',49.9,55),(41,5,'1 Pollo a la Brasa + Pie de Manzana x1 + Papas Nativas Familiar x1 + 1L Chicha Morada x1 + Mostaza x3, Mayonesa x3, Ají  x1',118.8,56),(42,3,'SuperOferta',30,57),(43,5,'Hamburguesa de Pollo Broaster + Arroz Blanco x1 + Inca Kola Personal x1 + Mayonesa x2',38,58),(44,2,'1 Pollo a la Brasa + 3L Coca Cola x1',88.4,59),(45,2,'1/8 Pollo a la Brasa + 6 Piezas Broasters x1',41.9,60),(46,5,'SuperOfertaTres',85,61),(47,5,'1 Pollo a la Brasa + 1 Pollo a la Brasa x1 + 2 Piezas Broasters x1 + Ensalada de Frutas x1 + Hamburguesa de Carne x1',202.7,62),(48,3,'10 Piezas Broasters + 1 Pollo a la Brasa x1 + 6 Piezas Broasters x1',150.7,63),(49,1,'1 Pollo a la Brasa',70.9,64),(50,1,'Ensalada de Frutas',35,65),(51,1,'Ensalada de Frutas',35,69);
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta_ofertas`
--

DROP TABLE IF EXISTS `detalle_venta_ofertas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta_ofertas` (
  `cantidad_ofertas` int DEFAULT NULL,
  `detalle_venta_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `oferta_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6woukrfomef49vw3od7wdmuiq` (`detalle_venta_id`),
  KEY `FKdcql5t3ij8yvf0c7s8wdlkflp` (`oferta_id`),
  CONSTRAINT `FK6woukrfomef49vw3od7wdmuiq` FOREIGN KEY (`detalle_venta_id`) REFERENCES `detalle_venta` (`id`),
  CONSTRAINT `FKdcql5t3ij8yvf0c7s8wdlkflp` FOREIGN KEY (`oferta_id`) REFERENCES `ofertas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta_ofertas`
--

LOCK TABLES `detalle_venta_ofertas` WRITE;
/*!40000 ALTER TABLE `detalle_venta_ofertas` DISABLE KEYS */;
INSERT INTO `detalle_venta_ofertas` VALUES (1,5,1,5),(0,6,2,3),(0,7,3,3),(1,8,4,1),(1,9,5,7),(1,10,6,4),(0,11,7,3),(0,12,8,3),(0,13,9,3),(0,14,10,3),(0,15,11,3),(1,16,12,7),(0,17,13,3),(1,18,14,7),(0,19,15,3),(1,20,16,5),(0,21,17,3),(0,22,18,3),(0,23,19,3),(1,24,20,4),(1,25,21,2),(1,26,22,6),(1,27,23,1),(0,28,24,3),(0,29,25,3),(0,30,26,3),(1,31,27,7),(0,32,28,3),(0,33,29,3),(1,34,30,5),(1,35,31,6),(0,36,32,3),(1,37,33,4),(1,38,34,7),(0,39,35,3),(0,40,36,3),(0,41,37,3),(1,42,38,1),(0,43,39,3),(0,44,40,3),(0,45,41,3),(1,46,42,5),(0,47,43,3),(0,48,44,3),(0,49,45,3),(0,50,46,3),(0,51,47,3);
/*!40000 ALTER TABLE `detalle_venta_ofertas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta_platos`
--

DROP TABLE IF EXISTS `detalle_venta_platos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta_platos` (
  `cantidad_platos` int NOT NULL,
  `detalle_venta_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `plato_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK20vnxakrk9jyxp3khopd1csv3` (`detalle_venta_id`),
  KEY `FK7gem0xxngw6lhyd4dae2ra0mb` (`plato_id`),
  CONSTRAINT `FK20vnxakrk9jyxp3khopd1csv3` FOREIGN KEY (`detalle_venta_id`) REFERENCES `detalle_venta` (`id`),
  CONSTRAINT `FK7gem0xxngw6lhyd4dae2ra0mb` FOREIGN KEY (`plato_id`) REFERENCES `platos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta_platos`
--

LOCK TABLES `detalle_venta_platos` WRITE;
/*!40000 ALTER TABLE `detalle_venta_platos` DISABLE KEYS */;
INSERT INTO `detalle_venta_platos` VALUES (1,5,1,21),(3,5,2,70),(3,5,3,69),(1,5,4,40),(1,6,5,26),(4,6,6,69),(1,6,7,43),(1,6,8,55),(1,7,9,31),(3,7,10,70),(4,7,11,69),(3,7,12,72),(1,7,13,45),(1,9,14,66),(2,10,15,21),(4,10,16,71),(3,10,17,69),(3,10,18,56),(1,11,19,29),(1,11,20,61),(4,13,21,72),(4,13,22,69),(1,13,23,45),(1,13,24,67),(2,14,25,70),(3,14,26,72),(1,14,27,49),(1,15,28,1),(3,15,29,69),(2,15,30,46),(1,15,31,65),(3,15,32,66),(4,17,33,71),(1,17,34,44),(1,17,35,48),(2,17,36,50),(1,19,37,72),(1,19,38,60),(1,20,39,30),(1,21,40,31),(2,22,41,69),(1,22,42,52),(3,23,43,69),(1,23,44,42),(1,23,45,67),(1,24,46,22),(3,25,47,70),(1,25,48,57),(1,25,49,63),(1,26,50,29),(1,26,51,44),(1,26,52,68),(4,27,53,69),(1,27,54,49),(2,28,55,22),(2,28,56,43),(1,28,57,56),(2,28,58,66),(1,30,59,31),(1,30,60,48),(1,32,61,25),(2,32,62,72),(1,33,63,22),(1,33,64,66),(1,35,65,31),(1,36,66,26),(4,36,67,69),(3,36,68,72),(1,36,69,49),(1,37,70,44),(1,38,71,31),(1,38,72,43),(1,39,73,29),(1,39,74,44),(1,39,75,56),(1,40,76,30),(1,41,77,31),(3,41,78,70),(3,41,79,69),(1,41,80,72),(1,41,81,46),(1,41,82,67),(1,43,83,22),(2,43,84,69),(1,43,85,49),(1,44,86,1),(1,45,87,39),(1,47,88,37),(1,47,89,44),(1,47,90,56),(1,48,91,39);
/*!40000 ALTER TABLE `detalle_venta_platos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_ingrediente`
--

DROP TABLE IF EXISTS `estado_ingrediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_ingrediente` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_ingrediente`
--

LOCK TABLES `estado_ingrediente` WRITE;
/*!40000 ALTER TABLE `estado_ingrediente` DISABLE KEYS */;
INSERT INTO `estado_ingrediente` VALUES (1,'Activo'),(2,'Inactivo');
/*!40000 ALTER TABLE `estado_ingrediente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingrediente_platos`
--

DROP TABLE IF EXISTS `ingrediente_platos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingrediente_platos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ingrediente_id` bigint DEFAULT NULL,
  `plato_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcjy2c38vqlti03w5ttbh4qkju` (`plato_id`),
  KEY `FKsapvxhmgrkq1q89d77t1ghkk3` (`ingrediente_id`),
  CONSTRAINT `FKcjy2c38vqlti03w5ttbh4qkju` FOREIGN KEY (`plato_id`) REFERENCES `platos` (`id`),
  CONSTRAINT `FKsapvxhmgrkq1q89d77t1ghkk3` FOREIGN KEY (`ingrediente_id`) REFERENCES `ingredientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingrediente_platos`
--

LOCK TABLES `ingrediente_platos` WRITE;
/*!40000 ALTER TABLE `ingrediente_platos` DISABLE KEYS */;
INSERT INTO `ingrediente_platos` VALUES (1,24,35),(2,24,34),(3,24,33),(4,24,32),(5,32,41),(6,12,41),(7,3,41),(8,32,38),(9,12,38),(10,3,38),(11,32,37),(12,12,37),(13,3,37),(14,32,39),(15,12,39),(16,3,39),(17,32,40),(18,12,40),(19,3,40),(20,3,47),(21,8,47),(22,12,47),(23,13,47),(24,24,47),(25,29,47),(26,3,50),(27,8,50),(28,12,50),(29,13,50),(30,24,50),(31,29,50),(32,12,42),(33,1,42),(34,17,42),(35,18,42),(36,28,42),(37,24,42),(38,7,43),(39,12,43),(40,17,43),(41,30,43),(42,23,43),(43,26,43),(44,31,43),(45,12,56),(46,17,56),(47,31,56),(48,32,56),(50,12,57),(51,17,57),(52,31,57),(53,32,57),(54,24,57),(55,12,60),(56,17,60),(57,31,60),(58,32,60),(59,12,61),(60,17,61),(61,31,61),(62,32,61),(63,27,61),(64,30,61),(65,3,48),(66,7,48),(67,29,48),(68,31,48),(69,34,48),(70,2,65),(71,3,65),(72,11,65),(73,18,65),(74,22,65),(75,34,65),(76,3,62),(77,4,67),(78,6,67),(79,12,67),(80,14,67),(81,18,67),(82,19,67),(83,20,67),(84,32,67),(85,4,66),(86,5,66),(87,10,66),(88,12,66),(89,14,66),(90,19,66),(91,25,66),(92,32,66),(93,33,66),(94,4,68),(95,6,68),(96,9,68),(97,12,68),(98,15,68),(99,16,68),(100,21,68),(101,25,68),(102,32,68),(103,33,68);
/*!40000 ALTER TABLE `ingrediente_platos` ENABLE KEYS */;
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
  `categoria_ingrediente_id` bigint DEFAULT NULL,
  `estado_ingrediente_id` bigint DEFAULT NULL,
  `imagen` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgo21c08m9ub4dar0p7w6q8tqd` (`alergia_id`),
  KEY `FKdeqk9h6v8747nu4uubxuo82e4` (`categoria_ingrediente_id`),
  KEY `FKhw5gaeltt7ytxk6o9i2pywlne` (`estado_ingrediente_id`),
  CONSTRAINT `FKdeqk9h6v8747nu4uubxuo82e4` FOREIGN KEY (`categoria_ingrediente_id`) REFERENCES `categoria_ingrediente` (`id`),
  CONSTRAINT `FKgo21c08m9ub4dar0p7w6q8tqd` FOREIGN KEY (`alergia_id`) REFERENCES `alergias` (`id`),
  CONSTRAINT `FKhw5gaeltt7ytxk6o9i2pywlne` FOREIGN KEY (`estado_ingrediente_id`) REFERENCES `estado_ingrediente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredientes`
--

LOCK TABLES `ingredientes` WRITE;
/*!40000 ALTER TABLE `ingredientes` DISABLE KEYS */;
INSERT INTO `ingredientes` VALUES (1,'Aceite de Oliva',3,7,1,'ajipanca.jpg'),(2,'Ají Panca',3,8,1,'ajipanca.jpg'),(3,'Ajo',7,1,1,'ajoplato.jpg'),(4,'Azúcar',3,11,1,'azucar.jpg'),(5,'Cacao en Polvo',8,10,1,'cacaopolvo.jpg'),(6,'Canela',3,8,1,'canela.jpg'),(7,'Cebolla',3,1,1,'cebolla.jpg'),(8,'Cebolla China',3,1,1,'cebollachina.jpg'),(9,'Chantilly',3,10,1,'chantilly.jpg'),(10,'Chocolate',8,10,1,'chocolate.jpg'),(11,'Comino',3,8,1,'comino.jpg'),(12,'Huevo',2,5,1,'huevo.jpg'),(13,'Kion',3,8,1,'kion.jpg'),(14,'Leche',1,4,1,'leche.jpg'),(15,'Leche Condensada',1,4,1,'lechecondensada.jpg'),(16,'Leche Evaporada',1,4,1,'lecheevaporada.jpg'),(17,'Lechuga',3,1,1,'lechuga.jpg'),(18,'Limón',3,2,1,'limon.jpg'),(19,'Mantequilla',1,7,1,'mantequilla.jpg'),(20,'Manzana',3,2,1,'manzana.jpg'),(21,'Nata',1,4,1,'nata.jpg'),(22,'Orégano',3,8,1,'oregano.jpg'),(23,'Palta',3,2,1,'palta.jpg'),(24,'Pollo',3,3,1,'pollo.jpg'),(25,'Polvo de Hornear',3,10,1,'polvohornear.jpg'),(26,'Queso Azul',1,4,1,'quesoazul.jpg'),(27,'Queso Chédar',1,4,1,'quesochedar.jpg'),(28,'Queso Parmesano',1,4,1,'quesoparmesano.jpg'),(29,'Sillao',5,9,1,'sillao.jpg'),(30,'Tocino',3,3,1,'tocino.jpg'),(31,'Tomate',3,1,1,'tomate.jpg'),(32,'Trigo',4,6,1,'trigo.jpg'),(33,'Vainilla',3,10,1,'vainilla.jpg'),(34,'Vinagre',3,9,1,'vinagre.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ofertas`
--

LOCK TABLES `ofertas` WRITE;
/*!40000 ALTER TABLE `ofertas` DISABLE KEYS */;
INSERT INTO `ofertas` VALUES (1,3,'3L Inca Kola + 6 Piezas Broasters + 8 Piezas Broasters','SuperOferta',87.3,30),(2,3,'1L Chicha Morada + 6 Piezas Broasters + Ensalada de Frutas','SuperOfertaUno',84.8,60.5),(3,0,'Sin promoción','Sin promoción',0,0),(4,3,'3L Coca Cola + 10 Piezas Broasters + Papas Nativas Familiar','SuperOfertaDos',85.4,72),(5,5,'1L Limonada + 4 Piezas Broasters + Torta de Chocolate + 1/2 Pollo a la Brasa + Papas Fritas Personal','SuperOfertaTres',101.69999999999999,85),(6,3,'1/2 Pollo a la Brasa + Papas Nativas Mediana','SuperOfertaCuatro',59.9,40),(7,4,'1L Maracuyá + 1/4 Pollo a la Brasa + Arroz Chaufa + Papas Nativas Familiar','SuperOfertaCinco',80.8,55.5);
/*!40000 ALTER TABLE `ofertas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `estado_pedido` varchar(100) NOT NULL,
  `fecha_creacion` varchar(255) NOT NULL,
  `fecha_entrega` varchar(255) NOT NULL,
  `venta_id` bigint DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf1l88h2gky4nrxn6d7hi1td55` (`venta_id`),
  KEY `FK5g0es69v35nmkmpi8uewbphs2` (`usuario_id`),
  CONSTRAINT `FK5g0es69v35nmkmpi8uewbphs2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `FKf1l88h2gky4nrxn6d7hi1td55` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'Pendiente','5/6/2026, 13:48:50','',20,NULL,NULL,NULL),(2,'Pendiente','5/6/2026, 13:48:50','',21,NULL,NULL,NULL),(3,'Pendiente','5/6/2026, 14:40:14','',22,NULL,NULL,NULL),(4,'Pendiente','5/6/2026, 14:48:21','',23,NULL,NULL,NULL),(5,'Pendiente','5/6/2026, 15:12:54','',24,NULL,NULL,NULL),(6,'Pendiente','5/6/2026, 19:21:32','',25,NULL,NULL,NULL),(7,'Pendiente','6/6/2026, 10:11:03','',26,NULL,NULL,NULL),(8,'Pendiente','6/6/2026, 11:23:09','',27,NULL,NULL,NULL),(9,'Pendiente','6/6/2026, 13:00:12','',28,NULL,NULL,NULL),(10,'Pendiente','6/6/2026, 16:48:50','',29,NULL,NULL,NULL),(11,'Pendiente','7/6/2026, 17:32:22','',30,NULL,NULL,NULL),(12,'Pendiente','7/6/2026, 17:35:10','',31,NULL,NULL,NULL),(13,'Pendiente','7/6/2026, 17:48:31','',32,NULL,NULL,NULL),(14,'Pendiente','7/6/2026, 20:01:11','',33,NULL,NULL,NULL),(15,'Pendiente','7/6/2026, 20:20:57','',34,NULL,NULL,NULL),(16,'Pendiente','8/6/2026, 09:56:56','',35,NULL,NULL,NULL),(17,'Pendiente','8/6/2026, 10:11:44','',36,NULL,NULL,NULL),(18,'Pendiente','8/6/2026, 10:33:32','',37,NULL,NULL,NULL),(19,'Pendiente','8/6/2026, 11:09:12','',38,NULL,NULL,NULL),(20,'Pendiente','8/6/2026, 11:22:53','',39,NULL,NULL,NULL),(21,'Pendiente','9/6/2026, 12:32:45','',40,NULL,NULL,NULL),(22,'Pendiente','9/6/2026, 12:35:10','',41,NULL,NULL,NULL),(23,'Pendiente','9/6/2026, 13:48:31','',42,NULL,NULL,NULL),(24,'Pendiente','9/6/2026, 13:59:11','',43,NULL,NULL,NULL),(25,'Pendiente','9/6/2026, 15:12:33','',44,NULL,NULL,NULL),(26,'Pendiente','9/6/2026, 18:20:41','',45,NULL,NULL,NULL),(27,'Pendiente','9/6/2026, 18:29:02','',46,NULL,NULL,NULL),(28,'Pendiente','9/6/2026, 19:31:30','',47,NULL,NULL,NULL),(29,'Pendiente','10/6/2026, 12:32:45','',48,NULL,NULL,NULL),(30,'Pendiente','10/6/2026, 14:11:10','',49,NULL,NULL,NULL),(31,'Pendiente','10/6/2026, 17:04:45','',50,NULL,NULL,NULL),(32,'Pendiente','10/6/2026, 17:40:55','',51,NULL,NULL,NULL),(33,'Pendiente','10/6/2026, 20:13:13','',52,NULL,NULL,NULL),(34,'Pendiente','11/6/2026, 12:32:45','',53,NULL,NULL,NULL),(35,'Pendiente','11/6/2026, 13:11:49','',54,NULL,NULL,NULL),(36,'Listo','12/6/2026, 21:03:09','13/6/2026, 21:47:21',55,NULL,16,'nombre.apellido@gmail.com'),(37,'Listo','11/6/2026, 19:10:31','12/6/2026, 21:00:44',56,NULL,16,'nombre.apellido@gmail.com'),(38,'Listo','12/6/2026, 20:22:17','12/6/2026, 20:51:24',57,NULL,16,'nombre.apellido@gmail.com'),(39,'Preparando','15/6/2026, 00:31:09','12/6/2026, 21:00:41',58,'Sin observación',16,'nombre.apellido@gmail.com'),(40,'Pendiente','13/6/2026, 18:02:11','',60,'Algo mas',16,'nombre.apellido@gmail.com'),(41,'Preparando','14/6/2026, 23:15:05','',61,'No quiero esto',16,'nombre.apellido@gmail.com'),(42,'Listo','14/6/2026, 01:29:29','14/6/2026, 01:29:33',62,'Más papas',16,'nombre.apellido@gmail.com'),(43,'Listo','14/6/2026, 18:09:37','14/6/2026, 18:10:44',63,'',16,'nombre.apellido@gmail.com'),(44,'Pendiente','16/6/2026, 02:16:24','16/6/2026, 02:16:24',69,'Sin observación',8,'admin@gmail.com');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (6,'ROLE_USER'),(10,'ROLE_ADMIN'),(13,'ROLE_COCINERO');
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
INSERT INTO `usuario_rol` VALUES (8,10),(9,6),(10,6),(11,6),(13,6),(14,6),(16,13);
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
INSERT INTO `usuarios` VALUES (8,'Lope','Manuel','$2a$10$ZdgYlDzXXeg5yqrt5j/ARuH18Imo0NbZgQixdSmopfd/8z/Qe.Qge',10,'Av.Los Jardines','987654321','admin@gmail.com',1),(9,'Perez','Juan','$2a$10$CFJJKU37OKlfkwxgoM25Bem8jd6oDQg7Ru7obR5Y6ciRrE9yvxHs2',NULL,'Av. Direccion Falsa 123','941231534','juan.perez@gmail.com',6),(10,'Alvarez','Octavio','$2a$10$4jfTt4uW4Mr8ZR3rzp69O.X5rS5lRlpdGGer2C7/ZXQzcYKYlEC7O',NULL,'Av. Calle Verdadera 323','942123464','octavio.alvarez@gmail.com',7),(11,'Ramirez','Kenny','$2a$10$rezsPZJU89qC/CZtYRpLtOWdwCy.bmtWhsFhn4jQCYng/a4OAggai',NULL,'Av. Industrial 123','913123132','kenny.ramirez@gmail.com',1),(13,'Morales','Arturo','123456',6,'Av. Direccion Verdadera 433','943213453','arturo.morales@gmail.com',4),(14,'Fonsi','Luis','$2a$10$XULLa1VMum6DEY7tIZNrzOhNlL.8LYcsdP8XDfI/iSn4OgrkuRouK',NULL,'Av. Calle Falsa 544','964413541','luis.fonsi@gmail.com',8),(16,'Apellido','Nombre','$2a$10$nZqJcEuHs6Qjz8glTrTMc.a7yXDpXeBnog8sN5dVVrylMihP/cffG',NULL,'Direccion','975132132','nombre.apellido@gmail.com',4);
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (18,'18/5/2026, 23:43:17','Manuel','admin@gmail.com',2,8,1),(19,'18/5/2026, 23:56:31','Manuel','admin@gmail.com',2,8,1),(20,'5/6/2026, 13:48:50','Manuel','admin@gmail.com',2,8,1),(21,'5/6/2026, 13:48:50','Manuel','admin@gmail.com',1,8,1),(22,'5/6/2026, 14:40:14','Manuel','admin@gmail.com',3,8,1),(23,'5/6/2026, 14:48:21','Manuel','admin@gmail.com',1,8,1),(24,'5/6/2026, 15:12:54','Manuel','admin@gmail.com',2,8,1),(25,'5/6/2026, 19:21:32','Manuel','admin@gmail.com',3,8,1),(26,'6/6/2026, 10:11:03','Manuel','admin@gmail.com',2,8,1),(27,'6/6/2026, 11:23:09','Manuel','admin@gmail.com',1,8,1),(28,'6/6/2026, 13:00:12','Manuel','admin@gmail.com',3,8,1),(29,'6/6/2026, 16:48:50','Manuel','admin@gmail.com',3,8,1),(30,'7/6/2026, 17:32:22','Manuel','admin@gmail.com',3,8,1),(31,'7/6/2026, 17:35:10','Manuel','admin@gmail.com',2,8,1),(32,'7/6/2026, 17:48:31','Manuel','admin@gmail.com',3,8,1),(33,'7/6/2026, 20:01:11','Manuel','admin@gmail.com',3,8,1),(34,'7/6/2026, 20:20:57','Manuel','admin@gmail.com',3,8,1),(35,'8/6/2026, 09:56:56','Manuel','admin@gmail.com',1,8,1),(36,'8/6/2026, 10:11:44','Manuel','admin@gmail.com',3,8,1),(37,'8/6/2026, 10:33:32','Manuel','admin@gmail.com',3,8,1),(38,'8/6/2026, 11:09:12','Manuel','admin@gmail.com',1,8,1),(39,'8/6/2026, 11:22:53','Manuel','admin@gmail.com',1,8,1),(40,'9/6/2026, 12:32:45','Manuel','admin@gmail.com',2,8,1),(41,'9/6/2026, 12:35:10','Manuel','admin@gmail.com',3,8,1),(42,'9/6/2026, 13:48:31','Manuel','admin@gmail.com',3,8,1),(43,'9/6/2026, 13:59:11','Manuel','admin@gmail.com',1,8,1),(44,'9/6/2026, 15:12:33','Manuel','admin@gmail.com',2,8,1),(45,'9/6/2026, 18:20:41','Manuel','admin@gmail.com',2,8,1),(46,'9/6/2026, 18:29:02','Manuel','admin@gmail.com',3,8,1),(47,'9/6/2026, 19:31:30','Manuel','admin@gmail.com',1,8,1),(48,'10/6/2026, 12:32:45','Manuel','admin@gmail.com',2,8,1),(49,'10/6/2026, 14:11:10','Manuel','admin@gmail.com',2,8,1),(50,'10/6/2026, 17:04:45','Manuel','admin@gmail.com',1,8,1),(51,'10/6/2026, 17:40:55','Manuel','admin@gmail.com',3,8,1),(52,'10/6/2026, 20:13:13','Manuel','admin@gmail.com',3,8,1),(53,'11/6/2026, 12:32:45','Manuel','admin@gmail.com',2,8,1),(54,'11/6/2026, 13:11:49','Manuel','admin@gmail.com',3,8,1),(55,'11/6/2026, 16:00:10','Manuel','admin@gmail.com',1,8,1),(56,'11/6/2026, 19:10:31','Manuel','admin@gmail.com',1,8,1),(57,'11/6/2026, 21:47:33','Manuel','admin@gmail.com',2,8,1),(58,'11/6/2026, 22:50:26','Manuel','admin@gmail.com',2,8,1),(59,'13/6/2026, 17:56:47','Nombre','nombre.apellido@gmail.com',2,16,4),(60,'13/6/2026, 18:02:11','Nombre','nombre.apellido@gmail.com',1,16,4),(61,'13/6/2026, 19:36:46','Nombre','nombre.apellido@gmail.com',1,16,4),(62,'13/6/2026, 20:59:39','Manuel','admin@gmail.com',3,8,1),(63,'14/6/2026, 00:04:52','Nombre','nombre.apellido@gmail.com',2,16,4),(64,'16/6/2026, 02:10:23','Manuel','admin@gmail.com',2,8,1),(65,'16/6/2026, 02:11:51','Manuel','admin@gmail.com',3,8,1),(66,'16/6/2026, 02:14:18','Manuel','admin@gmail.com',3,8,1),(67,'16/6/2026, 02:14:59','Manuel','admin@gmail.com',1,8,1),(68,'16/6/2026, 02:15:20','Manuel','admin@gmail.com',3,8,1),(69,'16/6/2026, 02:16:14','Manuel','admin@gmail.com',3,8,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonas`
--

LOCK TABLES `zonas` WRITE;
/*!40000 ALTER TABLE `zonas` DISABLE KEYS */;
INSERT INTO `zonas` VALUES (1,'Lima','SJL','San Juan de Lurigancho','Lima'),(4,'LaLibertad','sadasda','asdasd','Otuzco'),(5,'Callao','Distrito3','Zona3','Callao'),(6,'Cusco','Distrito4','Zona4','Paruro'),(7,'Ica','Distrito5','Zona5','Nazca'),(8,'Lima','Distrito6','Zona6','Lima');
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

-- Dump completed on 2026-06-16  3:41:58
