import Tweet_model from "@/server/models/Tweet";
import dbConnect from "@/server/utils/database";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req,res){
    console.log(req.url)
    const url = new URL(req.url)
    const limit = url.searchParams.get("limit")
    const skip = url.searchParams.get("skip")

    try {
        await dbConnect();
        const documents = await Tweet_model.count()
        const data = await Tweet_model.find().limit(limit).skip(skip)
        const Document_Left = documents-(Number(limit)+Number(skip))
        console.log("Documents Requested : ",limit,"Documents Left : ",Document_Left)
        return NextResponse.json({
            message : {data : data,DocumentsLeft : Document_Left}
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