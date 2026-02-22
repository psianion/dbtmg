import { z } from "zod";

export const boardMemberSchema = z.object({
  rank: z
    .number({ required_error: "Rank is required" })
    .int()
    .min(1, "Rank must be at least 1"),

  name: z.string().min(1, "Name is required"),

  designation: z.string().min(1, "Designation is required"),

  category: z.string().min(1, "Category is required"),

  shortBiography: z
    .string()
    .min(20, "Biography should be at least 20 characters"),

  profileImage: z.string().min(1, "Profile image is required"),
});

export type BoardMemberFormValues = z.infer<typeof boardMemberSchema>;
