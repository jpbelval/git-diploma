FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} backend.jar
ENTRYPOINT ["java","-jar","/backend.jar"]
