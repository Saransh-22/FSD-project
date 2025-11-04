import ChatHistory from "../models/chatHistory.js";

// 🧠 Handle chat with bot
export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?._id;

    if (!message) return res.status(400).json({ error: "Message is required" });
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const fetchFn = globalThis.fetch ?? (await import("node-fetch").then((m) => m.default));

    // Send message to your FastAPI chatbot
    const response = await fetchFn("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_input: message,
        detail_mode: "concise",
        user_id: userId.toString(),
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: "Chatbot service error",
        detail: text,
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Chat error:", error);
    res.status(502).json({ error: "Chatbot service unavailable", message: error.message });
  }
};

// 💾 Save selected chat manually
export const saveChatManually = async (req, res) => {
  try {
    const { message, reply } = req.body;
    const userId = req.user?._id;

    if (!message || !reply)
      return res.status(400).json({ error: "Message and reply are required" });

    await ChatHistory.create({ user: userId, message, reply });
    res.json({ success: true, message: "Chat saved successfully" });
  } catch (err) {
    console.error("Save chat error:", err);
    res.status(500).json({ error: "Failed to save chat" });
  }
};

// 📜 Get user's chat history
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await ChatHistory.find({ user: userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};
