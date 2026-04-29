import mongoose from "mongoose";

import dotenv from "dotenv";
import { Movie } from "../modules/movie/movieModel";
dotenv.config();

const movies = [
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.",
    duration: 148,
    genre: ["Action", "Sci-Fi", "Thriller"],
    releaseDate: new Date("2010-07-16"),
    languages: ["English", "Hindi"],
    certification: "UA",
    posterUrl: { public_id: "seed_inception", secure_url: "https://picsum.photos/seed/inception/400/600" },
    rating: 8.8,
    votes: 24000,
    format: ["2D", "IMAX"],
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    duration: 169,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    releaseDate: new Date("2014-11-07"),
    languages: ["English", "Hindi"],
    certification: "UA",
    posterUrl: { public_id: "seed_interstellar", secure_url: "https://picsum.photos/seed/interstellar/400/600" },
    rating: 8.6,
    votes: 19000,
    format: ["2D", "IMAX"],
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    duration: 152,
    genre: ["Action", "Crime", "Drama"],
    releaseDate: new Date("2008-07-18"),
    languages: ["English", "Hindi"],
    certification: "UA",
    posterUrl: { public_id: "seed_darkknight", secure_url: "https://picsum.photos/seed/darkknight/400/600" },
    rating: 9.0,
    votes: 31000,
    format: ["2D", "IMAX"],
  },
  {
    title: "Avengers: Endgame",
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos's actions.",
    duration: 181,
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseDate: new Date("2019-04-26"),
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "UA",
    posterUrl: { public_id: "seed_endgame", secure_url: "https://picsum.photos/seed/endgame/400/600" },
    rating: 8.4,
    votes: 28000,
    format: ["2D", "3D", "IMAX"],
  },
  {
    title: "Oppenheimer",
    description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    duration: 180,
    genre: ["Biography", "Drama", "History"],
    releaseDate: new Date("2023-07-21"),
    languages: ["English", "Hindi"],
    certification: "UA",
    posterUrl: { public_id: "seed_oppenheimer", secure_url: "https://picsum.photos/seed/oppenheimer/400/600" },
    rating: 8.9,
    votes: 17000,
    format: ["2D", "IMAX"],
  },
  {
    title: "RRR",
    description: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country.",
    duration: 187,
    genre: ["Action", "Drama"],
    releaseDate: new Date("2022-03-25"),
    languages: ["Telugu", "Hindi", "Tamil"],
    certification: "UA",
    posterUrl: { public_id: "seed_rrr", secure_url: "https://picsum.photos/seed/rrr/400/600" },
    rating: 7.9,
    votes: 14000,
    format: ["2D", "3D"],
  },
  {
    title: "KGF Chapter 2",
    description: "Rocky's bloodied rise to power at the Kolar Gold Fields continues as he faces threats from all sides.",
    duration: 168,
    genre: ["Action", "Crime", "Drama"],
    releaseDate: new Date("2022-04-14"),
    languages: ["Kannada", "Hindi", "Tamil", "Telugu"],
    certification: "A",
    posterUrl: { public_id: "seed_kgf2", secure_url: "https://picsum.photos/seed/kgf2/400/600" },
    rating: 8.2,
    votes: 21000,
    format: ["2D", "3D", "IMAX"],
  },
  {
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    duration: 166,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    releaseDate: new Date("2024-03-01"),
    languages: ["English", "Hindi"],
    certification: "UA",
    posterUrl: { public_id: "seed_dune2", secure_url: "https://picsum.photos/seed/dune2/400/600" },
    rating: 8.5,
    votes: 12000,
    format: ["2D", "IMAX"],
  },
  {
    title: "Spider-Man: No Way Home",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    duration: 148,
    genre: ["Action", "Adventure", "Fantasy"],
    releaseDate: new Date("2021-12-17"),
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "UA",
    posterUrl: { public_id: "seed_spiderman", secure_url: "https://picsum.photos/seed/spiderman/400/600" },
    rating: 8.3,
    votes: 26000,
    format: ["2D", "3D", "IMAX"],
  },
  {
    title: "Pathaan",
    description: "An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.",
    duration: 146,
    genre: ["Action", "Thriller"],
    releaseDate: new Date("2023-01-25"),
    languages: ["Hindi", "Tamil", "Telugu"],
    certification: "UA",
    posterUrl: { public_id: "seed_pathaan", secure_url: "https://picsum.photos/seed/pathaan/400/600" },
    rating: 5.9,
    votes: 8000,
    format: ["2D", "3D", "IMAX"],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("Connected to DB");
    await Movie.deleteMany();
    console.log("Cleared existing movies");
    const inserted = await Movie.insertMany(movies);
    console.log(`✅ Seeded ${inserted.length} movies successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding movies:", error);
    process.exit(1);
  }
};

seed();