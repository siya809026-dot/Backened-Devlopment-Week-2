import express from "express"
import { Server } from "socket.io";  
import {createServer} from "http"

const PORT = 3000
const app = express();

const server = createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})

// to create a socket io connection
io.on("connection",(socket)=>{
    console.log("User Connected:",socket.id)

    // socket.emit("message","Aur Bhaii ki haal hai")

    // io.emit("sendingtoall","Hello for all")

    socket.on("sendingtoallfrontend",(msg)=>{
        io.emit("receive-message",msg)
    })

// // to receive "to all" invoked message  and send messages to all
    // socket.on("user-to-all",(msg)=>{
    //     // io.emit("server-to-all",msg) // sending message to all including that sender
    
    //     socket.broadcast.emit("server-to-all",msg) //sending message to all excluding that sender
    // })


    // to receive invoked message and send messages to specifc person

    socket.on("individual-message",({message,room})=>{

        io.to(room).emit("server-to-individual",message) // to send messages  to specifc person

    })


    //to get the room name or id and send has joined message
    socket.on("join-room",(roomName)=>{
        socket.join(roomName)

        io.to(roomName).emit("joining",`${socket.id} has joined this group`)
    })


    //disconnection

    socket.on("disconnect",()=>{
        console.log("user disconnected : ",socket.id)
    })
})


server.listen(PORT,()=>{
    console.log(`App is running on port : ${PORT}`)
})