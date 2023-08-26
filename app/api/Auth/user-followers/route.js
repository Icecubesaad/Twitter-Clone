import notifications from "@/server/middleware/notifications";
import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try {
        console.log("FOLLOWERS REQUEST")
        await dbConnect()
        const payload = await req.json()
        console.log(payload)
        const increase = {$push : {Follower_list:payload.id}} 
        const updating = await User_model.findOneAndUpdate({User_tag : payload.author},increase,{new:true})
        if(updating){
            const posting_notify = notifications(payload.author,payload.name,payload.image,payload.id,"fr")
            if(posting_notify){
                console.log("POSTED NOTIFICATIONS")
                return NextResponse.json({message:"Success"},{status:200})
            }
            else{
                return NextResponse.json({message:"error"},{status:400})
            }
        }
        else{
            return NextResponse.json({message:"error"},{status:400})
        }
    } catch (error) {
        return NextResponse.json({message:error},{status:400})
    }
}