import express from 'express'
import { createShow, getShowById, getShowByMovieDateLocation, updateSeatStatus } from './showController';
const route = express.Router();

route.post("/", createShow)
route.get("/", getShowByMovieDateLocation)
route.get("/:id", getShowById)
route.put("/:showId", updateSeatStatus)

export default route;