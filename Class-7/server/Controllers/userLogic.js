import User from "../models/User.js";

const createuser = async (req, res) => {
  try {
    const { name, email, empId } = req.body;

    const user = await User.create({ name, email, empId });
    //User.create() Mongoose ka method hai jo data insert karta hai
    console.log(user);

    // send response to user
    return res.status(200).json({
      success: true,
      message: "data created successfully",
      user,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error occurred",
      error: error.message,
    });
  }
};
const getuser = async(req,res)=>{
  try{
     const user = await User.find()

     if(!user){
      return res.status(404).json({
        message:'data not found.....',
        success:false,
      })
     }
     res.status(200).json({
      success:true,
      user
     })
  } catch(error){
    res.status(500).json({
      success:'false',
      message:'server error',error
    })
  }
}

const updateUser = async(req,res)=>{
    try {
         const {name, email, empId} = req.body

        let {userid} = req.params

        let user = await User.findById(userid)

        if(!user){
            return res.status(404).json({
                message:'user not found...',
                success:false
            })
        }

        let updatedUser = user


        if(name){
            updatedUser = await User.findByIdAndUpdate(userid, {name}, {new:true})
        }
        
        if(email){
            updatedUser = await User.findByIdAndUpdate(userid, {email}, {new:true})

        }

        if(empId){
            updatedUser = await User.findByIdAndUpdate(userid, {empId}, {new:true})

        }


        res.status(200).json({
            message:'data updated successfully...',
            updateUser,
            success:true
        })

    } catch (error) {
            res.status(500).json({
                message:'failed to updated data internal server error',
                success:false
            })
    }
}



const deleteUser = async (req,res)=>{
    try {
        const {userid} = req.params

       let deleteduser = await  User.findByIdAndDelete(userid)

       res.status(200).json({
        success:true,
        message:'user deleted successfully....',
        deleteUser
       })
       
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'failed to delete user'
        })
    }

}



export { createuser,getuser,updateUser,deleteUser };