import pyttsx3

engine = pyttsx3.init()

voices = engine.getProperty("voices")

print("Available voices:")

for i, voice in enumerate(voices):
    print(i, voice.name)

# Use the first voice
engine.setProperty("voice", voices[0].id)

engine.setProperty("volume", 1.0)
engine.setProperty("rate", 150)

engine.say("Hello. This is a voice test.")
engine.runAndWait()

print("Finished.")