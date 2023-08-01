const Get_server_call = async(route)=>{
    const response = await fetch(route,
        {
            method : "GET",
            headers : {"Content-Type": "application/json"}
            ,
        })
        return response
}
export default Get_server_call