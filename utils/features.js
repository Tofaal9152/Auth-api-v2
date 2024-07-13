import jwt from "jsonwebtoken"

export const sendCookies = (User_Model, res, statusCode = 201, message = "Registered Successfully") => {

    const token = jwt.sign({ _id: User_Model._id }, process.env.JWT_SECRET)
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    }).json({
        success: true,
        message
    })
}