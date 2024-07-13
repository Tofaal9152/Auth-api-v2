import { app } from "./app.js";
import { Database } from './data/database.js'
Database()

app.listen(process.env.PORT, () => {
    console.log(`server is running`)
})