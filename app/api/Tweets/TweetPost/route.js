import middleware from "@/server/middleware";
import Tweet_model from "@/server/models/Tweet";
import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    await dbConnect();
    const data = await req.json();
   console.log(data)
    const { Text, Image, User_id, OriginalTweet, mode } = data;
    const UserDetails = await User_model.findOne({ _id: User_id },{Image:1,User_tag:1,}).lean();
    console.log(UserDetails)
    const imageAmount = Image.length;
    console.log('image amount : ',imageAmount)
    const NewTweet = await Tweet_model.create({
      Text: Text, // Tweet Text
      image: Image, // image array
      user_id: UserDetails._id, // author id
      postedBy: UserDetails.User_tag, // author tag
      imageAmount: imageAmount, // Number of images a user posted for tweeet layout purposes
      Likes: 0, // Likes
      UserImage: UserDetails.Image, // Author images
      LikedBy: [], // liked by array to keep  record of likes
      Comments:0  // Tweets total comments
    });
    return NextResponse.json(
      {
        message:NewTweet,
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
