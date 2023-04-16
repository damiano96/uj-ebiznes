FROM ubuntu:22.04
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
    apt-get install -y software-properties-common wget && \
    add-apt-repository ppa:deadsnakes/ppa

# instalacja Pythona 3.8
RUN apt-get update && \
    apt-get install -y python3.8

# instalacja Javy 8 i Kotlina
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk kotlin

# instalacja Gradle'a
RUN wget -O gradle.zip https://services.gradle.org/distributions/gradle-7.3.3-bin.zip && \
    unzip gradle.zip -d /opt && \
    rm gradle.zip

ENV GRADLE_HOME=/opt/gradle-7.3.3
ENV PATH=$PATH:$GRADLE_HOME/bin

# Port aplikacji
EXPOSE 8080

# Dodanie paczki JDBC SQLite do projektu na Gradle
WORKDIR /app
COPY build.gradle /app/
RUN gradle dependencies

# Ustawienie strefy czasowej
ENV TZ=Europe/Warsaw

# Skopiowanie plików źródłowych
COPY src/ /app/src/

# Kompilacja aplikacji
RUN kotlinc src/Main.kt -include-runtime -d hello.jar

# Uruchomienie aplikacji
CMD ["java", "-jar", "hello.jar"]
