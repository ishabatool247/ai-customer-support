import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA


BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")


qa_chain = None


def get_qa_chain():
    global qa_chain

    if qa_chain is None:
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        vectorstore = Chroma(
            persist_directory=str(BASE_DIR / "chroma_db"),
            embedding_function=embeddings
        )

        retriever = vectorstore.as_retriever(
            search_kwargs={"k": 3}
        )

        llm = ChatGroq(
            model="openai/gpt-oss-20b",
            temperature=0,
            api_key=os.getenv("GROQ_API_KEY")
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            return_source_documents=False
        )

    return qa_chain


def ask_ai(question: str):
    try:
        chain = get_qa_chain()

        response = chain.invoke(
            {
                "query": question
            }
        )

        return response["result"]

    except Exception as e:
        return f"Error: {str(e)}"