import mongoose from "mongoose";

const User_Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: bool,
        default: false,

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export const User_Model = mongoose.model('User_Info', User_Schema);
