import { NextResponse } from "next/server"
import dbConnect from "@/utils/database";
import User_model from "@/models/UserSchema";
const bcrypt = require("bcryptjs")
export async function POST(req,res){
    console.log("reaCHED HERE MAN")
    await dbConnect()
    try {
        const data =await req.json();
        const {Email, Password,User_Name, User_tag} = data;
        const salt = await bcrypt.genSaltSync(10)
        const hashed_password = await bcrypt.hash(Password,salt) 
        await User_model.create({
            "Email" : Email,
            "Password" : hashed_password,
            "User_Name" : User_Name,
            "User_tag" : User_tag
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