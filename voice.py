import webbrowser
import pyautogui
import requests
import time
import webbrowser
import subprocess
import os
import whisper
import speech_recognition as sr
import pyttsx3
from dotenv import load_dotenv
from openai import OpenAI

from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
weather_api_key = os.getenv("OPENWEATHER_API_KEY")
def get_weather(city):
    if not weather_api_key:
        return "Weather API key is missing."

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={weather_api_key}&units=metric"
    )

    try:
        response = requests.get(url)
        data = response.json()

        if data.get("cod") != 200:
            return "I couldn't find that city."

        temp = data["main"]["temp"]
        desc = data["weather"][0]["description"]

        return f"The weather in {city} is {desc} with a temperature of {temp} degrees Celsius."

    except Exception:
        return "Sorry, I couldn't get the weather information."

if not api_key:
    print("ERROR: OPENAI_API_KEY not found in .env file")
    exit()

client = OpenAI(api_key=api_key)

# Conversation Memory
conversation = []
SYSTEM_PROMPT = {
    "role": "system",
    "content": (
        "You are a professional Voice AI Assistant. "
        "Reply clearly, briefly, and politely. "
        "Keep answers under 120 words unless the user asks for details."
    )
}

conversation.append(SYSTEM_PROMPT)
# Chat History File
CHAT_HISTORY_FILE = "chat_history.txt"

print("Loading Whisper model...")
whisper_model = whisper.load_model("base")

engine = pyttsx3.init()

recognizer = sr.Recognizer()
recognizer.energy_threshold = 300
recognizer.dynamic_energy_threshold = True
recognizer.pause_threshold = 0.8

engine.setProperty("rate", 170)
engine.setProperty("volume", 1.0)

voices = engine.getProperty("voices")
if len(voices) > 1:
    engine.setProperty("voice", voices[1].id)
else:
    engine.setProperty("voice", voices[0].id)
def speak(text):
    global engine

    print("AI:", text)

    engine.stop()
    engine.say(str(text))
    engine.runAndWait()

def open_application(command):
    command = command.lower().strip()

    apps = {
        "chrome": r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        "google chrome": r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        "notepad": "notepad.exe",
        "calculator": "calc.exe",
        "calc": "calc.exe",
        "paint": "mspaint.exe",
        "cmd": "cmd.exe",
        "command prompt": "cmd.exe",
        "explorer": "explorer.exe",
        "file explorer": "explorer.exe",
        "vscode": r"C:\Users\Admin\AppData\Local\Programs\Microsoft VS Code\Code.exe",
        "visual studio code": r"C:\Users\Admin\AppData\Local\Programs\Microsoft VS Code\Code.exe",
    }

    for app, path in apps.items():
        if app in command:
            try:
                subprocess.Popen(path)
                return f"Opening {app}."
            except Exception as e:
                return f"Unable to open {app}: {e}"

    return None

print("\n==============================")
print(" Voice AI Assistant Started")
print(" Say 'exit' or 'quit' to stop")
print("==============================\n")

def open_folder(command):
    command = command.lower().strip()

    folders = {
        "desktop": os.path.join(os.path.expanduser("~"), "Desktop"),
        "downloads": os.path.join(os.path.expanduser("~"), "Downloads"),
        "documents": os.path.join(os.path.expanduser("~"), "Documents"),
        "pictures": os.path.join(os.path.expanduser("~"), "Pictures"),
        "music": os.path.join(os.path.expanduser("~"), "Music"),
        "videos": os.path.join(os.path.expanduser("~"), "Videos"),
    }

    for name, path in folders.items():
        if f"open {name}" in command:
            try:
                os.startfile(path)
                return f"Opening {name}."
            except Exception as e:
                return f"Unable to open {name}: {e}"

    return None
    def get_weather(city):
     if not weather_api_key:
        return "Weather API key is missing."

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={weather_api_key}&units=metric"
    )

    try:
        response = requests.get(url)
        data = response.json()

        if data.get("cod") != 200:
            return "I couldn't find that city."

        temp = data["main"]["temp"]
        desc = data["weather"][0]["description"]

        return f"The weather in {city} is {desc} with a temperature of {temp} degrees Celsius."

    except Exception:
        return "Sorry, I couldn't get the weather information."

while True:
    try:
        with sr.Microphone() as source:
            print("Listening...")
            recognizer.adjust_for_ambient_noise(source, duration=0.2)

            audio = recognizer.listen(
                source,
                timeout=10,
                phrase_time_limit=20
            )

        with open("recording.wav", "wb") as f:
            f.write(audio.get_wav_data())

                # Change to "ur" if you speak Urdu
        result = whisper_model.transcribe(
            "recording.wav",
            language="en"
        )

        # Get recognized speech
        user_text = result["text"].strip()

        if not user_text:
            print("No speech detected.\n")
            continue

        print(f"\nYou: {user_text}")
        if user_text.lower() in [
        "exit",
         "quit",
         "goodbye",
         "bye",
         "stop assistant"
]:
         speak("Goodbye! Have a nice day.")
         print("Assistant stopped.")
         break

        # -----------------------------
        # Open Applications
        # -----------------------------
        app_response = open_application(user_text)

        if app_response:
            print(f"\nAI: {app_response}")
            speak(app_response)
            continue
        folder_response = open_folder(user_text)

        if folder_response:
            print(f"\nAI: {folder_response}")
            speak(folder_response)
            continue

                # -----------------------------
        # Open Websites
        # -----------------------------
        websites = {
            "google": "https://www.google.com",
            "youtube": "https://www.youtube.com",
            "facebook": "https://www.facebook.com",
            "instagram": "https://www.instagram.com",
            "gmail": "https://mail.google.com",
            "chatgpt": "https://chatgpt.com",
            "whatsapp": "https://web.whatsapp.com",
            "github": "https://github.com",
        }
        website_opened = False

        for name, url in websites.items():
         if f"open {name}" in user_text.lower():
          speak(f"Opening {name}")
          webbrowser.open(url)
          website_opened = True
          break

        if website_opened:
         continue
            

        # -----------------------------
        # Search YouTube
        # -----------------------------
        if user_text.lower().startswith("search youtube for"):
            query = user_text[19:].strip()
            from urllib.parse import quote
            speak(f"Searching YouTube for {query}")
            webbrowser.open(
            f"https://www.youtube.com/results?search_query={quote(query)}"
)
            continue

        
        # -----------------------------
        # Current Date
        # -----------------------------
        if "date" in user_text.lower():
            from datetime import datetime
            current_date = datetime.now().strftime("%d %B %Y")
            answer = f"Today's date is {current_date}."
            print(f"\nAI: {answer}")
            speak(answer)
            continue
        # -----------------------------
        # Search Google
        # -----------------------------
        if user_text.lower().startswith("search google for"):
            from urllib.parse import quote

            query = user_text[18:].strip()

            speak(f"Searching Google for {query}")

            webbrowser.open(
               f"https://www.google.com/search?q={quote(query)}"
    )

        continue
        # -----------------------------
        # Current Time
        # -----------------------------
        if "time" in user_text.lower():
            from datetime import datetime

            current_time = datetime.now().strftime("%I:%M %p")

            answer = f"The current time is {current_time}."

            print(f"\nAI: {answer}")
            speak(answer)
            continue
         # -----------------------------
        # Take Screenshot
        # -----------------------------
        if (
        "take screenshot" in user_text.lower()
         or "screenshot" in user_text.lower()
         or "screen shot" in user_text.lower()
         or "screen shoot" in user_text.lower()
):
          screenshot = pyautogui.screenshot()

          filename = f"screenshot_{int(time.time())}.png"

          screenshot.save(filename)

          answer = f"Screenshot saved as {filename}"

          print(f"\nAI: {answer}")
          speak(answer)
          continue
        if (
        "shutdown computer" in user_text.lower()
         or "shut down computer" in user_text.lower()
         or "shutdown pc" in user_text.lower()
         or "shut down pc" in user_text.lower()
         or "turn off computer" in user_text.lower()
):
         speak("Shutting down the computer in 10 seconds.")
         os.system(r"C:\Windows\System32\shutdown.exe /s /t 10")
         continue

        # -----------------------------
        # Cancel Shutdown
        # -----------------------------
        if "cancel shutdown" in user_text.lower():

         os.system(r"C:\Windows\System32\shutdown.exe /a")

         speak("Shutdown cancelled.")
         continue

        
        # Weather
        if user_text.lower().startswith("weather in"):

        # -----------------------------
        # Save User Message
        # -----------------------------
         with open(CHAT_HISTORY_FILE, "a", encoding="utf-8") as f:
           f.write(f"You: {user_text}\n")

        # Save conversation memory
        conversation.append({
            "role": "user",
            "content": user_text
        })

        # Keep memory size under control
        conversation = conversation[-30:]

        try:
            response = client.responses.create(
                model="gpt-4.1-mini",
                input=conversation
            )

            answer = response.output_text


            # Save AI response to memory
            conversation.append({
                "role": "assistant",
                "content": answer
            })

        except Exception as e:
            print("\nOpenAI Error:", e)
            continue

        print(f"\nAI: {answer}")

        # Save AI response to history
        with open(CHAT_HISTORY_FILE, "a", encoding="utf-8") as f:
            f.write(f"AI: {answer}\n")
            f.write("-" * 60 + "\n")

        speak(answer)

    except sr.WaitTimeoutError:
        print("No speech detected. Please speak again.\n")
        continue

    except KeyboardInterrupt:
        print("\nAssistant stopped.")
        break

    except Exception as e:
        print("\nError:", e)