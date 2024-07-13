import { config } from 'dotenv';
import express from 'express'
import userRoute from "./routes/user.js";

config({
    path:"./.env"
})
export const app = express()
app.use(express.json())

// Routers
app.use("/api/v1/user",userRoute)

