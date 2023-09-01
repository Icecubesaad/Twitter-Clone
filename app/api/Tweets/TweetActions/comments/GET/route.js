import Tweet_model from "@/server/models/Tweet";
import Tweet_comments_model from "@/server/models/TweetComments";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function GET(req,res){
    const url = new URL(req.url)
    const limit = url.searchParams.get("limit")
    const skip = url.searchParams.get("skip")
    const id = url.searchParams.get("id")
    console.log(url)
    try {
        console.log(id)
        await dbConnect();
        const data = await Tweet_comments_model.find({OriginalTweet:id}).limit(limit).skip(skip)
        if(!data){
            return NextResponse.json({message:"no replies"},{status:401})
        }
        return NextResponse.json({
            message : {data : data}
        },
        {
            status : 200
        })
    } catch (error) {
        return NextResponse.json({
            message : error
        },
        {
            status : 400
        })
    }

}