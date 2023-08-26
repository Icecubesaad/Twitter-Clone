const { default: User_model } = require("../models/UserSchema")
const { default: dbConnect } = require("../utils/database")

const notifications = async(author,likedbyName, likedbyImage,likedbyId,action )=>{
    try {
        await dbConnect()
        const user = await User_model.findOneAndUpdate({User_tag : author},{
            $push: {Notifications:{
                    id: likedbyId,
                    image: likedbyImage,
                    name: likedbyName,
                    About:action,
            }}
        },
        {new:true})
        if(user){
            const updating_notify = await User_model.findOneAndUpdate({User_tag : author},{
                $inc : {NewNotifications:1}
            },
            {
                new:true
            })
        }
    } catch (error) {
        
    }
}
module.exports = notifications