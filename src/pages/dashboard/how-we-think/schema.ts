import { z } from "zod";

export const howWeThinkSchema = z.object({
  rank: z.number().int().min(1, "Rank must be at least 1"),
  slideName: z.string().min(1, "Slide name is required"),
  quote: z.string(),
  quoteAttribution: z.string(),
  description: z.string(),
  image: z.string(),
});

export type HowWeThinkFormValues = z.infer<typeof howWeThinkSchema>;
