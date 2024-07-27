import jwt from "jsonwebtoken"

export const sendCookies = (user, res, statusCode, message) => {

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "developement" ? "lax" : "none",
        secure: process.env.NODE_ENV === "developement" ? false : true,
    }).json({
        success: true,
        message
    })
}

export const sendRequest = (res, value, statusCode, message) => {

    res.status(statusCode).json({
        success: value,
        message
    })
}
