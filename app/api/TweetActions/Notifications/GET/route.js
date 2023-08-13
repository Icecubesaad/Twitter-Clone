import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req,res){
    try {
        await dbConnect()
        const payload = await req.json()
        const Notifications = await User_model.find({_id : payload.id},{User_Name:0, User_tag:0, Email:0, Image:0, Password:0, Like_list:0, Follower_list:0, Following_list:0, NewNotifications:0,_id : 0})
        return NextResponse.json({message: Notifications},{status : 200})
    } catch (error) {
        return NextResponse.json({message : error},{status : 400})
    }

}