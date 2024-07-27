import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export const Task_Model = mongoose.model('Task_Info', Schema);
