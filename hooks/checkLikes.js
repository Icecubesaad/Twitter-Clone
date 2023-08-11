const checkLikes = async(list,Tweets)=>{  
    let array = [] 
    if(list && Tweets){
        list.map((e)=>{
            console.log("FROM CHECK LIKES : ",e)
            Tweets.map((y)=>{
                console.log("Tweets ID : ",y._id)
                if(e === y._id){
                    array.push({_id:e})
                }
            })
        })
    }
    return array
}
module.exports = checkLikes
