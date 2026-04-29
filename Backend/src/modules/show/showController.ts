import { groupShowsByTheatreAndMovie } from './../../utils/index';
import { Request, Response } from "express";
import { generateSeatLayout } from "../../utils";
import { Show } from "./showModel";
import { showSchema } from "./showValidation";

export const createShow = async(req:Request,res:Response)=>{
    try {
        const parsed = showSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                msg:"Invalid data",
                errors:parsed.error
            })
        }
        const seatLayout = generateSeatLayout();
        const showToCreate = {...req.body, seatLayout} 
        await Show.create(showToCreate)
        return res.status(201).json({
            msg:"Show created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in createShow BE"
        })
    }
}

export const getShowByMovieStateLocation = async(req:Request,res:Response)=>{
    try {
        const {movieId} = req.params;
        const {date, location} = req.query;
        const start = new Date(date as string);
        const end = new Date(date as string);
        end.setDate(end.getDate()+1); // end date ko +1 kra hai startDate ke bss ye h
        const shows = await Show.find({
          movie: movieId, //Iska matlab shows me Vo movie find kro jis movie ki id is MovieId
          location: location as string,
          date: { $gte: start, $lt: end } //$gte is greater than and $lt is less than 
        }).populate("movie theater").sort({ startTime: 1 });
        if(!shows || shows.length === 0) return res.status(404).json({
            msg:"No show available"
        })
        const groupedShow = groupShowsByTheatreAndMovie(shows);
        return res.status(200).json({
            groupedShow
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in getShowByMovieDateLocation BE"
        })
    }
}

export const getShowById = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const show = await Show.findById(id).populate("movie theater");
        if(!show){
            return res.status(404).json({
                msg:"No show found"
            })
        }
        return res.status(200).json({
            show
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in getShowById BE"
        })
    }
}


 //This is the ATOMIC property the race condition ki booked hai ya available 
 //agar 2 users click at same time then only 1 gets to update coz we have written updateOne and also in which we are checking AVAILBLE
export const updateSeatStatus = async (req: Request, res: Response) => {
  try {
    const {showId} = req.params;
    const {row,seatNumber,seatStatus} = req.body;
    const result = await Show.updateOne(
      {
        _id: showId,
        "seatLayout.row": row, //means its gonna find that in show with showId find the row with given row like "A","B" or whaat row
        "seatLayout.seats": {  //And here we are findnig the seat by number and it should be available like if !available then we cant book
          $elemMatch: {
            number: seatNumber,
            status: "AVAILABLE"
          }
        }
      },
      {
        $set: {
          "seatLayout.$[r].seats.$[s].status": seatStatus //Agar available hai to we gonna set the status to given status and $r is row and $s is seat 
        }
      },
      {
        arrayFilters: [
          { "r.row": row },
          { "s.number": seatNumber }
        ]
      }
    );
    if (result.modifiedCount === 0){
      return res.status(400).json({
        message: "Seat not available or already booked"
      });
    }
    return res.status(200).json({ message: "Seat updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};