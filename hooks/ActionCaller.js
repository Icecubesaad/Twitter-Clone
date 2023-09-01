const ActionCaller = async(id,mode,User_id,author,path,content)=>{
    if(!User_id){
        console.log("no user id given")
        return
    }
    console.log("liking tweet")
    const response = await fetch(path,{
        method:"POST",
        body:JSON.stringify({
            id:id,
            User_id:User_id,
            mode:mode,
            author:author,
            content : content
        })
    })
    return response
}
module.exports = ActionCaller
