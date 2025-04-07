import jwt from "jsonwebtoken";

export const generatetoken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    })

    res.cookie("token", token, {
        httpOnly: true,       // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "strict",   // Prevents CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });



    return token
}