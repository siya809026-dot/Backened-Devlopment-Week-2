import express from "express"

import {createuser,getuser, updateUser,deleteUser} from '../Controllers/userLogic.js'

const router = express.Router()

router.post('/createuser',createuser)
router.get('/getuser',getuser)
router.put('/updateuser/:userid',updateUser)
router.delete('/deleteuser/:userid',deleteUser)

export default router