import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import router from './src/routes';
import connectDb from './src/config/db';
const app = express();
const port =process.env.PORT


connectDb();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use('/app/api/v1',router);


app.listen(port,()=>{
    console.log(`listening on port :${port} ` )
})