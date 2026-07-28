import os
import webbrowser
import subprocess
from datetime import datetime

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def ask_ai(message: str):
    command = message.lower().strip()

    # =========================
    # Local Commands
    # =========================

    # Time
    if "time" in command:
        return f"The current time is {datetime.now().strftime('%I:%M %p')}."

    # Date
    if "date" in command:
        return f"Today is {datetime.now().strftime('%A, %d %B %Y')}."

    # Open YouTube
    if "open youtube" in command:
        webbrowser.open("https://www.youtube.com")
        return "Opening YouTube now."

    # Open Google
    if "open google" in command:
        webbrowser.open("https://www.google.com")
        return "Opening Google now."

    # Open GitHub
    if "open github" in command:
        webbrowser.open("https://github.com")
        return "Opening GitHub now."

    # Open Calculator (Windows)
    if "open calculator" in command:
        subprocess.Popen("calc.exe")
        return "Opening Calculator."

    # Open Notepad (Windows)
    if "open notepad" in command:
        subprocess.Popen("notepad.exe")
        return "Opening Notepad."

    # =========================
    # AI Response
    # =========================

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