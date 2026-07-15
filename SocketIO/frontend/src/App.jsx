
import react from 'react'
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("User connected:", socket.id);
    });

    // socket.on("message", (msg) => {
    //   console.log(msg);
    // });
    socket.on("siya",(data)=>{
      console.log(data)
    })
    socket.emit("siyah","siya are you feeling well")
    socket.on("receive-message",(msg)=>{
      console.log(msg)
    })

  }, []);

  return <div>App</div>;
}

export default App;
