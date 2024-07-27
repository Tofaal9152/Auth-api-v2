import ErrorHandlers from "../middlewares/error.js"
import { Task_Model } from "../models/task.js"
import { sendRequest } from "../utils/features.js"

export const newTask = async (req, res, next) => {
    try {

        const { title, description } = req.body

        await Task_Model.create({
            title: title,
            description: description,
            user: req.user
        })
        sendRequest(res, true, 201, "Task added successfully")
    } catch (error) {

        next(error)
    }
}
export const myTask = async (req, res, next) => {
    try {
        req.task = await Task_Model.find({ user: req.user._id })
        if (!req.task) return next(new ErrorHandlers("task not found", 404))
        sendRequest(res, true, 200, req.task)
    } catch (error) {

        next(error)
    }
}
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task_Model.findById(req.params.id)

        if (!task) return next(new ErrorHandlers("task not found", 404))

        task.isCompleted = !task.isCompleted
        await task.save()

        sendRequest(res, true, 200, "Task Updated")
    } catch (error) {
        next(error)
    }


}
export const deleteTask = async (req, res, next) => {
    try {
       
        const task = await Task_Model.findById(req.params.id)

        // if (!task) return next(new ErrorHandlers("task not found for delete", 404))
        if (!task) return next(new ErrorHandlers())

        await task.deleteOne()

        sendRequest(res, true, 200, "Task Deleted")
    } catch (error) {
        next(error)
    }

}