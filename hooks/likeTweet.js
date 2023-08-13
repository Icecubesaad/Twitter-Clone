const like_tweet = async(id,mode,User_id,author,path)=>{
    if(!User_id){
        return
    }
    const response = await fetch(path,{
        method:"POST",
        body:JSON.stringify({
            id:id,
            User_id:User_id,
            mode:mode,
            author:author
        })
    })
    return response
}
module.exports = like_tweet
