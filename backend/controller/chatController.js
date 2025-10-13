export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    // Use global fetch when available (Node 18+). Otherwise dynamically import node-fetch.
    const fetchFn = globalThis.fetch ?? (await import('node-fetch').then(m => m.default));

    const response = await fetchFn("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_input: message, detail_mode: "concise" }),
    });

    // If the remote service returned a non-2xx status, include details
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: "Chatbot service error", status: response.status, detail: text });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    // Surface the underlying error message to aid debugging
    return res.status(502).json({ error: "Chatbot service unavailable", message: error.message });
  }
};
