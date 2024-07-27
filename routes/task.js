import express from 'express'
import { deleteTask, myTask, newTask, updateTask } from '../controllers/task.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post('/newtask',isAuthenticated,newTask)
router.get('/mytask', isAuthenticated, myTask)
router.route('/:id').put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)

export default router