import Tweet_model from "@/server/models/Tweet";
import Tweet_comments_model from "@/server/models/TweetComments";
import User_model from "@/server/models/UserSchema";
import dbConnect from "@/server/utils/database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await dbConnect();
  try {
    console.log("liking");
    const payload = await req.json();
    console.log(payload);
    const url = new URL(req.url);
    const query = url.searchParams.get("t");
    const Increase = { $inc: { Likes: 1 } };
    const decrease = { $inc: { Likes: -1 } };
    if (payload.mode === "like") {
      console.log("liking it");
      if (query === "c") {
        try {
          await Tweet_comments_model.findOneAndUpdate(
            { _id: payload.id },
            Increase,
            {
              new: true,
            }
          );
          await Tweet_comments_model.findOneAndUpdate(
            { _id: payload.id },
            { $push: { LikedBy: payload.User_id } },
            { new: true }
          );

          await User_model.findOneAndUpdate(
            { _id: payload.User_id },
            { $push: { Like_list: payload.id } },
            { new: true }
          );

          await User_model.findOneAndUpdate(
            { User_tag: payload.author },
            { $inc: { NewNotifications: 1 } },
            { new: true }
          );
          return NextResponse.json({ message: "success" }, { status: 200 });
        } catch (error) {
          // Handle errors here
          console.error("An error occurred:", error);
          return NextResponse.json(
            { message: "An error occurred" },
            { status: 500 }
          );
        }
      } else {
        try {
          await Tweet_model.findOneAndUpdate({ _id: payload.id }, Increase, {
            new: true,
          });
          await Tweet_model.findOneAndUpdate(
            { _id: payload.id },
            { $push: { LikedBy: payload.User_id } },
            { new: true }
          );

          await User_model.findOneAndUpdate(
            { _id: payload.User_id },
            { $push: { Like_list: payload.id } },
            { new: true }
          );

          await User_model.findOneAndUpdate(
            { User_tag: payload.author },
            { $inc: { NewNotifications: 1 } },
            { new: true }
          );
          return NextResponse.json({ message: "success" }, { status: 200 });
        } catch (error) {
          // Handle errors here
          console.error("An error occurred:", error);
          return NextResponse.json(
            { message: "An error occurred" },
            { status: 500 }
          );
        }
      }
    }
    if (payload.mode === "dislike") {
      console.log("disliking it");
      await Tweet_model.findOneAndUpdate({ _id: payload.id }, decrease, {
        new: true,
      });
      await Tweet_model.findOneAndUpdate(
        { _id: payload.id },
        { $pull: { LikedBy: payload.User_id } },
        { new: true }
      );
      await User_model.findOneAndUpdate(
        { _id: payload.User_id },
        { $pull: { Like_list: payload.id } },
        { new: true }
      );
      return NextResponse.json({ message: "success" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}