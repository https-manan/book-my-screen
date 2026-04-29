import mongoose from "mongoose";
import dotenv from "dotenv";
import { Movie } from "../modules/movie/movieModel";
import { Theater } from "../modules/theater/theaterModel";
import { generateSeatLayout } from "../utils";
import { Show } from "../modules/show/showModel";
dotenv.config();

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

    const shows = [
      {
        movie: movies[0]._id,      // Inception
        theater: theaters[0]._id,  // PVR Noida
        location: "Noida",
        format: "IMAX",
        audioType: "Dolby Atmos",
        date: new Date("2026-04-23"),
        startTime: new Date("2026-04-23T10:00:00"),
        seatLayout: generateSeatLayout(),
      },
      {
        movie: movies[0]._id,      // Inception
        theater: theaters[0]._id,  // PVR Noida
        location: "Noida",
        format: "2D",
        audioType: "Dolby Atmos",
        date: new Date("2026-04-23"),
        startTime: new Date("2026-04-23T10:00:00"),
        seatLayout: generateSeatLayout(),
      },
      {
        movie: movies[0]._id,      // Inception
        theater: theaters[1]._id,  // INOX Noida
        location: "Noida",
        format: "3D",
        audioType: "Dolby Atmos",
        date: new Date("2026-04-23"),
        startTime: new Date("2026-04-23T10:00:00"),
        seatLayout: generateSeatLayout(),
      },
      {
        movie: movies[1]._id,      // Interstellar
        theater: theaters[0]._id,  // PVR Noida
        location: "Noida",
        format: "IMAX",
        audioType: "Dolby Atmos",
        date: new Date("2026-04-23"),
        startTime: new Date("2026-04-23T10:00:00"),
        seatLayout: generateSeatLayout(),
      },
      {
        movie: movies[1]._id,      // Interstellar
        theater: theaters[2]._id,  // Cinepolis Noida
        location: "Noida",
        format: "2D",
        audioType: "Dolby Atmos",
        date: new Date("2026-04-23"),
        startTime: new Date("2026-04-23T10:00:00"),
        seatLayout: generateSeatLayout(),
      },
      {
        movie: movies[2]._id,      // The Dark Knight
        theater: theaters[1]._id,  // INOX Noida
        location: "Noida",
        format: "2D",
        audioType: "Dolby Atmos",
        date: new Date("2026-04-23"),
        startTime: new Date("2026-04-23T10:00:00"),
        seatLayout: generateSeatLayout(),
      },
      {
        movie: movies[2]._id,      // The Dark Knight
        theater: theaters[3]._id,  // PVR Delhi
        location: "Delhi",
        format: "IMAX",
        audioType: "Dolby Atmos",
        date: new Date("2026-04-23"),
        startTime: new Date("2026-04-23T10:00:00"),
        seatLayout: generateSeatLayout(),
      },
      {
        movie: movies[3]._id,      // Avengers Endgame
        theater: theaters[2]._id,  // Cinepolis Noida
        location: "Noida",
        format: "3D",
        audioType: "Dolby Atmos",
        date: new Date("2026-04-23"),
        startTime: new Date("2026-04-23T10:00:00"),
        seatLayout: generateSeatLayout(),
      },
      {
        movie: movies[3]._id,      // Avengers Endgame
        theater: theaters[3]._id,  // PVR Delhi
        location: "Delhi",
        format: "IMAX",
        audioType: "Dolby Atmos",
        date: new Date("2026-04-23"),
        startTime: new Date("2026-04-23T10:00:00"),
        seatLayout: generateSeatLayout(),
      },
      {
        movie: movies[4]._id,      // Oppenheimer
        theater: theaters[0]._id,  // PVR Noida
        location: "Noida",
        format: "IMAX",
        audioType: "Dolby Atmos",
        date: new Date("2026-04-23"),
        startTime: new Date("2026-04-23T10:00:00"),
        seatLayout: generateSeatLayout(),
      },
    ];

    const inserted = await Show.insertMany(shows);
    console.log(`✅ Seeded ${inserted.length} shows successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding shows:", error);
    process.exit(1);
  }
};

seed();