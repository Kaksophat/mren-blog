import exress from "express"
import mongoose from "mongoose";
import  dotenv  from "dotenv";
dotenv.config()
mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connect success");
})
.catch((err)=>{
    console.log(console.error(err));
})
const app = exress()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})