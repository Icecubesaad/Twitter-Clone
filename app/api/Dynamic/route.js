import { NextResponse } from "next/server";

export async function POST(req,res){
    const url = new URL(req.url)
    const name = url.searchParams.get("name")
    const limit = url.searchParams.get("limit")
    return NextResponse.json({message : {name,limit}})
}