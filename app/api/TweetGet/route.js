import Tweet_model from "@/server/models/Tweet";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function GET(req,res){
    await dbConnect();
    try {
        const data = await Tweet_model.find().limit(3).skip(3)
        return NextResponse.json({
            message : data
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