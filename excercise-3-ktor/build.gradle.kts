
val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project

plugins {
    kotlin("jvm") version "1.9.10"
    id("io.ktor.plugin") version "2.3.3"
    kotlin("plugin.serialization") version "1.4.21"
}

group = "com.ebiznes"
version = "0.0.1"

application {
    mainClass.set("com.ebiznes.ApplicationKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()

}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm")
    implementation("io.ktor:ktor-server-websockets-jvm")
    implementation("io.ktor:ktor-server-cors-jvm")
    implementation("io.ktor:ktor-server-netty-jvm")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("io.ktor:ktor-client-cio:$ktor_version")
    implementation("io.ktor:ktor-client-core:$ktor_version")
    implementation("io.ktor:ktor-client-websockets:$ktor_version")
    implementation("io.ktor:ktor-client-json:$ktor_version")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-core:1.3.3")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.3")
    implementation("com.google.code.gson:gson:2.8.9")
    implementation("io.github.cdimascio:dotenv-kotlin:6.4.1")
    testImplementation("io.ktor:ktor-server-tests-jvm")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}
