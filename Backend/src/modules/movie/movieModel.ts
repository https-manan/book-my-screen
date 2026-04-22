import mongoose from "mongoose";
import { IMovie } from "./movieInterface";

const movieSchema = new mongoose.Schema<IMovie>({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  duration:{
    type: Number,
    required: true
  },
  genre:{
    type: [String],
    required: true
  },
  releaseDate:{
    type: Date,
    required: true
  },
  languages:{
    type: [String],
    required: true
  },
  certification:{
    type: String,
    required: true
  },
  posterUrl:{
    public_id: {
      type: String,
      required: true
    },
    secure_url: {
      type: String
    }
  },
  rating:{
    type: Number,
    required: true,
    default:0
  },
  votes:{
    type: Number,
    required: true,
    default:0
  },
  format:{
    type: [String],
    default: ["2D"]
  }
},{timestamps:true});

export const Movie = mongoose.model<IMovie>("Movie",movieSchema);