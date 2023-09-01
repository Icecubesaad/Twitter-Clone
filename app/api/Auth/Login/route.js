import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = 'UROOBA';

export async function POST(req, res) {
  await dbConnect();
  try {
    const data = await req.json();
    const { Email, Password } = data;
    const user_exist = await User_model.findOne({ Email: Email });
    let user_verify;
    if (user_exist) {
      user_verify = await bcrypt.compareSync(Password, user_exist.Password);
    }
    if (user_verify) {
        const User_Data = {
          ID: {
            id: user_exist.id,
          },
        };
        const Token = await jwt.sign(User_Data, secret);
      return NextResponse.json(
        {
          // Use 'NextResponse.json()' to send the response
          message: Token,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          // Use 'NextResponse.json()' to send the response
          message: "Wrong credentials",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        // Use 'NextResponse.json()' to send the response
        message: error,
      },
      {
        status: 400,
      }
    );
  }
}
