import express from 'express'
import connectDb from './database/mongodb.js' 
import router from './routes/userRoute.js'
import cors from 'cors'
const app = express()
app.use(cors({
    origin:"*",
    methods:['GET','POST','PUT','DELETE']
}))

app.use(express.json());
app.use(router)
const port = 4000
connectDb()
app.listen(port,()=>{
    console.log('server has started on port:',port)
})
 