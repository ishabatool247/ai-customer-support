import os
from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

load_dotenv()


# Load embeddings
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# Load existing Chroma database
vectorstore = Chroma(
    persist_directory="chroma_db",
    embedding_function=embeddings
)


# Retriever
retriever = vectorstore.as_retriever(
    search_kwargs={"k": 3}
)


# OpenAI model
llm = ChatOpenAI(
    model="gpt-4.1-mini",
    temperature=0,
    api_key=os.getenv("OPENAI_API_KEY")
)


# RAG chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=False
)


def ask_ai(question: str):

    try:
        response = qa_chain.invoke(
            {
                "query": question
            }
        )

        return response["result"]

    except Exception as e:
        return f"Error: {str(e)}"


# Test chatbot directly
if __name__ == "__main__":

    print("🤖 AI Customer Support Agent Started")

    while True:

        user = input("\nYou: ")

        if user.lower() in ["exit", "quit"]:
            break

        answer = ask_ai(user)

        print("\nAI:", answer)