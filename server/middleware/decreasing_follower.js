import decreasing_following from "./decreasing_following";
import User_model from "../models/UserSchema";
const decreasing_follower = async(id,author)=>{
    const decrease = { $pull: { Follower_list: {
      id:id,
    } } };
    const updating = await User_model.findOneAndUpdate(
      { User_tag: author },
      decrease,
      { new: true }
    );
    if (updating) {
      const decreasing_followers = await User_model.findOneAndUpdate(
        { User_tag: author },
        { $inc: { Followers: -1 } },
        { new: true }
      );
      if (decreasing_followers) {
        const decreasing_following_user = await decreasing_following(id, author);
        if (decreasing_following_user) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
}
export default decreasing_follower