const followers = async(id,name,image,author)=>{
    const response = await fetch("/api/Auth/user-followers",{
        method:"POST",
        body:JSON.stringify({
            id:id,
            name:name,
            image:image,
            author:author
        })
    });
    
}
module.exports = followers