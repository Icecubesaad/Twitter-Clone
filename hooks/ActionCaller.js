const ActionCaller = async(id,mode,User_id,author,path,content)=>{
    if(!User_id){
        return
    }
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
