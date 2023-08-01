const Server_call = async(route,data,method)=>{
    const response = await fetch(route,
        {
            method : method,
            headers : {"Content-Type": "application/json"}
            ,
            body:JSON.stringify(data)
        })
        return response
}
export default Server_call