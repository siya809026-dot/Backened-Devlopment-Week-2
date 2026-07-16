import React, { useEffect, useState } from 'react'

import {io}from "socket.io-client"
const socket = io("http://localhost:3000")

function App() {



  const [message,setMessage] = useState("")
  const [room,setRoom] = useState("")
  const [messageHistory,setMessageHistory] = useState([])
  const [socketID,setSocketID] = useState("")
  const [roomName,setRoomName] = useState("")
  const [joinMessage,setJoinMessage] = useState("")

  const handleRoomChat = (e)=>{
    e.preventDefault();

    socket.emit("join-room",roomName)
    setRoomName("")


  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    // socket.emit("user-to-all",message)

    socket.emit("individual-message",{message,room})
    setMessage("")
    setRoom("")
  }

  useEffect(()=>{

    socket.on("connect",()=>{
      console.log("User Connected :",socket.id)
      setSocketID(socket.id)
    })

    // socket.on("message",(msg)=>{
    //   console.log(msg)
    // })

    // socket.on("sendingtoall",(data)=>{
    //   console.log(data)
    // })

    //  socket.emit("sendingtoallfrontend","Hello for all (Frontend)")

    //  socket.on("receive-message",(data)=>{
    //   console.log("frontend:",data)
    //  })


    //  socket.on("server-to-all",(msg)=>{
    //   console.log(msg)
    //  })


    socket.on("server-to-individual",(msg)=>{
      console.log(msg)

      setMessageHistory((prev)=>([...prev,msg]))
    })

    socket.on("joining",(msg)=>{
      setJoinMessage(msg)
    })

    return ()=> {
      socket.disconnect()
    }


    
},[])
  return (
    <div>

      <h3>{socketID}</h3>

          <form onSubmit={handleRoomChat}>

        <input type="text" placeholder='Room name' value={roomName} onChange={(e)=>setRoomName(e.target.value)}/>

       
        <button type='submit'>Join Room</button>
      </form>

      <br />
     

      <form onSubmit={handleSubmit}>

        <input type="text" placeholder='Write a message' value={message} onChange={(e)=>setMessage(e.target.value)}/>

          <input type="text" placeholder='Enter room ID' value={room} onChange={(e)=>setRoom(e.target.value)}/>
        <button type='submit'>Send</button>
      </form>


      <div>
     
          {messageHistory.map((item,index)=>{
           return <p key={index}>{item}</p>
          })}
        
      </div>

      {joinMessage && <h3>{joinMessage}</h3>}
    </div>
  )
}

export default App