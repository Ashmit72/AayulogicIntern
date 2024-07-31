import mongoose from "mongoose";

export const connectDB=async(url)=>{
return mongoose.connect(url).then(()=>{
    console.log("Database Connected!");
}).catch((error)=>{
    throw new Error("Database Failed to connect: "+error.message)
})
}