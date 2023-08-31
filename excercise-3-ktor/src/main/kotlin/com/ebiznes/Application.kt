import com.ebiznes.models.DiscordMessageData
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.websocket.*
import io.ktor.http.ContentType.Application.Json
import io.ktor.websocket.*
import kotlinx.coroutines.runBlocking
import com.google.gson.JsonElement
import com.google.gson.JsonParser
import com.google.gson.Gson
import io.github.cdimascio.dotenv.dotenv
import io.ktor.http.*
import kotlinx.coroutines.channels.ClosedReceiveChannelException
import kotlinx.coroutines.delay



fun main() {
    val client = HttpClient(CIO).config { install(WebSockets) }

    val dotenv = dotenv()
    val gson = Gson()

    val token = dotenv["DISCORD_TOKEN"]
    val botToken = dotenv["DISCORD_BOT_TOKEN"]
    val channelId = "1097227487102107663"
    val bot = 1097249901643055107

    val availableFoodCategories = arrayOf("pizza", "burgery", "steki", "sałatki", "owoce morza")

    runBlocking {
        while (true) {
            try {
                val socket = client.webSocket(
                    "wss://gateway.discord.gg/?v=10&encoding=json"
                ) {
                    val identifyPayload = """
                        {
                            "op": 2,
                            "d": {
                                "token": "$token",
                                "properties": {}
                            }
                        }
                    """.trimIndent()

                    send(identifyPayload)

                    while (true) {
                        val frame = incoming.receive()
                        if (frame is Frame.Text) {
                            val text = frame.readText()
                            val jsonObject = JsonParser.parseString(text).asJsonObject
                            val op = jsonObject.get("op").asInt

                            val eventData: JsonElement = jsonObject.get("d")

                            when {
                                eventData.isJsonObject -> {
                                    val discordMessageData = gson.fromJson(eventData, DiscordMessageData::class.java)
                                    val content = discordMessageData.content
                                    val authorId = discordMessageData.author?.id

                                    if (content !== null && authorId !== null) {
                                        println("Wiadomosc: $content")

                                        if (authorId != bot) {
                                            var responseMessage: String
                                            val containsKeyword = listOf("menu", "jedzenie", "jakie jedzenie", "kategorie")
                                                .any { keyword -> content.contains(keyword, ignoreCase = true) }

                                            responseMessage = if (containsKeyword) {
                                                val categoriesString = availableFoodCategories.joinToString(", ")
                                                "Dostępne kategorie jedzeniowe: $categoriesString"
                                            } else {
                                                "Witaj, jak sie masz? Możesz mnie zapytać o menu jakie mam?"
                                            }

                                            val body = """
                                                        {
                                                            "content": "$responseMessage"
                                                        }
                                                    """

                                            client.request("https://discord.com/api/v10/channels/$channelId/messages") {
                                                method = HttpMethod.Post
                                                header("Authorization", "Bot $botToken")
                                                contentType(Json)
                                                setBody(body)
                                            }
                                        }
                                    }
                                }

                                else -> {
                                    continue
                                }
                            }
                        }
                    }
                }
            } catch (e: ClosedReceiveChannelException) {
                println("Połączenie zostało zamknięte, próba ponownego połączenia...")
            }

            delay(5000)
        }

    }


}