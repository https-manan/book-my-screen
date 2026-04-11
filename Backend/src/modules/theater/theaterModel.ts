import mongoose from "mongoose";
import { ITheater } from "./theaterInterface";

const theaterSchema = new mongoose.Schema<ITheater>({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Theater = mongoose.model("Theater", theaterSchema);