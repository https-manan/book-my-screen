import { z } from 'zod';

const seatSchema = z.object({
  number: z.number().int().positive(),
  status: z.enum(["AVAILABLE", "BOOKED", "BLOCKED"]).default("AVAILABLE"),
});

const seatRowSchema = z.object({
  row: z.string().min(1, "Row label is required"),
  type: z.enum(["NORMAL", "EXCLUSIVE", "PREMIUM"]),
  price: z.number().positive("Price must be greater than 0"),
  seats: z.array(seatSchema).min(1, "At least one seat required"),
});

export const showSchema = z.object({
  movie: z.string().min(1, "Movie ID is required"),
  theater: z.string().min(1, "Theater ID is required"),
  location: z.string().min(1, "Location is required"),
  format: z.enum(["2D", "3D", "IMAX", "PVR PXL"]),
  audioType: z.string().optional(),
  startTime: z.coerce.date(),
  date: z.coerce.date(),
  seatLayout: z.array(seatRowSchema).min(1, "Seat layout is required"),
});

export type ShowInput = z.infer<typeof showSchema>;