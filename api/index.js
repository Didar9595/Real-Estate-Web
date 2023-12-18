import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

mongoose.connect("mongodb://localhost:27017/RealEstate").then(()=>{
    console.log("Database is Connected")
}).catch(err=>{
    console.log(err)
})

const app=express()

app.use(express.json())

app.listen(3000,()=>{
    console.log("Server is Running")
})

app.use("/api/user",userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})