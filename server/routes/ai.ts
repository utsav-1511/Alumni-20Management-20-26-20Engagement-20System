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

    // Call Google Generative AI REST endpoint (Text Bison / Gemini family).
    // NOTE: Update model name if you want a specific Gemini variant. This uses the v1beta2 generateText endpoint.
    const endpoint = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;

    const payload = {
      prompt: {
        text: message,
      },
      // You can tweak temperature, max output tokens, safety settings here if supported.
      // These fields depend on the GenAI endpoint; adjust as needed for specific model.
    };

    const r = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("Google API error", r.status, txt);
      return res.status(502).json({ error: "Google API error", details: txt });
    }

    const data = await r.json();

    // The response shape may vary; try to extract text content safely.
    // For text-bison generateText, the result is available at data.candidates[0].output
    let reply = "";
    try {
      if (data?.candidates && data.candidates.length > 0) {
        reply = data.candidates[0].output || "";
      } else if (data?.results && data.results.length > 0) {
        // other response shape
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
