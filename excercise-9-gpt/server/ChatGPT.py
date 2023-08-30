import openai
from dotenv import load_dotenv
import os

load_dotenv()


class ChatGPT:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")

    def generate_response(self, messages):
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=messages,
            max_tokens=550
        )

        return response["choices"][0]["message"]["content"]
