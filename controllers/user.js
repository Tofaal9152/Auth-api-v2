import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { User_Model } from '../models/user.js'
import jwt from "jsonwebtoken"
import { sendCookies } from "../utils/features.js"


export const all_GET = async (req, res) => {

}
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        let user = await User_Model.findOne({ email })
        if (user) {
            return res.status(409).json({
                success: false,
                message: "user already exist"

            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        user = await User_Model.create({ name: name, email: email, password: hashPassword })
        sendCookies(User_Model,res,)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
    
}
export const login = async (req, res) => {

}
export const all_id_id_GET = async (req, res) => {

}
