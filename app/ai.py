import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_ai(message: str):
    response = client.chat.completions.create(
        model="gpt-5-nano",
        messages=[
            {
                "role": "system",
                "content": """
You are a friendly Voice AI Assistant.

Rules:
- Keep answers short (2-4 sentences).
- Speak naturally like a real assistant.
- Give direct answers.
- If the user asks for more details, then explain further.
"""
            },
            {
                "role": "user",
                "content": message
            }
        ]
    )

    return response.choices[0].message.content