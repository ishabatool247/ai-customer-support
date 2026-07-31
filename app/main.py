from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

from chatbot import ask_ai


app = FastAPI(
    title="AI Customer Support Agent"
)


# Frontend files
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


class ChatRequest(BaseModel):
    message: str

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )

# Chat API
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