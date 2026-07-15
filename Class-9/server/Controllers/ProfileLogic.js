import User from "../models/user.js"

const UserProfile = async (req , res)=>{
    try {
        const userid = req.userid

        let user = await  User.findById(userid)

        if(!user){
            return res.status(404).json({
                success:false,
                message:'user not found....'
            })
        }

        res.status(200).json({
            success:true,
            message:'user found successfully...',
            user
        })

    } catch (error) {
        console.log(error)
            res.status(500).json({
                message:'server error',
                success:false
            })
    }
}

export {UserProfile}