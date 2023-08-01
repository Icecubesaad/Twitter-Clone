import middleware from "@/server/middleware";
import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req,res){
    await dbConnect()
    const data = await req.json()
    const response = await middleware(data)
    const user_info = await User_model.findOne({_id : response.id})
    return NextResponse.json({
        message : user_info,
    },
    {
        status : 200
    })
}