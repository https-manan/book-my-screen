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

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(cookieParser());
app.use('/app/api/v1',router);


//Here we gonna create the socket server

const httpServer= http.createServer(app)  //app.listen bhi httpServer pr he hoga same as that of socket server
const io=new Server(httpServer,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET","POST"],
        credentials:true
    }
})

io.on('connection',(socket)=>{
    console.log("socket server connected with socketId"+socket.id)
    registerSocketHandler(socket,io)
    socket.on('disconnect',()=>{
        console.log('User disconnected successfully',socket.id)
    })
})


httpServer.listen(port,()=>{
    console.log(`listening on port :${port}`)
})

