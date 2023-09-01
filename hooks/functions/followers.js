const followers = async(id,name,image,author,mode)=>{
    const response = await fetch(`/api/Auth/user-followers?q=${mode}`,{
        method:"POST",
        body:JSON.stringify({
            id:id,
            name:name,
            image:image,
            author:author,
        })
    });
    
}
module.exports = followers