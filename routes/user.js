import express from 'express'
import { all_GET, all_id_id_GET, login, register } from '../controllers/user.js'

const router = express.Router()

router.get('/all', all_GET)
router.post('/register', register)
router.post('/login',login)


router.route('/id/:id').get(all_id_id_GET)


export default router