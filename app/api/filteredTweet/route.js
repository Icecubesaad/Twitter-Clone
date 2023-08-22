import Tweet_model from "@/server/models/Tweet";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try {
        await dbConnect()
        const data=await req.json()
        const tweet = await Tweet_model.findOne({_id:data}).limit(1)
        if(tweet){
            return NextResponse.json({message:tweet},{status:200})
        }
        else{
            return NextResponse.json({message:"couldnt find any tweet with this id"},{status:404})
        }
    } catch (error) {
        return NextResponse.json({message:error},{status:400})
    }
}