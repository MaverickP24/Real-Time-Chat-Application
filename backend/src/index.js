import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js"
// import { connect } from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"

dotenv.config({ path: './src/.env' });
const PORT = process.env.PORT || 5000;

const app = express()

app.use(cookieParser());
app.use(express.json())


app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log("server running on port : "+ PORT);

    connectDB()
})
