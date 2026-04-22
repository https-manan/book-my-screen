import { Request, Response } from "express";
import { Theater } from "./theaterModel";
import { TheaterSchema } from "./theaterValidation";
import { uploadImage } from "../../cloudinary/cloudinaryEndPoints";
import fs from 'fs';

export const createTheater = async (req: Request, res: Response) => {
  try {
    const parsedData = TheaterSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        msg: "Invalid data",
        errors: parsedData.error
      });
    }
    if (!req.file) {
      return res.status(400).json({ msg: "Logo image is required" });
    }
    const logo = req.file?.path;
    const result = await uploadImage(logo);
    fs.unlinkSync(logo!);
    const theater = await Theater.create({ ...req.body, logo: { public_id: result.public_id, secure_url: result.secure_url } });
    return res.status(201).json({
      msg: "Theater created successfully",
      theater
    });

  } catch (error) {
    console.error("CreateTheater Error:", error);

    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};



export const getAllTheater = async (_: Request, res: Response) => {
  try {
    const allTheaters = await Theater.find();

    return res.status(200).json({
      allTheaters
    });

  } catch (error) {
    console.error("GetAllTheater Error:", error);

    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};



export const getTheaterByState = async (req: Request, res: Response) => {
  try {
    const { state } = req.query;
    if (!state) {
      return res.status(400).json({
        msg: "State query parameter is required"
      });
    }
    const theaters = await Theater.find({
      state: state as string
    });
    if(theaters.length === 0){
      return res.status(404).json({ msg: "No theater found in your state" });
    }
    return res.status(200).json({
      theaters
    });
  } catch (error) {
    console.error("GetTheaterByState Error:", error);

    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};