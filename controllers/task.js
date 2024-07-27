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

        sendRequest(res, false, 404, "Task added Failled")
    }
}
export const myTask = async (req, res, next) => {
    try {
        req.task = await Task_Model.find({ user: req.user._id })
        if (!req.task) {
            return sendRequest(res, false, 500, "task not found")
        }

        sendRequest(res, true, 200, req.task)
    } catch (error) {

        sendRequest(res, false, 404, "Task Does not founded")
    }
}
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task_Model.findById(req.params.id)

        if (!task) {
            return sendRequest(res,false,200,"Task not found")
        }
        task.isCompleted = !task.isCompleted
        await task.save()

        sendRequest(res, true, 200, "Task Updated")
    } catch (error) {

        sendRequest(res, false, 404, "Task Updated Failed")
    }
}
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task_Model.findById(req.params.id)

        if (!task) {
            return sendRequest(res,false,200,"Task not found")
        }

        await task.deleteOne()

        sendRequest(res, true, 200, "Task Deleted")
    } catch (error) {

        sendRequest(res, false, 404, "Task Deleted Failed")
    }
}