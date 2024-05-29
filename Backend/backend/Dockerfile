FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
# ARG JAR_FILE
COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
# COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]