const jwt = require('jsonwebtoken')
import { NextResponse } from "next/server";

const middleware = async(token)=>{
    if(!token)
{
    return null
}
try {
const verify = await jwt.verify(token,process.env.SECRET)
if(verify){
    console.log("verified")
        let User = verify.ID
        return User
    }
} catch (error) {
    console.log(error)
    return null
}
}
export default middleware