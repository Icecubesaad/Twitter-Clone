import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req,res){
    try {
        console.log("RESETTING THE NOTIFICATIOS")
        await dbConnect()
        const payload  = await req.json()
        const howa = await User_model.findOneAndUpdate(
            {_id : payload.id}
            ,
            {
                $set : {
                    NewNotifications : 0
                }
            },
            {
                new:true
            })
            return NextResponse.json({message:"SUCCESS"},{status:200})
    } catch (error) {
        return NextResponse.json({message: error},{status:400})
    }
}