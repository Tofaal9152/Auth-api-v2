import { User_Model } from "../models/user.js"
import jwt from "jsonwebtoken"
import {sendRequest } from "../utils/features.js"

export const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies
    if (!token) {
        return sendRequest(res, false, 404, "Log in first")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User_Model.findById(decoded._id)
    next()
}
