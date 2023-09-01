const updatingUserDetails = async(setUserDetails,UserDetails,field,mode,current_value)=>{
    let initial_value = current_value
    if(mode === 'i'){
        initial_value += 1;
        setUserDetails({...UserDetails,[field]:initial_value})
    }
    if(mode==='d'){
        initial_value -= 1;
        setUserDetails({...UserDetails,[field]:initial_value})
    }
}
export default updatingUserDetails