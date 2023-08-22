import Tweet_model from "@/server/models/Tweet";
import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req,res){
    console.log("Posting notifications")
    try {
        await dbConnect();
        const payload = await req.json()
        const TweetDetail = await Tweet_model.findOne({_id : payload.id})
        const Liked_by_user_details = await User_model.findOne({_id : payload.User_id})
        await User_model.findOneAndUpdate(
            {User_tag : payload.author},
            {$push : {
                Notifications : {
                    id: payload.User_id,
                    image: Liked_by_user_details.Image,
                    name: Liked_by_user_details.User_tag,
                    Tweet: TweetDetail.Text,
                }
            }
            },
            {new : true}
        )
        return NextResponse.json({message : "Success"},{status:200})
    } catch (error) {
        return NextResponse.json({message : "Failed"},{status:400})
    }
}