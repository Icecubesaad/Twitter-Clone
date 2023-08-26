import dbConnect from "@/server/utils/database";

export async function POST(req,res){
    try {
        await dbConnect()
        const payload = await req.json()
        const increase = {$push : {Followers:payload.id}}      
    } catch (error) {
        
    }
}