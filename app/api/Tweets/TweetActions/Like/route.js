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
    console.log(payload.mode);
    if (!payload.User_id || payload.User_id === " ") {
      return NextResponse.json({ message: "no user id" }, { status: 405 });
    }
    console.log(payload);
    const url = new URL(req.url);
    const query = url.searchParams.get("t");
    console.log(query);
    const Increase = { $inc: { Likes: 1 } };
    const decrease = { $inc: { Likes: -1 } };
    
    if (payload.mode === "like") {
      console.time("queryTime");
      const checking_user_likes = await User_model.findOne(
        { _id: payload.User_id },
        { Like_list: 1,User_tag : 1 }
        ).lean();
        console.timeEnd("queryTime");
      if (checking_user_likes.Like_list.includes(payload.id)) {
        console.log("already in here");
        return NextResponse.json(
          { message: "already in liked List" },
          { status: 402 }
        );
      }
      else{
        console.log("liking it");
        if (query === "c") {
          console.log("liking comment");
  
          try {
            await Tweet_comments_model.findOneAndUpdate(
              { _id: payload.id },
              Increase,
              {
                new: true,
              }
            );
            
            await Tweet_model.findOneAndUpdate(
              { _id: payload.id },
              { $push: { LikedBy: payload.User_id } },
              { new: true }
            );
            await User_model.findOneAndUpdate(
              { User_tag: payload.author },
              { $inc: { NewNotifications: 1 } },
              { new: true }
              );
              await User_model.findOneAndUpdate(
                { _id: payload.User_id },
                { $push: { Like_list: payload.id } },
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
        if (query === "t") {
          console.log("liking the main  tweets");
          try {
            console.time('increasingLikes')
            await Tweet_model.findOneAndUpdate({ _id: payload.id,postedBy : payload.author }, Increase, {
              new: true,
            });
            console.timeEnd('increasingLikes')
            console.time('adding_in_tweet_likedBy')
            await Tweet_model.findOneAndUpdate(
              { _id: payload.id },
              { $push: { LikedBy: payload.User_id } },
              { new: true }
            );
            console.timeEnd('adding_in_tweet_likedBy')
            if(checking_user_likes.User_tag === payload.author){
              return NextResponse.json({message:"same person"},{status:400})
            }
            else{
              await User_model.findOneAndUpdate(
                { User_tag: payload.author },
                { $inc: { NewNotifications: 1 } },
                { new: true }
                );
            }
              console.time('pushing in user')
              await User_model.findOneAndUpdate(
                { _id: payload.User_id },
                { $push: { Like_list: payload.id } },
                { new: true }
              );
              console.timeEnd('pushing in user')
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
