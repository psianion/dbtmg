import { z } from "zod";

export const newsAwardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  date: z.string().min(1, "Date is required"),
  year: z.number().int().optional(),
  publication: z.string(),
  author: z.string(),
  itemType: z.string().min(1, "Type is required"),
  excerpt: z.string(),
  detailText: z.string(),
  images: z.array(z.string()),
  hyperlink: z.string(),
  featuredOnHomePage: z.boolean(),
});

export type NewsAwardFormValues = z.infer<typeof newsAwardSchema>;
