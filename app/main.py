from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.ai import ask_ai


app = FastAPI(
    title="AI Customer Support Agent",
    version="1.0.0"
)


# Allow Next.js frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "status": "online",
        "message": "AI Customer Support Agent API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    try:
        answer = ask_ai(request.message)

        return {
            "user": request.message,
            "ai": answer
        }

    except Exception as e:

        print("Error:", e)

        return {
            "user": request.message,
            "ai": "Sorry, I am unable to answer right now. Please try again."
        }