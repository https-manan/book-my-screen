/// <reference types="node" />
import "dotenv/config";
import mongoose from "mongoose";
import { Theater } from "../modules/theater/theaterModel";
import { uploadImage } from "../cloudinary/cloudinaryEndPoints";

const theaters = [
  { name: "PVR Cinemas", location: "Plot No. 12, Sector 18, Noida", city: "Noida", state: "Uttar Pradesh", logoSeed: "pvr" },
  { name: "INOX Movies", location: "GIP Mall, Sector 38A, Noida", city: "Noida", state: "Uttar Pradesh", logoSeed: "inox" },
  { name: "Cinepolis", location: "DLF Mall of India, Sector 18, Noida", city: "Noida", state: "Uttar Pradesh", logoSeed: "cinepolis" },
  { name: "PVR Director's Cut", location: "Ambience Mall, Vasant Kunj, New Delhi", city: "New Delhi", state: "Delhi", logoSeed: "pvrdirector" },
  { name: "INOX Naraina", location: "Naraina Vihar, New Delhi", city: "New Delhi", state: "Delhi", logoSeed: "inoxnaraina" },
  { name: "Carnival Cinemas", location: "Fun Republic Mall, Andheri West, Mumbai", city: "Mumbai", state: "Maharashtra", logoSeed: "carnival" },
  { name: "PVR Icon", location: "Oberoi Mall, Goregaon East, Mumbai", city: "Mumbai", state: "Maharashtra", logoSeed: "pvricon" },
  { name: "INOX Garuda Mall", location: "Magrath Road, Ashok Nagar, Bangalore", city: "Bangalore", state: "Karnataka", logoSeed: "inoxgaruda" },
  { name: "PVR Forum Mall", location: "Koramangala, Bangalore", city: "Bangalore", state: "Karnataka", logoSeed: "pvrforum" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("Connected to DB");

    await Theater.deleteMany();
    console.log("Cleared existing theaters");

    const theatersWithLogos = [];

    for (const theater of theaters) {
      const sourceUrl = `https://picsum.photos/seed/${theater.logoSeed}/200/200`;
      console.log(`Uploading logo for ${theater.name}...`);

      const uploadResult = await uploadImage(sourceUrl);

      const { logoSeed, ...rest } = theater;
      theatersWithLogos.push({
        ...rest,
        logo: {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        },
      });
    }

    const inserted = await Theater.insertMany(theatersWithLogos);
    console.log(`✅ Seeded ${inserted.length} theaters successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding theaters:", error);
    process.exit(1);
  }
};

seed();