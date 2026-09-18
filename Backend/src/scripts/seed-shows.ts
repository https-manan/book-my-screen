/// <reference types="node" />
import "dotenv/config";
import mongoose from "mongoose";
import { Movie } from "../modules/movie/movieModel";
import { Theater } from "../modules/theater/theaterModel";
import { generateSeatLayout } from "../utils";
import { Show } from "../modules/show/showModel";

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
const formats = ["2D", "3D", "IMAX"];

const buildDateTime = (day: Date, time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const dt = new Date(day);
  dt.setUTCHours(hours, minutes, 0, 0);
  return dt;
};

// Bump this instead of reseeding constantly — 60 days ≈ 2 months of runway
// before the catalog runs dry and this script needs to be re-run.
const DAYS_AHEAD = 120;

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("Connected to DB");

    const movies = await Movie.find().limit(8);
    const theaters = await Theater.find(); // ALL theaters, every city gets shows

    if (movies.length === 0 || theaters.length === 0) {
      console.error("❌ No movies or theaters found. Run movie and theater seeds first.");
      process.exit(1);
    }

    await Show.deleteMany();
    console.log("Cleared existing shows");

    const days = getNextDays(DAYS_AHEAD);
    const shows:any = [];

    for (let dayIdx = 0; dayIdx < days.length; dayIdx++) {
      const day = days[dayIdx];

      theaters.forEach((theater, theaterIdx) => {
        showTimes.forEach((time, timeIdx) => {
          const movie = movies[(dayIdx + theaterIdx + timeIdx) % movies.length];
          const format = formats[(theaterIdx + timeIdx) % formats.length];

          shows.push({
            movie: movie._id,
            theater: theater._id,
            location: theater.city,
            format,
            audioType: "Dolby Atmos",
            date: day,
            startTime: buildDateTime(day, time),
            seatLayout: generateSeatLayout(),
          });
        });
      });
    }

    const inserted = await Show.insertMany(shows);
    console.log(`✅ Seeded ${inserted.length} shows across ${theaters.length} theaters, ${DAYS_AHEAD} days`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding shows:", error);
    process.exit(1);
  }
};

seed();