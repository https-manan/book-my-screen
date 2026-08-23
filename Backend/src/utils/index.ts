import { Types } from "mongoose";
import { IMovie } from "../modules/movie/movieInterface";
import { IShow } from "../modules/show/showInterface";
import { ITheater } from "../modules/theater/theaterInterface";

  type GroupedShow = {
    movie: Types.ObjectId | IMovie;     //This is for like for a movie kun kun se theater mai hai vo and time in that theater 
    theater: {
      theaterDetails: Types.ObjectId | ITheater;
      shows: Array<{
        _id: string;
        date: Date;
        startTime: Date;
        format: string;
        audioType: string;
      }>;
    };
  };


export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const generateSeatLayout = () => {
  return [
    {
      row: "E",
      type: "PREMIUM",
      price: 510,
      seats: Array.from({ length: 10 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE",
      })),
    },
    {
      row: "D",
      type: "EXCLUSIVE",
      price: 290,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE",
      })),
    },
    {
      row: "C",
      type: "EXCLUSIVE",
      price: 290,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE",
      })),
    },
    {
      row: "B",
      type: "EXCLUSIVE",
      price: 290,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE",
      })),
    },
    {
      row: "A",
      type: "NORMAL",
      price: 180,
      seats: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        status: "AVAILABLE",
      })),
    },
  ];
};

// Grouping function


export const groupShowsByTheatreAndMovie = (shows: IShow[]): GroupedShow[] => {
  const grouped: Record<string, GroupedShow> = {};
  shows.forEach((show) => {
    const movieId = show.movie._id;
    const theatreId = show.theater._id;
    const key = `${movieId}_${theatreId}`; //This key means group all shows of same movie in same theatre
    if (!grouped[key]) {
      grouped[key]={ //agr us key se grouping nahi hui hai to we gonna create group with that movie and theater
        movie: show.movie,
        theater: {
          theaterDetails: show.theater,
          shows: [],
        },
      };
    }
    grouped[key].theater.shows.push({ //And agar ho gayi h to ye selective data he push karenge jo common nahi hai like date,startTime and all 
      _id: show._id ?? "",
      date: show.date ?? "",
      startTime: show.startTime,
      format: show.format ?? "",
      audioType: show.audioType ?? "",
    });
  });

  return Object.values(grouped);
};


//eg:-

//suppose we have 3 shows like this:-
// {
//   _id: "show101",
//   movie: {
//     _id: "movie1",
//     title: "Avengers"
//   },
//   theater: {
//     _id: "theater1",
//     name: "PVR Saket"
//   },
//   date: "2026-08-18",
//   startTime: "10:00",
//   format: "2D",
//   audioType: "Hindi"
// }

// {
//   _id: "show102",
//   movie: {
//     _id: "movie1",
//     title: "Avengers"
//   },
//   theater: {
//     _id: "theater1",
//     name: "PVR Saket"
//   },
//   date: "2026-08-18",
//   startTime: "14:00",
//   format: "2D",
//   audioType: "Hindi"
// }


// {
//   _id: "show103",
//   movie: {
//     _id: "movie1",
//     title: "Avengers"
//   },
//   theater: {
//     _id: "theater2",
//     name: "INOX Nehru Place"
//   },
//   date: "2026-08-18",
//   startTime: "18:00",
//   format: "3D",
//   audioType: "English"
// }

// Avengers
//  ├── PVR Saket
//  │    ├── 10:00
//  │    └── 14:00
//  │
//  └── INOX Nehru Place
//       └── 18:00




// So grouped have to store like this 

// {
//   "movie1_theater1": {
//     movie: ...,
//     theater: {
//       theaterDetails: ...,
//       shows: [...]
//     }
//   },

//   "movie1_theater2": {
//     movie: ...,
//     theater: {
//       theaterDetails: ...,
//       shows: [...]
//     }
//   }
// }