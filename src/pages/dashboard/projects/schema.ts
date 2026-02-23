import { z } from "zod";

export const projectSchema = z.object({
  rank: z.number().int().min(1, "Rank must be at least 1"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  city: z.string().min(1, "City is required"),
  area: z.number().optional(),
  area_text: z.string(),
  short_desc: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  is_signature: z.boolean(),
  location_lat: z.number().optional(),
  location_lon: z.number().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
