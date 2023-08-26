import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req,res){
    await dbConnect();
    try {
        const data = await req.json()
        const {Email,Password} = data;
        if (!(Email.includes("@") && Email.includes(".") && Password.length >= 6)) {
            return NextResponse.json({
              message: "Validation Error"
            }, {
              status: 400
            });
          }
        const Already_exist = await User_model.findOne({"Email" : Email})
        if(Already_exist){
            return NextResponse.json({
                message: "Already Exist"
              }, {
                status: 400
              });
        }
        return NextResponse.json({
          message : "Success"
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