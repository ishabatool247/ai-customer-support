from chatbot import ask_ai

while True:
    question = input("You: ")

    if question == "exit":
        break

    answer = ask_ai(question)

    print("AI:", answer)