const jwt = require('jsonwebtoken')
import { NextResponse } from "next/server";

const middleware = async(token)=>{
    if(!token.Token)
{
    return null
}
try {
const verify = await jwt.verify(token.Token,process.env.SECRET)
if(verify){
        let User = verify.ID
        return User
    }
} catch (error) {
    console.log(error)
    return null
}
}
export default middleware