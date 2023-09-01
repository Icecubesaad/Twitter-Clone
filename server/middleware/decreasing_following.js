const decreasing_following = async()=>{
    const authorDetails = await User_model.findOne({User_tag : author}, { _id: 1 })  //  author details neccessary for having record in following list
    const decrease = { $pull: { Following_list: {
        id:authorDetails._id
      } } };
      const decreasing_following = await User_model.findOneAndUpdate({_id:id},decrease,{new:true})      // adding the object made in interface into the following list of user
      if(decreasing_following)
      {
        const decreasing_following_count = await User_model.findOneAndUpdate({_id:id},{$inc:{Following:-1}},{new:true})
        if(decreasing_following_count){
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
export default decreasing_following