import mongoose from 'mongoose';

async function connectDb(){
    try{
    await mongoose.connect('mongodb://localhost:27017/employeeSystem')
    console.log('database connect successfully......')
    }
    
    catch(error){
       console.log("failed to connect database",error)
       process.exit(1)

    }
}

export default connectDb