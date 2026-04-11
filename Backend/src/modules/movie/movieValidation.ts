import {z} from 'zod'

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  genre: z.array(z.string().min(1)).min(1, "At least one genre required"),
  releaseDate: z.coerce.date(),
  languages: z.array(z.string().min(1)).min(1, "At least one language required"),
  certification: z.string().min(1, "Certification is required"),
  posterUrl: z.string().url("Invalid URL"),
  rating: z.number().min(0).max(10),
  votes: z.number().min(0),
  format: z.array(z.string()).default(["2D"])
});

export type MovieInput = z.infer<typeof movieSchema>;