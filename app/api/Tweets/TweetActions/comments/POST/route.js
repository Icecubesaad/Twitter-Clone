import Tweet_comments_model from "@/server/models/TweetComments";
import dbConnect from "@/server/utils/database";
import User_model from "@/server/models/UserSchema";
import middleware from "@/server/middleware";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
 
    await dbConnect();
    const data = await req.json();
    const { Text, User_id, Image,UserImage, OriginalTweet,UserTag } = data;
    const imageAmount = Image.length;
    await Tweet_comments_model.create({
      Text: Text, // Tweet Text
      image: Image, // image array
      user_id: User_id, // author id
      postedBy: UserTag, // author tag
      imageAmount: imageAmount, // Number of images a user posted for tweeet layout purposes
      Likes: 0, // Likes
      UserImage: UserImage, // Author images
      LikedBy: [], // liked by array to keep  record of likes
      OriginalTweet: OriginalTweet,
      Comments:0  // comments on a reply
    });
    return NextResponse.json(
      {
        message: "SUCCESS",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "internal server error",
      },

      {
        status: 400,
      }
    );
  }
}
