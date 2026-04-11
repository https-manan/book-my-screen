import { z } from "zod";

export const TheaterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  logo: z.string().url("Invalid logo URL"),
  city: z.string().min(1, "City is required"),  
  state: z.string().min(1, "State is required")
});
export type TheaterInput = z.infer<typeof TheaterSchema>;