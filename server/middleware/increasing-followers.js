import User_model from "../models/UserSchema";
import increasing_following from "./increasing-following";
const increasing_followers = async (id, author,image,follower_name) => {
  const increase = { $push: { Follower_list: {
    id:id,
    name:follower_name,
    image:image
  } } };
  const updating = await User_model.findOneAndUpdate(
    { User_tag: author },
    increase,
    { new: true }
  );
  if (updating) {
    const increasing_followers = await User_model.findOneAndUpdate(
      { User_tag: author },
      { $inc: { Followers: 1 } },
      { new: true }
    );
    if (increasing_followers) {
      const increasing_following_user = await increasing_following(id, author);
      if (increasing_following_user) {
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
};
export default increasing_followers;
