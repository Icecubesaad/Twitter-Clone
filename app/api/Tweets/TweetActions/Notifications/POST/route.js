import Tweet_model from "@/server/models/Tweet";
import Tweet_comments_model from "@/server/models/TweetComments";
import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req,res){
    
    try {
        await dbConnect();
        const payload = await req.json()
        
        const url = new URL(req.url)
        const query = url.searchParams.get("t")
       
        let TweetDetail;
        let action
        TweetDetail = await Tweet_model.findOne({_id : payload.id})
        if(!TweetDetail){
                TweetDetail = await Tweet_model.fineOne({_id : payload.id})
        }
        if(query==="c"){
            action = "c"
        }
        else{
            action = "l"
        }
        const Liked_by_user_details = await User_model.findOne({_id : payload.User_id})
        if(payload.author === Liked_by_user_details.User_tag){
            return NextResponse.json({message : "same user"},{status:402})
        }
        else{
            await User_model.findOneAndUpdate(
                {User_tag : payload.author},
                {$push : {
                    Notifications : {
                        id: payload.User_id,
                        image: Liked_by_user_details.Image,
                        name: Liked_by_user_details.User_tag,
                        Tweet: TweetDetail.Text,
                        About:action,
                        content: payload.content
                    }
                }
                },
                { $inc: { NewNotifications: 1 } },
                {new : true}
            )
            return NextResponse.json({message : "Success"},{status:200})
        }
    } catch (error) {
        return NextResponse.json({message : "Failed"},{status:400})
    }
}