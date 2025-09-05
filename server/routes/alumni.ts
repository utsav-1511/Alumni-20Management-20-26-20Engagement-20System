import { RequestHandler } from "express";
import { prisma } from "../prisma";

export const listAlumni: RequestHandler = async (req, res) => {
  const all = await prisma.alumni.findMany({ orderBy: { createdAt: "desc" } });
  res.json(all);
};

export const createAlumni: RequestHandler = async (req, res) => {
  const { name, avatar, batch, company, role } = req.body;
  const a = await prisma.alumni.create({ data: { name, avatar, batch, company, role } });
  res.json(a);
};

export const getAlumni: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const a = await prisma.alumni.findUnique({ where: { id } });
  if (!a) return res.status(404).json({ error: "Not found" });
  res.json(a);
};

export const updateAlumni: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const a = await prisma.alumni.update({ where: { id }, data });
  res.json(a);
};

export const deleteAlumni: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await prisma.alumni.delete({ where: { id } });
  res.json({ ok: true });
};
