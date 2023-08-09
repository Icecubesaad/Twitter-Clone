import Tweet_model from "@/server/models/Tweet";
import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req,res){
    await dbConnect()
    try {
        const payload = await req.json();
        const Increase = {$inc : {Likes : 1}}
        const decrease = {$inc : {Likes : -1}}
        if(payload.mode === "like"){
            await Tweet_model.findOneAndUpdate({_id:payload.id},Increase,{new:true}).limit(1)
            await User_model.findOneAndUpdate({_id:payload.User_id},{$push : {Like_list:payload.id}},{new:true})
            return NextResponse.json({message:"success"},{status:200})
        }
        if(payload.mode === "dislike"){
            await Tweet_model.findOneAndUpdate({_id:payload.id},decrease,{new:true}).limit(1)
            await User_model.findOneAndUpdate({_id:payload.User_id},{$pull : {Like_list:payload.id}},{new:true})
            return NextResponse.json({message:"success"},{status:200})
        }
    } catch (error) {
        return NextResponse.json({message:error},{status:400})
    }
}