import { generatetoken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const signup = async (req,res)=>{
    const {fullname,email,password} = req.body
    try {
        if (password < 6){
            return res.status(400).json({message:"Password must be at least of 6 characters"})
        }

        const user = await User.findOne({email})

        if (user) return res.status(400).json({message:"User Already Exists"})
        
        const salt  = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(password,salt);

        const newUser = new User ({
            fullName,
            email,
            password:hashedPwd,

        })

        if(newUser){
            // web token generates here
            generatetoken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName : newUser.fullName,
                email: newUser.email,
                profilePic : newUser.profilePic,
            }); 
        }
        else{
            res.status(400).json({message:"Invalid User Data"})
        }

    } catch (error) {
        console.log("error in signin controller",error.message)
        res.status(500).json({message:"Internal server error"})
        
    }
}

export const login = (req,res)=>{
    res.send("login route")
}

export const logout  =(req,res)=>{
    res.send("logout route")
}
