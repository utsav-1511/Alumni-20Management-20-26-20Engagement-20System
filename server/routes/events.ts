import { RequestHandler } from "express";
import { prisma } from "../prisma";

export const listEvents: RequestHandler = async (req, res) => {
  const all = await prisma.event.findMany({ orderBy: { createdAt: "desc" } });
  res.json(all);
};

export const createEvent: RequestHandler = async (req, res) => {
  const { title, date, location, cover } = req.body;
  const e = await prisma.event.create({
    data: { title, date, location, cover },
  });
  res.json(e);
};

export const getEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const e = await prisma.event.findUnique({ where: { id } });
  if (!e) return res.status(404).json({ error: "Not found" });
  res.json(e);
};

export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const e = await prisma.event.update({ where: { id }, data });
  res.json(e);
};

export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await prisma.event.delete({ where: { id } });
  res.json({ ok: true });
};
