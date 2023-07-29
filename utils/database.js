import mongoose from "mongoose"

const MONGODB_URL = process.env.MONGODB_URL_E;
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

const dbConnect = async () => {
    console.log("Connnecting to databse")
    if (cached.conn) {
        return cached.conn;
    }


// If a connection does not exist, we check if a promise is already in progress. If a promise is already in progress, we wait for it to resolve to get the connection
    if (!cached.promise) {
        const opts = {
            bufferCommands : false
        };
        try {
            cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
                return mongoose,console.log("CONNECTED SUCCESFULLY")
            }).catch((e)=>{
                console.log("from database",e)
            })
        } catch (error) {
            console.log(error)
            console.log("Cannot connect to DATABASE")
        }
    }
    
    try {
        cached.conn = await cached.promise;  
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;