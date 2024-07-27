import express from 'express'
import { all_GET, profile, login, register, logout } from '../controllers/user.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login',login)
router.get('/logout',logout)
router.get("/myprofile",isAuthenticated,profile)


export default router