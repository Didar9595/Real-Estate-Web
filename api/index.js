import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/user.route.js'

mongoose.connect("mongodb://localhost:27017/RealEstate").then(()=>{
    console.log("Database is Connected")
}).catch(err=>{
    console.log(err)
})

const app=express()

app.listen(3000,()=>{
    console.log("Server is Running")
})

app.use("/api/user",userRouter)