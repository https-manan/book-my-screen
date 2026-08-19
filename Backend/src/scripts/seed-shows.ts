/// <reference types="node" />
import "dotenv/config";
import mongoose from "mongoose";
import { Movie } from "../modules/movie/movieModel";
import { Theater } from "../modules/theater/theaterModel";
import { generateSeatLayout } from "../utils";
import { Show } from "../modules/show/showModel";

// Builds the next `days` dates starting today, at UTC midnight.
// The API parses `?date=YYYY-MM-DD` with `new Date(str)`, which JS always
// interprets as UTC midnight — so the seed data has to be aligned to UTC
// day boundaries too, or the $gte/$lt date-range query in the controller
// will never match (this was the root cause of "no shows/theaters showing").
const getNextDays = (days: number) => {
  const dates: Date[] = [];
  const now = new Date();
  const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() + i);
    dates.push(d);
  }
  return dates;
};

const showTimes = ["10:00", "13:30", "17:00", "20:30"];

const buildDateTime = (day: Date, time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const dt = new Date(day);
  dt.setUTCHours(hours, minutes, 0, 0);
  return dt;
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("Connected to DB");

    const movies = await Movie.find().limit(5);
    const theaters = await Theater.find().limit(4);

    if (movies.length === 0 || theaters.length === 0) {
      console.error("❌ No movies or theaters found. Please run movie and theater seeds first.");
      process.exit(1);
    }

    await Show.deleteMany();
    console.log("Cleared existing shows");

    const days = getNextDays(7); // today through the next 7 days
    const shows = [];

    // [movieIndex, theaterIndex, format] combos, same pairing structure as before
    const combos: [number, number, string][] = [
      [0, 0, "IMAX"],
      [0, 0, "2D"],
      [0, 1, "3D"],
      [1, 0, "IMAX"],
      [1, 2, "2D"],
      [2, 1, "2D"],
      [2, 3, "IMAX"],
      [3, 2, "3D"],
      [3, 3, "IMAX"],
      [4, 0, "IMAX"],
    ];

    for (const day of days) {
      for (const [movieIdx, theaterIdx, format] of combos) {
        const theater = theaters[theaterIdx];
        const time = showTimes[(movieIdx + theaterIdx) % showTimes.length];

        shows.push({
          movie: movies[movieIdx]._id,
          theater: theater._id,
          location: theater.city,
          format,
          audioType: "Dolby Atmos",
          date: day,
          startTime: buildDateTime(day, time),
          seatLayout: generateSeatLayout(),
        });
      }
    }

    const inserted = await Show.insertMany(shows);
    console.log(`✅ Seeded ${inserted.length} shows successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding shows:", error);
    process.exit(1);
  }
};

seed();