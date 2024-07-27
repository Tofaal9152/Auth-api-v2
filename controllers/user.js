import bcrypt from "bcrypt"
import { User_Model } from '../models/user.js'
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
            return sendRequest(res, false, 409, "Invalid Email Or Password")
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return sendRequest(res, false, 409, "Invalid Email Or Password")
        }
        sendCookies(user, res, 201, "Welcome Back")
    } catch (error) {
        sendRequest(res, false, 500, "Internal Server Error login")
    }
}
export const logout = (req, res) => {
    res.status(200).cookie("token", "", { expires: new Date(0) }).json({
        success: true,
        message: "Log out succesfull"
    })
}
export const profile = async (req, res) => {
    try {
        if (!req.user) {
            return sendRequest(res, false, 500, "user not found")
        }
        sendRequest(res, true, 201,req.user)
    } catch (error) {
        sendRequest(res, false, 500, "Internal Server Error Profile")
    }
}
