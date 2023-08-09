import middleware from "@/server/middleware"
import Tweet_model from "@/server/models/Tweet"
import User_model from "@/server/models/UserSchema"
import dbConnect from "@/server/utils/database"
import { NextResponse } from "next/server"
export async function POST(req,res){
    console.log("HELLo")
    try {
        await dbConnect()
        const data = await req.json()
        const {Text, Image , User_id} = data
        const response = await middleware(User_id);
        const UserDetails = await User_model.findOne({_id : response.id})
        const imageAmount = Image.length
        await Tweet_model.create({
            "Text" : Text,
            "image" : Image,
            "user_id": response.id,
            "postedBy":UserDetails.User_tag,
            "imageAmount":imageAmount,
            "Likes":0,
            "UserImage":UserDetails.Image
        })
        return NextResponse.json({
            message : "SUCCESS"
        },{
            status:200
        })
    } catch (error) {
        return NextResponse.json({
            message : "internal server error"
        },
        
        {
            status:400
        })
    }
   
}