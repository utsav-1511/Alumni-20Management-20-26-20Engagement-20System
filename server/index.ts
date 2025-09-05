import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export async function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  try {
    // Auth
    const { register, login, logout } = await import("./routes/auth");
    app.post("/api/auth/register", register);
    app.post("/api/auth/login", login);
    app.post("/api/auth/logout", logout);
    console.log("Mounted auth routes: /api/auth/(register|login|logout)");

    // Protected routes
    const { requireAuth } = await import("./middleware/auth");

    // Alumni
    const alumni = await import("./routes/alumni");
    app.get("/api/alumni", alumni.listAlumni);
    app.post("/api/alumni", requireAuth, alumni.createAlumni);
    app.get("/api/alumni/:id", alumni.getAlumni);
    app.put("/api/alumni/:id", requireAuth, alumni.updateAlumni);
    app.delete("/api/alumni/:id", requireAuth, alumni.deleteAlumni);
    console.log("Mounted alumni routes");

    // Events
    const events = await import("./routes/events");
    app.get("/api/events", events.listEvents);
    app.post("/api/events", requireAuth, events.createEvent);
    app.get("/api/events/:id", events.getEvent);
    app.put("/api/events/:id", requireAuth, events.updateEvent);
    app.delete("/api/events/:id", requireAuth, events.deleteEvent);
    console.log("Mounted events routes");

    // Forum
    const forum = await import("./routes/forum");
    app.get("/api/forum/posts", forum.listPosts);
    app.post("/api/forum/posts", requireAuth, forum.createPost);
    app.get("/api/forum/posts/:id", forum.getPost);
    app.delete("/api/forum/posts/:id", requireAuth, forum.deletePost);
    console.log("Mounted forum routes");
  } catch (err) {
    console.error("Error mounting routes:", err);
    const msg = (err && (err as any).message) || "Internal server error while mounting routes";

    // Fallback auth endpoints
    app.post("/api/auth/register", (_req, res) => {
      res.status(500).json({ error: `Auth routes unavailable: ${msg}` });
    });
    app.post("/api/auth/login", (_req, res) => {
      res.status(500).json({ error: `Auth routes unavailable: ${msg}` });
    });
    app.post("/api/auth/logout", (_req, res) => {
      res.status(500).json({ error: `Auth routes unavailable: ${msg}` });
    });

    // Fallback public endpoints
    app.get("/api/alumni", (_req, res) => res.status(500).json({ error: `Alumni routes unavailable: ${msg}` }));
    app.get("/api/events", (_req, res) => res.status(500).json({ error: `Events routes unavailable: ${msg}` }));
    app.get("/api/forum/posts", (_req, res) => res.status(500).json({ error: `Forum routes unavailable: ${msg}` }));
  }

  return app;
}
