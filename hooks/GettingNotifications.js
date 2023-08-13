const gettingNotifications =async(id,path)=>{
    const response = await fetch(path,{
        method:"POST",
        body:JSON.stringify({
            id:id
        })
    })
    const response_back = await response.json()
    return response_back.message
}
module.exports =  gettingNotifications