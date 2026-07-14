import jsonwebtoken from 'jsonwebtoken'
import User from '../models/user.js'

const auth = async(req , res, next)=>{
    try {
        let token = req.headers.authorization?.split(' ')[1]
        // console.log(' token', token)

        if(!token){
            return res.json({
                message:'user is not login ....'
            })
        }

        let payload = await jsonwebtoken.verify(token, 'studentKey')

        // console.log(payload.userid)

        req.userid = payload.userid
    
        next()
    } catch (error) {
        console.log(error) 
    }
}


const checkTeacherRole = async(req,res,next)=>{
    try {
    let userid = req.userid
    let user = await User.findById(userid)

    const  role = user.role

    if(role != 'Teacher'){
        return res.status(401).json({
            success:false,
            message:'you are not teacher'
        })
    }

    next()
    } catch (error) {
            console.log(error)
    }
}
 
const checkStudentRole = async(req,res,next)=>{
    try {
    let userid = req.userid
    let user = await User.findById(userid)

    const  role = user.role

    if(role != 'Student'){
        return res.status(401).json({
            success:false,
            message:'you are not Admin'
        })
    }

    next()
    } catch (error) {
            console.log(error)
    }
}
 


export { auth  , checkTeacherRole, checkStudentRole}