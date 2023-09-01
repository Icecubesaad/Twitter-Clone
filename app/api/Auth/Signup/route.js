import { NextResponse } from "next/server"
import dbConnect from "@/server/utils/database";
import User_model from "@/server/models/UserSchema";
const bcrypt = require("bcryptjs")
export async function POST(req,res){
    await dbConnect()
    try {
        const data =await req.json();
        const {Email, Password,User_Name, User_tag,Image} = data;
        const salt = await bcrypt.genSaltSync(10)
        const hashed_password = await bcrypt.hash(Password,salt) 
        await User_model.create({
            "Email" : Email,
            "Password" : hashed_password,
            "User_Name" : User_Name,
            "User_tag" : User_tag,
            "Image":Image,
            "NewNotifications":0,
            'Followers':0,
            'Following':0
        })
        return NextResponse.json({
            message : 'success'
        },
        {
            status  : 200
        })
    } catch (error) {
        return NextResponse.json({
        "message" : error
        })
    }
}