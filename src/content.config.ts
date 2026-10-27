import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const webUrl = z
  .url()
  .refine((value) => /^https?:\/\//i.test(value), "Use um link começando com http:// ou https://.");

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    year: z.coerce.number().int().optional(),
    role: z.string().optional(),
    cover: z.string().optional(),
    cover_alt: z.string().optional(),
    challenge: z.string().optional(),
    decisions: z.string().optional(),
    outcome: z.string().optional(),
    technologies: z.string().optional(),
    live_url: webUrl.optional(),
    source_url: webUrl.optional(),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
  }),
});

const certificates = defineCollection({
  loader: glob({ base: "./src/content/certificates", pattern: "**/*.yaml" }),
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    issued_at: z.string().optional(),
    verification_url: webUrl.optional(),
    attachment: z.string().optional(),
    published: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ base: "./src/content/services", pattern: "**/*.yaml" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["web", "design", "analytics", "maintenance"]),
    description: z.string(),
    price: z.string(),
    published: z.boolean().default(true),
    order: z.coerce.number().int().default(100),
  }),
});

const products = defineCollection({
  loader: glob({ base: "./src/content/products", pattern: "**/*.yaml" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    cover: z.string().optional(),
    cover_alt: z.string().optional(),
    price: z.string().optional(),
    purchase_url: webUrl.optional(),
    published: z.boolean().default(false),
    order: z.coerce.number().int().default(100),
  }),
});

const site = defineCollection({
  loader: glob({ base: "./src/content/site", pattern: "*.yaml" }),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    tagline: z.string(),
    headline: z.string(),
    introduction: z.string(),
    email: z.email(),
    whatsapp: z.string(),
    github: webUrl,
    linkedin: webUrl,
    instagram: webUrl,
    tiktok: webUrl.optional(),
    resume: z.string().optional(),
    seo_description: z.string(),
    footer_note: z.string(),
  }),
});

export const collections = {
  certificates,
  products,
  projects,
  services,
  site,
};
