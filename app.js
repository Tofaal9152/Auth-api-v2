import { config } from 'dotenv';
import express from 'express'
import userRoute from "./routes/user.js";
import cookieParser from 'cookie-parser';

config({
    path:"./.env"
})

export const app = express()

app.use(express.json())
app.use(cookieParser())

// Routers
app.use("/api/v1/user",userRoute)

