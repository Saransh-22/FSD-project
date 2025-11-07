# AI Lesson Plan Compliance Checker

A full-stack web application that helps educators analyze lesson plans for compliance with institutional and pedagogical standards using an AI-powered chatbot.

This repository contains three main parts:

- `my-app/` — React + Vite frontend (UI, pages, components)
- `backend/` — Node.js + Express API server (authentication, chat forwarding, DB)
- `chatbot/` — Python Flask service that runs the AI model and handles analysis requests

---

## Quick summary

Users can sign up and log in, submit lesson plans or ask questions in a conversational UI, and receive automated compliance feedback and improvement suggestions returned by the AI service. Authentication uses JWTs and MongoDB stores user and history data.

---

## Features

- Email/password signup & login (JWT authentication)
- Dashboard with activity tracking and saved lesson plans
- AI Chatbot interface for real-time compliance checking and suggestions
- Role field support for profile metadata
- Backend-first architecture for easy API extension and secure access to the AI service

---

## Architecture (high level)

- Frontend (React + Vite): `my-app/`
  - Routes: landing, signup, login, home, profile, chatbot
  - Uses Tailwind for styling and Axios (or a centralized API client) for requests

- Backend (Express): `backend/`
  - Routes: `/api/auth/*`, `/api/chat`
  - Controllers: authentication, chat forwarding
  - Models: user, lessonplan, chat history (MongoDB via Mongoose)

- Chatbot (Flask/Python): `chatbot/`
  - Single-purpose AI service that receives user input and returns analysis
  - Runs on a separate port (default: 8000) and is called by the backend

All services communicate through REST endpoints. Typical flow for chat:
Frontend -> Backend `/api/chat` -> Chatbot service `/chat` -> Backend -> Frontend

---

## Repository file overview

Top-level layout (abridged):

```
PROJECT_ROOT/
├─ backend/
│  ├─ controller/
│  ├─ routes/
│  ├─ models/
│  ├─ middleware/
│  ├─ config/
│  └─ server.js
├─ chatbot/
│  ├─ app.py
│  └─ req.txt
├─ my-app/
│  ├─ public/
│  └─ src/
│     ├─ pages/
│     ├─ components/
│     └─ services/
├─ DEMO_SCRIPT.md
├─ PROJECT_ARCHITECTURE.md
└─ README.md
```

Refer to `PROJECT_ARCHITECTURE.md` for diagrams and more detailed flows.

---

## Requirements

- Node.js (v18+ recommended)
- npm (or yarn)
- Python 3.10+ (for the chatbot)
- MongoDB (local or cloud URI)

---

## Environment variables (do not commit .env files)

Do NOT commit `.env` files into source control. This repo is configured to ignore `.env` files. Create local `.env` files on your machine when running services.

Below are the environment variables used by each service. Add them to local `.env` files (example name and keys only — do NOT store real secrets in the repo).

### Backend (`backend/.env`)
- MONGO_URI — MongoDB connection string (mongodb+srv://... or mongodb://...)
- JWT_SECRET — Secret for signing JWT tokens
- PORT — (optional) Express server port (default 5000)

### Frontend (`my-app/.env` for Vite)
- VITE_API_URL — Base API URL for the backend, e.g. `http://localhost:5000/api`

### Chatbot (`chatbot/.env`)
- GOOGLE_API_KEY — API key used by the chatbot service (if applicable)

Notes
- The repo intentionally does not contain `.env.example` files (per project settings). Please keep your local `.env` files private.
- For CI/CD or production, use the provider's secret store (GitHub Actions secrets, Azure Key Vault, AWS Secrets Manager, etc.).

---

## Setup & run (development)

Open a PowerShell terminal and follow these steps. Each service runs independently so you can start them in separate terminals.

### 1) Start MongoDB

If using a local MongoDB instance, ensure it is running. If you use a cloud MongoDB (Atlas), use the connection string in `MONGO_URI`.

### 2) Backend

```powershell
cd backend
npm install
# create a local .env with required variables (do not commit)
# example: create file backend\.env and add MONGO_URI and JWT_SECRET
npm run dev    # or npm start depending on package.json
```

The backend typically listens on port 5000 by default.

### 3) Chatbot (Python)

Open a new terminal and run the Python service:

```powershell
cd chatbot
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r req.txt
# create chatbot\.env with required keys (do not commit)
python app.py
```

The chatbot runs on port 8000 by default and must be reachable by the backend.

### 4) Frontend (React)

Open a third terminal and run the frontend:

```powershell
cd my-app
npm install
# create my-app\.env with VITE_API_URL (do not commit)
npm run dev
```

Open the URL shown by Vite (usually http://localhost:5173) and interact with the app.

---

## API Endpoints (important ones)

### Auth
- POST `/api/auth/signup` — body: { name, email, password, role? }
  - Creates a new user and returns a JWT + user data
- POST `/api/auth/login` — body: { email, password }
  - Returns JWT + user data on successful auth

### Chat
- POST `/api/chat` — body: { message }
  - Backend forwards to chatbot service and returns AI response

### Protected routes
- Routes that change user data or lesson plan storage require `Authorization: Bearer <token>` header

---

## Recommendations & Security

- Never commit `.env` or secrets. This repo already ignores `.env` files and any committed `.env` were removed.
- If you accidentally pushed secrets, rotate them immediately (change passwords/API keys) and consider rewriting history to remove the values using `git-filter-repo` or BFG.
- Use provider-managed secret stores in production and CI system secrets (GitHub Actions secrets, etc.).

---

## Troubleshooting

- "Backend can't reach chatbot": ensure Python service is running on the configured port (default 8000) and that backend uses the correct URL.
- "CORS errors": Check backend CORS configuration; in development, allow `http://localhost:5173`.
- "Missing env vars": check your local `.env` files and ensure they have the correct variable names.
- "Token/Authentication issues": ensure JWT_SECRET is the same across backend instances and tokens are being sent in Authorization headers.

---

## Optional: purge secrets from history (advanced)

If you need to remove a secret that was pushed to the repo history, use `git-filter-repo` (recommended) or `BFG`. These commands rewrite history and require force-pushing to remote and coordination with collaborators.

High-level steps (do not run lightly):

1. Backup your repo: `git clone --mirror <repo-url> repo-backup.git`
2. Use `git-filter-repo` to remove paths or values.
3. Force-push rewritten history: `git push --force --all` and `git push --force --tags`
4. Rotate the compromised secrets.

If you want help with this process, ask and I can prepare a safe runbook.

---

## Contributing

Contributions are welcome. Create a new branch from `development`, open a PR with a clear description, and add tests or screenshots when appropriate.

---

## Contact / Support

If you need help running the project or securing keys, provide details of the error and I can assist with targeted fixes.

---

## License

Specify your license here (e.g., MIT). If none provided, add one before publishing this repo publicly.
