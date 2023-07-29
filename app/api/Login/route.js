import User_model from "@/models/UserSchema";
import dbConnect from "@/utils/database";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

export async function POST(req, res) {
    let Cookie_Set = NextResponse.next()
  console.log("LOGGING IN");
  await dbConnect();
  try {
    const data = await req.json();
    console.log(data);
    const { Email, Password } = data;
    const user_exist = await User_model.findOne({ "Email": Email });
    let user_verify;
    if (user_exist) {
      user_verify = await bcrypt.compareSync(Password, user_exist.Password);
    }
    if (user_verify) {
      const User_Data = {
        ID: {
          id: user_exist.id
        }
      };
      const Token = await jwt.sign(User_Data, secret);
      Cookie_Set.cookies.set()
      return NextResponse.json({ // Use 'NextResponse.json()' to send the response
        message: "Logged in"
      },
      {
        status: 200
      });
    } else {
      return NextResponse.json({ // Use 'NextResponse.json()' to send the response
        message: "Wrong credentials"
      },
      {
        status: 400
      });
    }
  } catch (error) {
    return NextResponse.json({ // Use 'NextResponse.json()' to send the response
      message: error
    },
    {
      status: 400
    });
  }
}
