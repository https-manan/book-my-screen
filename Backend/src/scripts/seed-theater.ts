import mongoose from "mongoose";
import dotenv from "dotenv";
import { Theater } from "../modules/theater/theaterModel";
dotenv.config();

const theaters = [
  {
    name: "PVR Cinemas",
    location: "Plot No. 12, Sector 18, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    logo: { public_id: "seed_pvr_noida", secure_url: "https://picsum.photos/seed/pvr/200/200" },
  },
  {
    name: "INOX Movies",
    location: "GIP Mall, Sector 38A, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    logo: { public_id: "seed_inox_noida", secure_url: "https://picsum.photos/seed/inox/200/200" },
  },
  {
    name: "Cinepolis",
    location: "DLF Mall of India, Sector 18, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    logo: { public_id: "seed_cinepolis_noida", secure_url: "https://picsum.photos/seed/cinepolis/200/200" },
  },
  {
    name: "PVR Director's Cut",
    location: "Ambience Mall, Vasant Kunj, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    logo: { public_id: "seed_pvr_delhi", secure_url: "https://picsum.photos/seed/pvrdirector/200/200" },
  },
  {
    name: "INOX Naraina",
    location: "Naraina Vihar, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    logo: { public_id: "seed_inox_delhi", secure_url: "https://picsum.photos/seed/inoxnaraina/200/200" },
  },
  {
    name: "Carnival Cinemas",
    location: "Fun Republic Mall, Andheri West, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    logo: { public_id: "seed_carnival_mumbai", secure_url: "https://picsum.photos/seed/carnival/200/200" },
  },
  {
    name: "PVR Icon",
    location: "Oberoi Mall, Goregaon East, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    logo: { public_id: "seed_pvr_mumbai", secure_url: "https://picsum.photos/seed/pvricon/200/200" },
  },
  {
    name: "INOX Garuda Mall",
    location: "Magrath Road, Ashok Nagar, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    logo: { public_id: "seed_inox_bangalore", secure_url: "https://picsum.photos/seed/inoxgaruda/200/200" },
  },
  {
    name: "PVR Forum Mall",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    logo: { public_id: "seed_pvr_bangalore", secure_url: "https://picsum.photos/seed/pvrforum/200/200" },
  },
  {
    name: "SPI Cinemas",
    location: "Express Avenue Mall, Royapettah, Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    logo: { public_id: "seed_spi_chennai", secure_url: "https://picsum.photos/seed/spi/200/200" },
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("Connected to DB");
    await Theater.deleteMany();
    console.log("Cleared existing theaters");
    const inserted = await Theater.insertMany(theaters);
    console.log(`✅ Seeded ${inserted.length} theaters successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding theaters:", error);
    process.exit(1);
  }
};

seed();