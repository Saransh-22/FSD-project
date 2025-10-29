import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
os.environ["GOOGLE_API_KEY"] = api_key

app = FastAPI(title="Lesson Plan Chatbot API")

origins = [
    "http://localhost:5173",  # React dev port number
    "http://127.0.0.1:3000",  # for running python -m uvicorn app:app --reload --port 8000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.5)
memory = ConversationBufferMemory(memory_key="chat_history", input_key="user_input")

base_system_template = """
You are a **Lesson Plan Compliance Checker Assistant**.
Your tasks:
- Help create, review, and improve lesson plans.
- Give **{detail_mode}** suggestions.
- If someone asks about Subjects, Grade, or curriculum topics, give clear responses.
- If user asks something unrelated, reply:
  "Sorry, I can only help with Lesson Plan Compliance Checker."

Conversation so far:
{chat_history}

User: {user_input}
Assistant:
"""

def ask_chain(user_input, detail_mode="concise"):
    chat_history = memory.load_memory_variables({}).get("chat_history", "")
    prompt_text = base_system_template.format(
        detail_mode=detail_mode,
        chat_history=chat_history,
        user_input=user_input
    )
    prompt = ChatPromptTemplate.from_template(prompt_text)
    chain = LLMChain(llm=llm, prompt=prompt, memory=memory, verbose=False)
    response = chain.run(user_input=user_input)
    return truncate_response(response, detail_mode)

def truncate_response(response, detail_mode="concise", max_lines=6):
    if detail_mode == "detailed":
        return response.strip()
    lines = response.strip().split("\n")
    if len(lines) > max_lines:
        return "\n".join(lines[:max_lines]) + "\n..."
    return response.strip()

def suggest_starter_plan(subject, grade, detail="short"):
    mode = "detailed" if detail == "detailed" else "concise"
    query = f"Create a {detail} sample lesson plan for {subject} at Grade {grade} level."
    return ask_chain(query, detail_mode=mode)

def check_compliance(plan_text, detail="short"):
    mode = "detailed" if detail == "detailed" else "concise"
    query = f"Check this lesson plan for compliance ({detail} summary):\n{plan_text}"
    return ask_chain(query, detail_mode=mode)

class ChatRequest(BaseModel):
    user_input: str
    detail_mode: str = "concise"

class PlanRequest(BaseModel):
    subject: str
    grade: str
    detail: str = "short"

class ComplianceRequest(BaseModel):
    plan_text: str
    detail: str = "short"

# End Points

@app.post("/chat")
def chat(req: ChatRequest):
    return {"reply": ask_chain(req.user_input, req.detail_mode)}

@app.post("/starter-plan")
def starter(req: PlanRequest):
    return {"reply": suggest_starter_plan(req.subject, req.grade, req.detail)}

@app.post("/check-plan")
def check(req: ComplianceRequest):
    return {"reply": check_compliance(req.plan_text, req.detail)}

@app.get("/")
def root():
    return {"status": "Lesson Plan Chatbot API running 🚀"}
