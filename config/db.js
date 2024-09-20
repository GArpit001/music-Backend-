import mongoose from "mongoose"

const connectDataBase =  () =>{


    try{
        const co = mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Connected to MongoDB successfully")
    }catch(err){
        console.log("Connection Failed : " , err.message)
    }

}

export default connectDataBase