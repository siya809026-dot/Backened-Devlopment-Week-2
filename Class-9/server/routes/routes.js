import express from 'express'
import { login, signup, } from '../controllers/userLogic.js'
import { UserProfile } from '../controllers/ProfileLogic.js'
import {getStudent, getteacher, getuser} from '../Controllers/studentLogic.js'
// import {auth} from '../middleware/auth.js'
import { auth, checkStudentRole,checkTeacherRole} from '../middleware/auth.js'
const router = express.Router()


router.post('/signup', signup)

router.post('/login', login)

router.get('/getuser',auth,getuser)
router.get('/getTeacher',auth, checkTeacherRole, getteacher)
router.get('/getStudent',auth, checkStudentRole, getStudent)

router.get('/profile', auth,  UserProfile)

export default router

// import express from 'express'
// import { login, signup } from '../controllers/userLogic.js'
// import { getuser } from '../controllers/studentLogic.js'
// import { auth} from '../middleware/auth.js'

// const router = express.Router()

// router.post('/signup', signup)

// router.post('/login', login)


// router.get('/getuser', auth,  getuser )



// export default router