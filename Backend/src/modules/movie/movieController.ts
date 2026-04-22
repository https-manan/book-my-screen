import {Request,Response } from "express";
import { Movie } from "./movieModel";
import { movieSchema } from "./movieValidation";
import { uploadImage } from "../../cloudinary/cloudinaryEndPoints";
import fs from 'fs'

export const createMovie = async (req:Request,res:Response)=>{
    try {
        const parsed = movieSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                msg: "Invalid input",
                errors: parsed.error
            });
        }
        if(!req.file){
            return res.status(400).json({
                msg:"Image is required"
            })
        }
        const imagePath=req.file.path;
        const result =await uploadImage(imagePath);
        fs.unlinkSync(imagePath) //This is to del the image from my local folder after being uploaded
        const movie = await Movie.create({...req.body, posterUrl: { public_id: result.public_id, secure_url: result.secure_url }})
        return res.status(201).json({
            movie,
            msg:"Movie created successfully."
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error in createmovie BE"
        })
    }
}

export const getAllMovies=async(_:any,res:Response)=>{
    try {
        const allMovies = await Movie.find();
        if(allMovies.length===0){
            return res.status(404).json({
                msg:"No movie found"
            })
        }
        return res.status(200).json({
            allMovies
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in getmovie BE"
        })
    }
}

export const getMoviesById =async(req:Request,res:Response)=>{
    try {
        const {id}= req.params;
        const movie = await Movie.findById(id);
        if(!movie){
            return res.status(404).json({
                msg:"No movie found"
            })
        }
        return res.status(200).json({
            movie
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Error in getmoviebyId BE"
        })
    }
}

export const getTopRecMovies = async(req:Request,res:Response)=>{
    try {
        const movies = await Movie.find().sort({rating:-1}).limit(10);
        if(movies.length===0){
            return res.status(404).json({
                msg:'no movie found'
            })
        }
        return res.status(200).json({
            movies
        })
    }catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error in recommendMovie BE" 
        })
    }
}