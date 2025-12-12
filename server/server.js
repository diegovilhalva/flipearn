import express from "express"
import "dotenv/config"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import listingRoutes from "./routes/listing.route.js"
import chatRoutes  from "./routes/chat.route.js"
const app = express()

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

const PORT = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.send("Server ok")
})

app.use("/api/inngest", serve({ client: inngest, functions }))
app.use("/api/listing", listingRoutes)
app.use("/api/chat",chatRoutes)

app.listen(4000, () => {
    console.log(`Server running on port: ${PORT}`)
})



