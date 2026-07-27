import asyncio
import edge_tts
import os

TEXT = "Hello Isha. I am your AI assistant."

VOICE = "en-US-AriaNeural"

async def speak():
    communicate = edge_tts.Communicate(TEXT, VOICE)
    await communicate.save("voice.mp3")

asyncio.run(speak())

os.system("start voice.mp3")