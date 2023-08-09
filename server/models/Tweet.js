import mongoose,{Schema} from "mongoose";
import { stringify } from "postcss";
const Tweet = new Schema({
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
    mode:{
        type : String
    },
    imageAmount:{
        type:Number
    },
    UserImage:{
        type:String
    }
})
const Tweet_model = mongoose.models.tweet || mongoose.model('tweet',Tweet)
export default Tweet_model