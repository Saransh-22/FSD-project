import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
os.environ["GOOGLE_API_KEY"] = api_key

# Initialize FastAPI app
app = FastAPI(title="Lesson Plan Chatbot API")

# CORS setup (for React frontend)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini model
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.5)
memory = ConversationBufferMemory(memory_key="chat_history", input_key="user_input")

# --- SYSTEM PROMPT ---
base_system_template = """
You are a **Lesson Plan Compliance Checker Assistant**.
Your tasks:
- Help teachers create, review, and improve lesson plans.
- Provide guidance on educational design, curriculum alignment, and classroom strategies.
- If the user asks something unrelated to lesson planning, subjects, grades, or educational improvement,
  respond strictly with: "Sorry, I can only help with Lesson Plan Compliance Checker."
- Always provide a complete, and structured answer (never shorten or omit content).
- If user tells to make it detailed or concise make it accordingly. But initially keep your response to the point and as per the user requirement.
- Maintain the context of the conversation.
-If some one ask about you tell that you are LessonPlan Bot

Conversation so far:
{chat_history}

User: {user_input}
Assistant:
"""

# --- MAIN CHAT FUNCTION ---
def unified_chat(user_input: str, detail_mode: str = "concise"):
    try:
        chat_history = memory.load_memory_variables({}).get("chat_history", "")
        prompt_text = base_system_template.format(
            chat_history=chat_history,
            user_input=user_input
        )

        prompt = ChatPromptTemplate.from_template(prompt_text)
        chain = LLMChain(llm=llm, prompt=prompt, memory=memory, verbose=False)

        # Run the conversation through Gemini
        response = chain.run(user_input=user_input)
        return response.strip()  # return full untruncated output

    except Exception as e:
        if "quota" in str(e).lower() or "429" in str(e):
            return "⚠️ Google Gemini API quota exceeded. Please check your API key or wait a minute."
        return f"❌ Error: {str(e)}"

# --- REQUEST MODEL ---
class ChatRequest(BaseModel):
    user_input: str
    detail_mode: str = "concise"

# --- ENDPOINTS ---
@app.post("/chat")
def chat(req: ChatRequest):
    """
    Unified Lesson Plan Chatbot Endpoint
    Handles lesson creation, compliance checks, and educational questions.
    """
    return {"reply": unified_chat(req.user_input, req.detail_mode)}

@app.get("/")
def root():
    return {"status": "Lesson Plan Chatbot API running 🚀 (Full Output Mode)"} 
