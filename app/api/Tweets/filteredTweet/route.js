import Tweet_model from "@/server/models/Tweet";
import Tweet_comments_model from "@/server/models/TweetComments";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req,res){
    const url = new URL(req.url)
    const query = url.searchParams.get("t");
    try {
        await dbConnect()
        const data=await req.json()
        if(query==='c'){
            const tweet = await Tweet_comments_model.findOne({_id:data}).limit(1)
            if(tweet){
                return NextResponse.json({message:tweet},{status:200})
            }
            else{
                return NextResponse.json({message:"couldnt find any tweet with this id"},{status:404})
            }
        }
        else{
            const tweet = await Tweet_model.findOne({_id:data}).limit(1)
            if(tweet){
                return NextResponse.json({message:tweet},{status:200})
            }
            else{
                return NextResponse.json({message:"couldnt find any tweet with this id"},{status:404})
            }
        }
    } catch (error) {
        return NextResponse.json({message:error},{status:400})
    }
}