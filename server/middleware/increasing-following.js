import User_model from "../models/UserSchema";
const increasing_following= async(id,author)=>{
    const authorDetails = await User_model.findOne({User_tag : author}, { _id: 1,User_tag:1,Image:1 })  //  author details neccessary for having record in following list
    const increase = { $push: { Following_list: {
        id:authorDetails._id,
        name:authorDetails.User_tag,                // increasing interface
        image:authorDetails.Image
      } } };
      const increasing_following = await User_model.findOneAndUpdate({_id:id},increase,{new:true})      // adding the object made in interface into the following list of user
      if(increasing_following)
      {
        const increasing_following_count = await User_model.findOneAndUpdate({_id:id},{$inc:{Following:1}},{new:true})
        if(increasing_following_count){
            return true
        }
        else{
            return false
        }
      }
      else{
        return false
      }

}
export default increasing_following