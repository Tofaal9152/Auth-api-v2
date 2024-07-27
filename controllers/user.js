import bcrypt from "bcrypt"
import { User_Model } from '../models/user.js'
import { sendCookies, sendRequest } from "../utils/features.js"
import ErrorHandlers from "../middlewares/error.js"


export const all_GET = async (req, res, next) => {

}
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        let user = await User_Model.findOne({ email })

        if (user) return next(new ErrorHandlers("user already exist", 404))

        const hashPassword = await bcrypt.hash(password, 10)
        user = await User_Model.create({ name: name, email: email, password: hashPassword })
        sendCookies(user, res, 201, "Registered Successfully")
    } catch (error) {

        sendRequest(res, false, 500, "Internal Server Error register")
    }

}
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User_Model.findOne({ email }).select("+password")

        if (!user) return next(new ErrorHandlers("Invalid Email", 404))

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) return next(new ErrorHandlers("Invalid Password", 404))

        sendCookies(user, res, 201, "Welcome Back")
    } catch (error) {
        sendRequest(res, false, 500, "Internal Server Error login")
    }
}
export const logout = (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(0),
        sameSite: process.env.NODE_ENV === "developement" ? "lax" : "none",
        secure: process.env.NODE_ENV === "developement" ? false : true,
    }).json({
        success: true,
        message: "Log out succesfull"
    })
} 
export const profile = async (req, res, next) => {
    try {
        if (!req.user) return next(new ErrorHandlers("user not found", 404))

        sendRequest(res, true, 201, req.user)
    } catch (error) {
        sendRequest(res, false, 500, "Internal Server Error Profile")
    }
}
