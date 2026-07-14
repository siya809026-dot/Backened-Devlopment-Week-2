import express from 'express'

const app = express()

import connectDb from './database/mongodb.js'
import router from './routes/routes.js'

const port = 4000

app.use(express.json())

app.use(router)

connectDb()


app.listen(port, ()=>{
    console.log('server is running on port', port)
})