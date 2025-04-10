import express from "express";
const app = express()
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js"
// import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"

dotenv.config({ path: './src/.env' });
const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"https://localhost:5173/",
    credentials:true,
}));



app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

app.listen(PORT,()=>{
    console.log("server running on port : "+ PORT);

    connectDB()
})
