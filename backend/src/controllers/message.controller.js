import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserForSidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id ;
        const filteredUsers = await User.find({_id:{$ne:user._id}}).select("-password");

        res.status(201).json(filteredUsers)
    } catch (error) {
        console.log("error in getusersidebar: ", error.message);
        res.status(500).json({message:"Internal server Error"})
    }
}

export const getMessages = async (req,res)=>{
    try {
        const userToChatId = req.params;
        const myId = req.user._id;
        
        const message = await Message.find({
            $or:[
                {senderId:userToChatId,recieverId:myId},
                {senderId:myId,recieverId:userToChatId}
            ]
        })
        res.status(200).json(message);
    } catch (error) {
        console.log("error in getMessages controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
        
    }
}

export const sendMessages = async(req,res)=>{
    try {
        const {text,image} = req.body;
    const { id:recieverId} = req.params;
    const senderId = req.user._id

    if (image){
        const uploadResponse = await cloudinary.uploader.upload(image);

        const imageUrl = uploadResponse.secure_url;

    }

    const newMessage  = new Message({
        senderId,
        recieverId,
        text,
        image:imageUrl,
    })

    await newMessage.save();

    // websocket

    res.status(200).json(newMessage);
    } catch (error) {
        console.log("error in sendMessages controller", error.message);
        res.status(500).json({message:"Internal server error"}); 
    }

}
