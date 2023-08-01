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
        require : true
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
    }
})
const Tweet_model = mongoose.models.tweet || mongoose.model('tweet',Tweet)
export default Tweet_model