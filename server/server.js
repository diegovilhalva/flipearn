import express from "express"
import "dotenv/config"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'

const app = express()

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

const PORT = process.env.PORT || 4000

app.get("/",(req,res) =>{
    res.send("Server ok")
})

app.listen(4000,() => {
    console.log(`Server running on port: ${PORT}`)
})



