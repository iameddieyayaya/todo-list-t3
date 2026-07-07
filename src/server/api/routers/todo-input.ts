import { z } from "zod";

export const todoIdSchema = z.number().int().positive();
export const todoStatusSchema = z.enum([
  "backlog",
  "in_progress",
  "completed",
]);

export const todoTextSchema = z
  .string()
  .trim()
  .min(1, "Todo text cannot be empty.")
  .max(280, "Todo text must be 280 characters or fewer.");
