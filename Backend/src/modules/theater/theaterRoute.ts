import express from "express"
import { createTheater, getAllTheater, getTheaterByState } from "./theaterController";
const route = express.Router();

route.post('/create',createTheater);
route.get('/all',getAllTheater);
route.get('/theaters',getTheaterByState); //and from the FE we gonna hit this end point with ?state="jo bhi hogi"

export default route;