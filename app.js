import express from 'express'
// 
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js";
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { errormiddleware } from './middlewares/error.js';
config({
    path:"./.env"
})
// start
const app = express()
app.use(express.json())
app.use(cookieParser())

// Routers
app.use("/api/v1/user",userRoute)
app.use("/api/v1/task", taskRoute)
// error handelling
app.use(errormiddleware)


export default app
