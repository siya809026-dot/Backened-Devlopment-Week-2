import express from "express"

import {createuser} from '../Controllers/userLogic.js'

const router = express.Router()

router.post('/signup',createuser)
// router.get('/getuser',getuser)
// router.put('/updateuser/:userid',updateUser)
// router.delete('/deleteuser/:userid',deleteUser)

export default router