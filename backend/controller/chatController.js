import ChatHistory from "../models/chatHistory.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?._id; // from protect middleware

    // Validate
    if (!message) return res.status(400).json({ error: "Message is required" });
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    // Use global fetch when available (Node 18+). Otherwise dynamically import node-fetch.
    const fetchFn = globalThis.fetch ?? (await import("node-fetch").then((m) => m.default));

    // Send to FastAPI
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
        status: response.status,
        detail: text,
      });
    }

    const data = await response.json();

    // Save to MongoDB
    await ChatHistory.create({
      user: userId,
      message,
      reply: data.reply,
    });

    return res.json(data);
  } catch (error) {
    return res.status(502).json({
      error: "Chatbot service unavailable",
      message: error.message,
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await ChatHistory.find({ user: userId }).sort({ createdAt: 1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};