package com.ebiznes.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class DiscordMessageData(
    @SerialName("content") val content: String? = null,
    @SerialName("author") val author: Author? = null
)

@Serializable
data class Author(
    @SerialName("id") val id: Long
)