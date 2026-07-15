import express, { application } from 'express'
import {Server} from 'socket.io';

import {createServer}from "http"
const app = express();
const server = createServer(app)
// express application object
const port = 3000

const io = new Server(server,{
 cors:{
    origin:"*"
 }
})
io.on('connection',(socket)=>{
    console.log('user connected',socket.id)
    // socket.emit("message","Aur bhai ki haal hai")   
    // io.emit("siya","siya are you feeling well")

    socket.on("siyah",(msg)=>{
        io.emit("receive-message",msg)
    })
})
server.listen(port,()=>{
    console.log(`app is running on port`,port)
})