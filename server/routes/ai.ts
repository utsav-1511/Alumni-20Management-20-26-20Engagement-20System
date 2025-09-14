import { RequestHandler } from "express";

export const chat: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "GOOGLE_API_KEY not configured on server" });
    }

    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Missing message" });

    // Correct model name for Gemini Text Bison (v1beta2)
    const modelName = "models/text-bison-001:generateText";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta2/${modelName}?key=${apiKey}`;

    // Gemini expects the prompt to be an object with a "text" property
    const payload = {
      prompt: {
        text: message,
      },
      // Optional parameters
      temperature: 0.7,
      maxOutputTokens: 1024,
      // Add safety settings if desired
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If using OAuth tokens instead of API key, add Authorization header here:
        // Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google API error", response.status, errorText);
      return res.status(502).json({ error: "Google API error", details: errorText });
    }

    const data = await response.json();

    let reply = "";
    try {
      if (data?.candidates && data.candidates.length > 0) {
        reply = data.candidates[0].output || "";
      } else if (data?.results && data.results.length > 0) {
        reply = data.results.map((r: any) => r.output).join("\n") || "";
      } else if (typeof data?.output === "string") {
        reply = data.output;
      } else {
        reply = JSON.stringify(data);
      }
    } catch (e) {
      console.error("Failed to parse Google response", e, data);
      reply = JSON.stringify(data);
    }

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
