import cors from 'cors';
import http from 'http'
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import router from './src/routes';
import connectDb from './src/config/db';
import cookieParser from 'cookie-parser';
const app = express();
const port =process.env.PORT
import "./src/config/redis"
import { Server } from 'socket.io';
import { registerSocketHandler } from './src/socket/sockethandler';


connectDb();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

const httpServer= http.createServer(app) 


const io = new Server(httpServer, {
    cors: {
        origin: CLIENT_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true
    }
})


app.use(express.json());
app.use(cookieParser());
app.use('/app/api/v1',router);


//Here we gonna create the socket server

 //app.listen bhi httpServer pr he hoga same as that of socket server

io.on('connection',(socket)=>{
    console.log("socket server connected with socketId"+socket.id)
    registerSocketHandler(socket,io)
    socket.on('disconnect',()=>{
        console.log('User disconnected successfully',socket.id)
    })
})



app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});


httpServer.listen(port,()=>{
    console.log(`listening on port :${port}`)
})

