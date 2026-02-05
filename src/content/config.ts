import { defineCollection, z } from "astro:content";

export const postSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()),
  published: z.date(),
  updated: z.date().optional(),
  director: z.string().optional(),
});

export const readingSchema = z.object({
  title: z.string(),
  type: z.enum(["book", "manga", "web-novel"]),
  link: z.string().optional(),
  description: z.string().optional(),
  published: z.date(),
  updated: z.date().optional(),
});

const posts = defineCollection({
  type: "content",
  schema: postSchema,
});

const reading = defineCollection({
  type: "content",
  schema: readingSchema,
});

export const collections = {
  posts,
  reading,
};
