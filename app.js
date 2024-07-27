import express from 'express'
// 
import { all_GET } from './controllers/user.js';
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js";
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { errormiddleware } from './middlewares/error.js';
import cors from 'cors'
config({
    path: "./.env"
})
// start
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

// Routers
app.use("/",all_GET)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/task", taskRoute)
// error handelling
app.use(errormiddleware)


export default app
