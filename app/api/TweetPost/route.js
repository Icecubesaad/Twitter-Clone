import middleware from "@/server/middleware"
import Tweet_model from "@/server/models/Tweet"
import User_model from "@/server/models/UserSchema"
import dbConnect from "@/server/utils/database"
import { NextResponse } from "next/server"
export async function POST(req,res){
    await dbConnect()
    try {
        const data = await req.json()
        const {Text, Image , User_id} = data
        const response = await middleware(User_id);
        const UserDetails = await User_model.findOne({_id : response.id})
        await Tweet_model.create({
            "Text" : Text,
            "image" : Image,
            "user_id": response.id,
            "postedBy":UserDetails.User_tag,
        })
        return NextResponse.json({
            message : "SUCCESFULL"
        },{
            status:200
        })
    } catch (error) {
        return NextResponse.json({
            message : error
        },
        
        {
            status:400
        })
    }
   
}