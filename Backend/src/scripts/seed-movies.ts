/// <reference types="node" />
import "dotenv/config";
import mongoose from "mongoose";
import { Movie } from "../modules/movie/movieModel";
import { uploadImage } from "../cloudinary/cloudinaryEndPoints";

/**
 * rating: null means the movie hasn't released yet (as of Aug 17, 2026) so there's
 * no aggregate rating available yet. Swap this to whatever your schema expects
 * (0, undefined, etc.) if `null` isn't allowed.
 */
const movies = [
  {
    title: "Street Fighter",
    posterUrl: "http://www.impawards.com/2026/posters/street_fighter.jpg",
    description:
      "Set in 1993, estranged fighters Ryu and Ken are recruited by Chun-Li for the next World Warrior Tournament, facing off against a star-studded roster of Capcom's iconic fighters.",
    duration: 120,
    genre: ["Action", "Comedy"],
    releaseDate: new Date("2026-10-16"),
    languages: ["English"],
    certification: "UA",
    rating: 0,
    votes: 0,
    format: ["2D", "IMAX"],
  },
  {
    title: "Killer Whale",
    posterUrl:
      "http://www.impawards.com/intl/australia/2026/posters/killer_whale.jpg",
    description:
      "Best friends Maddie and Trish find themselves trapped in a remote lagoon with Ceto, a vengeful captive orca seeking revenge for a brutal life in captivity.",
    duration: 89,
    genre: ["Horror", "Thriller"],
    releaseDate: new Date("2026-01-16"),
    languages: ["English"],
    certification: "A",
    rating: 4.8,
    votes: 9200,
    format: ["2D"],
  },
  {
    title: "Disclosure Day",
    posterUrl: "http://www.impawards.com/2026/posters/disclosure_day.jpg",
    description:
      "A cybersecurity expert becomes a whistleblower after uncovering secrets about aliens, teaming up with a meteorologist to prove there's life beyond Earth as a corporation hunts them down.",
    duration: 145,
    genre: ["Sci-Fi", "Thriller"],
    releaseDate: new Date("2026-06-12"),
    languages: ["English"],
    certification: "UA",
    rating: 6.3,
    votes: 15400,
    format: ["2D", "IMAX"],
  },
  {
    title: "Digger",
    posterUrl: "http://www.impawards.com/2026/posters/digger.jpg",
    description:
      "The most powerful man in the world races to prove he is humanity's savior before the disaster he unleashed destroys everything.",
    duration: 106,
    genre: ["Comedy", "Drama"],
    releaseDate: new Date("2026-10-02"),
    languages: ["English"],
    certification: "UA",
    rating: 0,
    votes: 0,
    format: ["2D"],
  },
  {
    title: "EPiC: Elvis Presley in Concert",
    posterUrl:
      "http://www.impawards.com/2026/posters/epic_elvis_presley_in_concert.jpg",
    description:
      "Long-lost footage from Elvis Presley's 1970s Vegas residency, rare 16mm reels from Elvis on Tour, and archival Graceland film come together in this immersive concert experience directed by Baz Luhrmann.",
    duration: 96,
    genre: ["Documentary", "Music"],
    releaseDate: new Date("2026-02-27"),
    languages: ["English"],
    certification: "UA",
    rating: 8.4,
    votes: 6100,
    format: ["2D", "IMAX"],
  },
  {
    title: "This Is Not a Test",
    posterUrl:
      "http://www.impawards.com/intl/canada/2025/posters/this_is_not_a_test.jpg",
    description:
      "Sloane and four classmates take shelter in their high school as a zombie outbreak overtakes their town, forcing them to confront both the infected and their own pasts.",
    duration: 103,
    genre: ["Horror", "Thriller"],
    releaseDate: new Date("2026-02-20"),
    languages: ["English"],
    certification: "A",
    rating: 5.8,
    votes: 4300,
    format: ["2D"],
  },
  {
    title: "Avengers: Doomsday",
    posterUrl: "http://www.impawards.com/2026/posters/avengers_doomsday.jpg",
    description:
      "Heroes from three distinct universes — Earth-616's Avengers, the Wakandans, and the newly integrated Fantastic Four — are set on a deadly collision course against Doctor Doom.",
    duration: 165,
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseDate: new Date("2026-12-18"),
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "UA",
    rating: 0,
    votes: 0,
    format: ["2D", "3D", "IMAX"],
  },
  {
    title: "Spider-Man: Brand New Day",
    posterUrl:
      "http://www.impawards.com/2026/posters/spiderman_brand_new_day_xlg.jpg",
    description:
      "Fighting crime full-time as Spider-Man in a world that has forgotten him, Peter Parker faces a shocking new threat while his powers undergo a dangerous evolution.",
    duration: 150,
    genre: ["Action", "Adventure", "Fantasy"],
    releaseDate: new Date("2026-07-31"),
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "UA",
    rating: 8.0,
    votes: 41000,
    format: ["2D", "3D", "IMAX"],
  },
  {
    title: "Marty Supreme",
    posterUrl: "http://www.impawards.com/2025/posters/marty_supreme_ver3.jpg",
    description:
      "Marty Mauser, a young man with a dream no one respects, goes to hell and back in pursuit of greatness in this manic, madcap sports comedy-drama.",
    duration: 150,
    genre: ["Comedy", "Drama", "Sport"],
    releaseDate: new Date("2025-12-25"),
    languages: ["English"],
    certification: "A",
    rating: 7.8,
    votes: 38700,
    format: ["2D"],
  },
  {
    title: "Crime 101",
    posterUrl:
      "http://www.impawards.com/2026/posters/crime_one_o_one_ver5.jpg",
    description:
      "An elusive jewel thief whose heists unfold along LA's 101 freeway eyes the score of a lifetime, colliding with a disillusioned insurance broker as a relentless detective closes in.",
    duration: 139,
    genre: ["Crime", "Drama", "Thriller"],
    releaseDate: new Date("2026-02-13"),
    languages: ["English"],
    certification: "A",
    rating: 7.0,
    votes: 11200,
    format: ["2D"],
  },
  {
    title: "Glenrothan",
    posterUrl: "http://www.impawards.com/intl/uk/2026/posters/glenrothan.jpg",
    description:
      "After 35 years away, Donal reluctantly returns to the Scottish Highlands to reconcile with his estranged brother Sandy over the future of their family's whisky distillery.",
    duration: 99,
    genre: ["Comedy", "Drama"],
    releaseDate: new Date("2026-04-17"),
    languages: ["English"],
    certification: "UA",
    rating: 6.5,
    votes: 2800,
    format: ["2D"],
  },
  {
    title: "Michael",
    posterUrl: "http://www.impawards.com/2026/posters/michael_ver3.jpg",
    description:
      "An in-depth portrayal of Michael Jackson, tracing his journey from The Jackson 5 to global superstardom as the King of Pop, starring his nephew Jaafar Jackson.",
    duration: 127,
    genre: ["Biography", "Drama", "Music"],
    releaseDate: new Date("2026-04-24"),
    languages: ["English"],
    certification: "UA",
    rating: 6.5,
    votes: 52000,
    format: ["2D", "IMAX"],
  },
  {
    title: "Scream 7",
    posterUrl: "http://www.impawards.com/2026/posters/scream_seven_ver4.jpg",
    description:
      "Sidney Prescott's quiet life is shattered when a new Ghostface killer emerges, setting its sights on her daughter, forcing her to confront her haunting past.",
    duration: 106,
    genre: ["Horror", "Mystery", "Thriller"],
    releaseDate: new Date("2026-02-27"),
    languages: ["English"],
    certification: "A",
    rating: 5.6,
    votes: 19800,
    format: ["2D"],
  },
  {
    title: "Wuthering Heights",
    posterUrl:
      "http://www.impawards.com/2026/posters/wuthering_heights_ver16.jpg",
    description:
      "A passionate and tumultuous love story set against the Yorkshire moors, exploring the intense and destructive relationship between Heathcliff and Catherine Earnshaw.",
    duration: 136,
    genre: ["Drama", "Romance"],
    releaseDate: new Date("2026-02-13"),
    languages: ["English"],
    certification: "A",
    rating: 6.2,
    votes: 22500,
    format: ["2D"],
  },
  {
    title: "Obsession",
    posterUrl: "http://www.impawards.com/2026/posters/obsession.jpg",
    description:
      "After breaking a mysterious 'One Wish Willow' to win his crush's heart, a hopeless romantic gets exactly what he asked for — but discovers some desires come at a dark, sinister price.",
    duration: 109,
    genre: ["Horror", "Romance"],
    releaseDate: new Date("2026-05-15"),
    languages: ["English"],
    certification: "A",
    rating: 7.8,
    votes: 9600,
    format: ["2D"],
  },
  {
    title: "Lee Cronin's The Mummy",
    posterUrl:
      "http://www.impawards.com/2026/posters/lee_cronins_the_mummy_ver2.jpg",
    description:
      "A journalist's daughter disappears into the desert without a trace. Eight years later, she is returned to her family — but the joyful reunion quickly spirals into a living nightmare.",
    duration: 133,
    genre: ["Horror"],
    releaseDate: new Date("2026-04-17"),
    languages: ["English"],
    certification: "A",
    rating: 7.4,
    votes: 8100,
    format: ["2D", "IMAX"],
  },
  {
    title: "Project Hail Mary",
    posterUrl:
      "http://www.impawards.com/2026/posters/project_hail_mary_ver5.jpg",
    description:
      "Science teacher Ryland Grace wakes up on a spaceship light years from home with no memory of who he is. As it returns, he must solve the riddle of what's causing the sun to die.",
    duration: 156,
    genre: ["Adventure", "Sci-Fi"],
    releaseDate: new Date("2026-03-20"),
    languages: ["English"],
    certification: "UA",
    rating: 8.2,
    votes: 46900,
    format: ["2D", "IMAX"],
  },
  {
    title: "The Invite",
    posterUrl: "http://www.impawards.com/2026/posters/invite_ver2.jpg",
    description:
      "Joe and Angela's marriage is on thin ice. When they invite their enigmatic upstairs neighbors over for dinner, the night spirals into unexpected places.",
    duration: 107,
    genre: ["Comedy", "Drama"],
    releaseDate: new Date("2026-06-26"),
    languages: ["English"],
    certification: "A",
    rating: 6.2,
    votes: 3100,
    format: ["2D"],
  },
  {
    title: "Moana",
    posterUrl: "http://www.impawards.com/2026/posters/moana_ver2.jpg",
    description:
      "In Disney's live-action reimagining, Moana answers the Ocean's call and voyages beyond the reef of her island for the first time with the demigod Maui to restore her people's prosperity.",
    duration: 116,
    genre: ["Adventure", "Comedy", "Fantasy"],
    releaseDate: new Date("2026-07-10"),
    languages: ["English", "Hindi"],
    certification: "UA",
    rating: 5.6,
    votes: 12300,
    format: ["2D", "3D", "IMAX"],
  },
  {
    title: "Minions & Monsters",
    posterUrl:
      "http://www.impawards.com/2026/posters/minions_three_ver2.jpg",
    description:
      "Set in 1920s Hollywood, a group of Minions become silent movie stars and unwittingly unleash real monsters upon the world, banding together to save the planet from the mayhem they created.",
    duration: 92,
    genre: ["Animation", "Adventure", "Comedy"],
    releaseDate: new Date("2026-07-01"),
    languages: ["English", "Hindi"],
    certification: "UA",
    rating: 7.0,
    votes: 8700,
    format: ["2D", "3D"],
  },
  {
    title: "Toy Story 5",
    posterUrl: "http://www.impawards.com/2026/posters/toy_story_five_ver3.jpg",
    description:
      "Woody, Buzz, Jessie and the rest of the gang face a new challenge when their kid's attention is captured by Lilypad, a frog-like tablet, in Toy meets Tech.",
    duration: 102,
    genre: ["Animation", "Adventure", "Comedy"],
    releaseDate: new Date("2026-06-19"),
    languages: ["English", "Hindi"],
    certification: "UA",
    rating: 7.8,
    votes: 15600,
    format: ["2D", "3D", "IMAX"],
  },
  {
    title: "One Night Only",
    posterUrl: "http://www.impawards.com/2026/posters/one_night_only.jpg",
    description:
      "Recently dumped Owen and hopeful romantic Allie might be the only two singles in the city looking for something real on the one night of the year when premarital sex is legal.",
    duration: 102,
    genre: ["Comedy", "Romance"],
    releaseDate: new Date("2026-08-07"),
    languages: ["English"],
    certification: "A",
    rating: 0,
    votes: 0,
    format: ["2D"],
  },
  {
    title: "The Odyssey",
    posterUrl: "http://www.impawards.com/2026/posters/odyssey_ver3.jpg",
    description:
      "Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War, confronting gods, monsters, and trials that test his cunning and humanity.",
    duration: 172,
    genre: ["Action", "Adventure", "Fantasy"],
    releaseDate: new Date("2026-07-17"),
    languages: ["English"],
    certification: "UA",
    rating: 7.0,
    votes: 28400,
    format: ["2D", "IMAX"],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("Connected to DB");

    await Movie.deleteMany();
    console.log("Cleared existing movies");

    const moviesWithPosters = [];

    for (const movie of movies) {
      console.log(`Uploading poster for ${movie.title}...`);
      const uploadResult = await uploadImage(movie.posterUrl);

      const { posterUrl, ...rest } = movie;
      moviesWithPosters.push({
        ...rest,
        posterUrl: {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        },
      });
    }

    const inserted = await Movie.insertMany(moviesWithPosters);
    console.log(`✅ Seeded ${inserted.length} movies successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding movies:", error);
    process.exit(1);
  }
};

seed();