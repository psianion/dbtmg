import { z } from "zod";

export const relationshipSchema = z.object({
  name: z.string().min(1, "Name is required"),
  images: z.array(z.string()),
});

export type RelationshipFormValues = z.infer<typeof relationshipSchema>;
