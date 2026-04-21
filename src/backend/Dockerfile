FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .

WORKDIR /app/src/backend
RUN mvn clean package -Dmaven.test.skip=true

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

COPY --from=build /app/src/backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
