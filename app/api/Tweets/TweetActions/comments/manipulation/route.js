import Tweet_model from "@/server/models/Tweet";
import Tweet_comments_model from "@/server/models/TweetComments";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try {
        console.log("increasing the amount of comments")
        await dbConnect()
        const payload = await req.json()
        const {id} = payload
        const Increase = { $inc: { Comments: 1 } };
        const found_in_Tweets = await Tweet_model.findOneAndUpdate({_id:id},Increase,{new:true})
        if(!found_in_Tweets){
            console.log("coudlnt find it in the main db finding it in comments model")
            const found_in_Tweets_comments = await Tweet_comments_model.findOneAndUpdate({_id:id},Increase,{new:true})
            if(found_in_Tweets_comments){
                return NextResponse.json({message:"success"},{status:200})
            }
            else{
                return NextResponse.json({message:"Invalid ID"},{status:400})
            }
        }
        if(found_in_Tweets){
            return NextResponse.json({message:"success"},{status:200})
        }
    } catch (error) {
        return NextResponse.json({message:error},{status:400})
    }
        
}