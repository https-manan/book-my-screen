import express from 'express'
import { createShow, getShowById, getShowByMovieDateLocation, updateSeatStatus } from './showController';
const route = express.Router();

route.post("/", createShow)
route.get("/movie/:movieId", getShowByMovieDateLocation) //Here in query date and loc
route.get("/:id", getShowById)
route.put("/:showId", updateSeatStatus)

export default route;