import { RequestHandler } from "express";
import { prisma } from "../prisma";

export const listPosts: RequestHandler = async (req, res) => {
  const all = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  res.json(all);
};

export const createPost: RequestHandler = async (req, res) => {
  const { title, body, author } = req.body;
  const p = await prisma.post.create({ data: { title, body, author } });
  res.json(p);
};

export const getPost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const p = await prisma.post.findUnique({ where: { id } });
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
};

export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({ where: { id } });
  res.json({ ok: true });
};
