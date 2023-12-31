import Tweet_model from "@/server/models/Tweet";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function GET(req,res){
    const url = new URL(req.url)
    const limit = url.searchParams.get("limit")
    const skip = url.searchParams.get("skip")

    try {
        await dbConnect();
        const documents = await Tweet_model.count()
        const data = await Tweet_model.find().limit(limit).skip(skip)
        const Document_Left = documents-(Number(limit)+Number(skip))
        return NextResponse.json({
            message : {data : data,DocumentsLeft : Document_Left,TotalDocuments:documents}
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