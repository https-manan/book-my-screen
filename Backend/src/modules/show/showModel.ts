import mongoose, { Model } from "mongoose";
import { IShow } from "./showInterface";

const showSchema = new mongoose.Schema<IShow>({
  movie:{              //This means the movie field in each Show document stores just the Movie document’s id not the whole movie it stpres like "032kbdbsk" and we match that in Movie model
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
    required: true
  },
  location: {
    type: String,
    required: true
  },
  format: {
    type: String,
    enum: ["2D", "3D", "IMAX", "PVR PXL"],
    required: true
  },
  audioType: {
    type: String,
    default: "Dolby Atmos"
  },
  startTime: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  seatLayout: [ 
    {
      row: { 
        type: String,  
        required: true
      },
      type: {
        type: String,
        enum: ["NORMAL", "EXCLUSIVE", "PREMIUM"],
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      seats: [
        {
          number:{ type: Number, required: true },
          status:{
            type:String,
            enum:["AVAILABLE", "BOOKED", "BLOCKED"],
            default:"AVAILABLE"
          }
        }
      ]
    }
  ]
}, { timestamps: true });

export const Show: Model<IShow> = mongoose.model<IShow>("Show", showSchema);