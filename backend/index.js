import express from "express"
import mongoose from "mongoose";
import  dotenv  from "dotenv";
import cookie from "cookie-parser"
dotenv.config()
import userroute from "./routes/userroute.js"
import authroute from './routes/authroute.js'
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookie())

app.use("/api/user",userroute)
app.use("/api/auth",authroute)

app.use((err,req,res,next)=>{
    const statuscode = err.statuscode || 500
    const message = err.message || "Internal Server Error"
    res.status(statuscode).json({
        success:false,
        statuscode,
        message,
    })
})

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connect success");
})
.catch((err)=>{
    console.log(console.error(err));
})


const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log("server is running on port 3000");
})