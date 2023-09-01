import increasing_followers from "@/server/middleware/increasing-followers";
import notifications from "@/server/middleware/notifications";
import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";
import decreasing_follower from "@/server/middleware/decreasing_follower";
export async function POST(req, res) {
  const url = new URL(req.url)
  const query = url.searchParams.get("q")
  try {
    await dbConnect();
    console.log("here")
    const payload = await req.json();
    if(query === 'i'){
      const updating = await increasing_followers(payload.id,payload.author,payload.image,payload.name,)
      if (updating) {
          const posting_notify = notifications(
            payload.author,
            payload.name,
            payload.image,
            payload.id,
            "fr"
          );
          if (posting_notify) {
            console.log("done following")
            return NextResponse.json({ message: "Success" }, { status: 200 });
          } else {
            return NextResponse.json({ message: "error" }, { status: 400 });
          }
        
      } else {
        return NextResponse.json({ message: "error" }, { status: 400 });
      }
    }
    if(query === 'd'){
      const updating = await decreasing_follower(payload.id,payload.author,payload.image,payload.name,)
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
