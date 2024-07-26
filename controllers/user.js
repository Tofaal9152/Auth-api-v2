import bcrypt from "bcrypt"
import { User_Model } from '../models/user.js'
import jwt from "jsonwebtoken"
import { sendCookies, sendRequest } from "../utils/features.js"


export const all_GET = async (req, res) => {

}
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        let user = await User_Model.findOne({ email })
        if (user) {

            return sendRequest(res, false, 409, "user already exist")
        }
        const hashPassword = await bcrypt.hash(password, 10)
        user = await User_Model.create({ name: name, email: email, password: hashPassword })
        sendCookies(user, res, 201, "Registered Successfully")
    } catch (error) {

        sendRequest(res, false, 500, "Internal Server Error register")
    }

}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User_Model.findOne({ email }).select("+password")
        if (!user) {
            return sendRequest(res,true, 409, "Invalid Email Or Password")
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return sendRequest(res,true, 409, "Invalid Email Or Password")
        }
        sendCookies(user, res, 201, "Welcome Back")
    } catch (error) {
        sendRequest(res, false, 500, "Internal Server Error login")
    }
}
export const profile = async (req, res) => {
    try {
        const {token} = req.cookies
        if (!token) {
            sendRequest(res,false,404,"Not logged in")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        console.log(token);
        const user = await User_Model.findById(decoded._id)
        console.log(user);
        if (!user) {
            return sendRequest(res,false,500,"user not found")
        }
        res.status(201).json({
            success:true,
            user
        })
    } catch (error) {
        sendRequest(res,false, 500, "Internal Server Error Profile")
    }
}
