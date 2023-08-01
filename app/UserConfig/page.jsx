'use client'
import React,{useState,useEffect,useContext} from 'react';
import ErrorException from '@/components/error/ErrorException';
import Server_call from '@/hooks/PostRequest';
import AppContext from '../context/AppContext';
import { useRouter } from 'next/navigation';
const UserName = () => {
    const {push} = useRouter()
    const context = useContext(AppContext)
    const {Auth_Crededentials} = context
    useEffect(() => {
        if(Auth_Crededentials === ""){
            push("/Signup")
        }
    }, []);
    const [Crededetials, setCrededetials] = useState({
        "User_Name":"",
        "User_tag":"",
        "Email":Auth_Crededentials.Email,
        "Password":Auth_Crededentials.Password
    });
    const [Validation, setValidation] = useState(true);
    const [error, seterror] = useState("");
    const post = async()=>{
        const {User_Name,User_tag} = Crededetials
       if(User_Name.length<1){
        setValidation(false)
        seterror(" must be 1 letter long")
       }
       if(User_tag.length<1){
        setValidation(false)
        seterror("User Tag must be 1 letter long")
       }
       if(User_Name.length < 1 && User_tag.length < 1){
        setValidation(false)
        seterror("User Tag and Username must be 1 letter long")
       }
        else{
            setValidation(true)
        }
        try {
            if(Validation){
                const response = await Server_call("/api/Signup",Crededetials, "POST")
                const response_back = await response.json();
                if(response_back.message === "Account already exist"){
                    setValidation(false)
                    seterror("ACCOUNT ALREADY EXIST")
                }
                console.log("Responsive from server : ", response_back)
                if(response.status === 200){
                    setCrededetials({
                        "User_Name":"",
                        "User_tag":""
                    })
                }
                if(response_back.message === "Validation Error"){
                    setValidation(false)
                    seterror("Validation error")
                }
            }
            else{
                seterror("Validation Error")
            }
        } catch (error) {
            console.log(error)
        }
        
        
    }
    const ChangingCredentials = (e)=>{
        let name = e.target.name
        let value = e.target.value
        setCrededetials({
            ...Crededetials,
            [name] : value
        })
    }
    useEffect(() => {
        console.log(Crededetials)
    }, [Crededetials]);
    useEffect(() => {
        setTimeout(() => {
            setValidation(true)
        }, 10000);
    }, [Validation]);
    return (
        <div className='w-full h-screen flex justify-center items-center'>
        <div className=' w-1/3 m-auto bg-slate-900 rounded-xl h-4/5 pt-6'>
            <div className='text-white font-bold text-5xl text-center'>Set your UserName</div>
            <div className='w-full flex flex-col justify-center items-center gap-6 mt-6'>
                <div className='flex flex-col justify-start w-11/12'>
                <div className='text-white text-lg font-semibold'>User Name</div>
            <input value={Crededetials.User_Name} onChange={ChangingCredentials} name='User_Name' className=' w-full m-auto bg-slate-600 text-white rounded-md pl-4 outline-none h-14'/>
            </div>
            <div className='flex flex-col justify-start w-11/12'>
            <div className='text-white text-lg font-semibold'>User Tag</div>
            <input value={Crededetials.User_tag} name='User_tag' onChange={ChangingCredentials} className=' w-full m-auto bg-slate-600 text-white rounded-md pl-4 outline-none h-14'/>
            </div>
            </div>
            { Validation ? null : <ErrorException message={error} />}
            <div className='w-full flex items-center justify-center mt-8'>
                <button id='btn_post' onClick={post} className=' w-40 h-14 bg-slate-600 rounded-xl text-lg text-white'>
                    Sign Up
                </button>
            </div>
        </div>
        </div>
    );
}

export default UserName;
