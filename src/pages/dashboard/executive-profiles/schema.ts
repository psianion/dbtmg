import { z } from "zod";

export const executiveProfileSchema = z.object({
  rank: z.number().int().min(1, "Rank must be at least 1"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  designation: z.string().min(1, "Designation is required"),
  teamName: z.string().min(1, "Team is required"),
  shortDescription: z.string().min(1, "Description is required"),
  profileImage: z.string(),
});

export type ExecutiveProfileFormValues = z.infer<typeof executiveProfileSchema>;
