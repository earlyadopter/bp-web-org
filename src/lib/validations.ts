import { z } from "zod";

export const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  countries: z
    .array(z.string())
    .min(1, "Please select at least one country"),
  languages: z.string().min(2, "Please list your languages"),
  interestedGuideIds: z.array(z.string()).optional(),
  proposeNewGuide: z.string().optional(),
  background: z
    .string()
    .min(50, "Please write at least 50 characters about your background")
    .max(2000, "Background must be 2000 characters or less"),
  markdownFamiliarity: z.enum(["none", "basic", "comfortable", "expert"], {
    error: "Please select your Markdown familiarity",
  }),
  githubFamiliarity: z.enum(["none", "basic", "comfortable", "expert"], {
    error: "Please select your GitHub familiarity",
  }),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
