import { RequestHandler } from "express";
import { prisma } from "../prisma";

// Simple in-memory subscribers map: roomId -> array of response objects
const subscribers: Record<string, Set<any>> = {};

export const listRooms: RequestHandler = async (req, res) => {
  const rooms = await prisma.chatRoom.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(rooms);
};

export const createRoom: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const room = await prisma.chatRoom.create({ data: { name } });
  res.json(room);
};

export const listMessages: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const msgs = await prisma.message.findMany({ where: { roomId: id }, orderBy: { createdAt: 'asc' } });
  res.json(msgs);
};

export const postMessage: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params; // room id
    const { content, sender } = req.body;
    if (!content) return res.status(400).json({ error: 'Missing content' });
    const m = await prisma.message.create({ data: { content, sender: sender || 'Anonymous', roomId: id } });

    // Broadcast to SSE subscribers
    const set = subscribers[id];
    if (set) {
      const payload = JSON.stringify(m);
      set.forEach((r) => {
        try {
          r.write(`data: ${payload}\n\n`);
        } catch (e) {
          // ignore
        }
      });
    }

    res.json(m);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const subscribe: RequestHandler = async (req, res) => {
  const { id } = req.params; // room id
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders?.();

  if (!subscribers[id]) subscribers[id] = new Set();
  subscribers[id].add(res);

  // When client connects, send a comment
  res.write(': connected\n\n');

  req.on('close', () => {
    subscribers[id].delete(res);
  });
};
