import mongoose from "mongoose";

export const Database = async () => {
    await mongoose.connect(process.env.DATABASE_URI, {
        dbName: "api"
    }).then(() => console.log("connected")).catch(() => console.log("disconnected"))
}