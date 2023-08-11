const like_tweet = async(id,mode,User_id,author)=>{
    if(!User_id){
        return
    }
    const response = await fetch("/api/TweetActions/Like",{
        method:"POST",
        body:JSON.stringify({
            id:id,
            User_id:User_id,
            mode:mode,
            author:author
        })
    })
    const response_back = await response.json()
    console.log(response_back)
}
module.exports = like_tweet
