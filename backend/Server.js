const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const ai = new GoogleGenAI({});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Build conversation contents - only use the last message for generateContent
    // Gemini API returns the full conversation in the response
    const lastMessage = messages[messages.length - 1];
    const contents = [
      {
        role: lastMessage.role === "user" ? "user" : "model",
        parts: [{ text: lastMessage.content }],
      },
    ];

    // Use gemini-2.5-flash model
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    const reply = result.text;

    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error.message);
    console.error("Full error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to get response from AI" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
