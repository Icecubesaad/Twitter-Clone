import mongoose,{Schema} from "mongoose";
const UserSchema = new Schema({
    User_Name:{
        type : String,
        require : true
    },
    User_tag:{
        type : String,
        require : true
    },
    Email : {
        type : String,
        require : true
    },
    Image:{
        type:String
    },
    Password :{
        type : String,
        require : true
    },
    Like_list:{
        type : Array,
    }
    ,
    Followers:
    {
        type:Number
    }
    ,
    Following:{
        type: Number
    }
    ,
    Follower_list:{
        type : Array
    }
    ,
    Following_list :
    {
        type : Array
    },
    Total_tweets:{
        type:Number
    },
    Notifications:{
        type:Array
    }
})
const User_model = mongoose.models.contact || mongoose.model('contact',UserSchema)
export default User_model