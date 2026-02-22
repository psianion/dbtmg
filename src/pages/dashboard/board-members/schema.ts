import { z } from "zod";

export const boardMemberSchema = z.object({
  rank: z.number().int().min(1, "Rank must be at least 1"),
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  category: z.string().min(1, "Category is required"),
  shortBiography: z.string().min(1, "Biography is required"),
  profileImage: z.string(),
});

export type BoardMemberFormValues = z.infer<typeof boardMemberSchema>;
