import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("❌ GOOGLE_API_KEY not found in .env")
os.environ["GOOGLE_API_KEY"] = api_key

app = FastAPI(title="Lesson Plan Chatbot API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.5)

user_memory = {}

base_system_template = """
You are a **Lesson Plan Compliance Checker Assistant**.
Your tasks:
- Help teachers create, review, and improve lesson plans.
- Provide guidance on educational design, curriculum alignment, and classroom strategies.
- If the user asks something unrelated to lesson planning, subjects, grades, or educational improvement,
  respond strictly with: "Sorry, I can only help with Lesson Plan Compliance Checker."
- Always provide a complete, and structured answer.
- Maintain the context of the conversation.
- If prompted to guide through the website, explain your capabilities clearly.
- If user asks for examples, generate a random lesson plan.
- Keep the response to the point unless the user requests detail.

Conversation so far:
{chat_history}

User: {user_input}
Assistant:
"""

def unified_chat(user_input: str, user_id: str = None, detail_mode: str = "concise"):
    try:
        if user_id not in user_memory:
            user_memory[user_id] = ConversationBufferMemory(
                memory_key="chat_history", input_key="user_input"
            )
        memory = user_memory[user_id]

        chat_history = memory.load_memory_variables({}).get("chat_history", "")
        prompt_text = base_system_template.format(
            chat_history=chat_history, user_input=user_input
        )

        prompt = ChatPromptTemplate.from_template(prompt_text)
        chain = LLMChain(llm=llm, prompt=prompt, memory=memory, verbose=False)

        response = chain.run(user_input=user_input)
        return response.strip()

    except Exception as e:
        if "quota" in str(e).lower() or "429" in str(e):
            return "⚠️ Google Gemini API quota exceeded. Please check your API key or wait a minute."
        return f"❌ Error: {str(e)}"

class ChatRequest(BaseModel):
    user_input: str
    user_id: str | None = None
    detail_mode: str = "concise"

@app.post("/chat")
def chat(req: ChatRequest):
    """
    Unified Lesson Plan Chatbot Endpoint
    Handles lesson creation, compliance checks, and educational questions.
    """
    if not req.user_input.strip():
        raise HTTPException(status_code=400, detail="User input cannot be empty")

    reply = unified_chat(req.user_input, req.user_id, req.detail_mode)
    return {"reply": reply}

@app.get("/")
def root():
    return {"status": "Lesson Plan Chatbot API running 🚀 (User-context mode enabled)"}
