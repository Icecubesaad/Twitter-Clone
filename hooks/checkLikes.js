const checkLikes = async(list,Tweets)=>{  
    let array = [] 
    if(list && Tweets){
        list.map((e)=>{
            Tweets.map((y)=>{
                if(e === y._id){
                    array.push({_id:e})
                }
            })
        })
    }
    return array
}
module.exports = checkLikes
