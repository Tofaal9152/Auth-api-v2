import express from 'express'
import { all_GET, profile, login, register } from '../controllers/user.js'

const router = express.Router()

router.get('/all', all_GET)
router.post('/register', register)
router.post('/login',login)
router.get("/myprofile",profile)


export default router