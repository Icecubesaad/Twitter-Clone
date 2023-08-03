const Tweet_call = async(route,data,method)=>{
    const response = await fetch(route,
        {
            method : method,
            body:data
        })
        return response
}
export default Tweet_call