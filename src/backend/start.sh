#!/bin/sh
# start.sh: compila y ejecuta la app Spring Boot

# Compilar el proyecto con Maven
./mvnw clean package -DskipTests || mvn clean package -DskipTests

# Ejecutar el JAR generado
java -jar target/backend-0.0.1-SNAPSHOT.jar