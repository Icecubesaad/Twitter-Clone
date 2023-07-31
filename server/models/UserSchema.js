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
    Password :{
        type : String,
        require : true
    }
})
const User_model = mongoose.models.contact || mongoose.model('contact',UserSchema)
export default User_model