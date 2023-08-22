import mongoose,{Schema} from "mongoose";
const Tweet_comment = new Schema({
    Text:{
        type : String,
        require : true
    }
    ,
    Likes:{
        type:Number,
    }
    ,
    image:{
        type : Array
    },
    user_id:{
        type:String
    }
    ,
    postedBy:{
        type:String
    }
    ,
    imageAmount:{
        type:Number
    },
    UserImage:{
        type:String
    },
    LikedBy:{
        type:Array
    },
    OriginalTweet:{
        type:String
    }
})
const Tweet_comments_model = mongoose.models.comment || mongoose.model('comment',Tweet_comment)
export default Tweet_comments_model