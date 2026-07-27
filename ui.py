import os
import chainlit as cl
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@cl.on_chat_start
async def start():
    await cl.Message(
        content="""
# 🎤 Voice AI Assistant

Welcome!

Ask me anything.

Features:
✅ AI Chat
✅ OpenAI GPT
✅ Professional UI
"""
    ).send()


@cl.on_message
async def main(message: cl.Message):

    user_message = message.content

    try:
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=user_message
        )

        answer = response.output_text

    except Exception as e:
        answer = f"Error: {e}"

    await cl.Message(content=answer).send()