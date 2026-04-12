import { groupShowsByTheatreAndMovie } from './../../utils/index';
import { Request, Response } from "express";
import { generateSeatLayout } from "../../utils";
import { Show } from "./showModel";
import { Movie } from "../movie/movieModel";

export const createShow = async(req:Request,res:Response)=>{
    try {
        const seatLayout = generateSeatLayout();
        const showToCreate = {...req.body,seatLayout} 
        await Show.create(showToCreate)
        return res.status(200).json({
            msg:"Show created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in createShow BE"
        })
    }
}

export const getShowByMovieDateLocation=async(req:Request,res:Response)=>{
    try {
        const movieId =req.params;
        const {date,location} = req.body;
        const movie = Movie.findById(movieId);
        const show = await Show.find(movie,date,location).populate("movie theater").sort({startTime:1});
        if(!show)return res.status(401).json({
            msg:"No show available"
        })
        const groupedShow = groupShowsByTheatreAndMovie(show);//This func is written in index.ts so read from there
        return res.status(200).json({
            groupedShow
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in createShow BE"
        })
    }
}

export const getShowById= async(req:Request,res:Response)=>{
    try {
        const id = req.params;
        const show = await Show.findById(id).populate("movie theater");
        if(!show){
            return res.status(401).json({
                msg:"No show found"
            })
        }
        return res.status(201).json({
            show
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in getShow BE"
        })
    }
}

export const updateSeatStatus = async (req: Request, res: Response) => {
  try {
    const { showId } = req.params;
    const { row, seatNumber, seatStatus } = req.body;

    const result = await Show.updateOne(
      {
        _id: showId,
        "seatLayout.row": row, //"parent.child" (This dot and in parenthesis means parent.child)
         "seatLayout.seats": {
          $elemMatch: {  //This means find an element in the array where ALL conditions match in the same object
            number: seatNumber, //Without $elemMatch one seat with number = 5 another seat with status = AVAILABLE not with both in same obj
            status: "AVAILABLE" // prevent double booking
          }
        }
      },
      {
        $set: {
          "seatLayout.$[r].seats.$[s].status": seatStatus //This r and s are the These are array filter variables They let you target specific elements inside arrays baki study on gpt
        }
      },
      {
        arrayFilters: [
          { "r.row": row },
          { "s.number": seatNumber }
        ]
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        message: "Seat not available or already booked"
      });
    }

    res.status(200).json({ message: "Seat updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};