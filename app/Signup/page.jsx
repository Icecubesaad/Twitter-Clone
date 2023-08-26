'use client'
import React, { useContext } from 'react';
import { useState,useEffect } from 'react';
import ErrorException from '@/components/error/ErrorException';
import AppContext from '../context/AppContext';
import { useRouter } from 'next/navigation';
import Server_call from '@/hooks/PostRequest';
import Spinner from '@/components/Loading/Spinner';
const Signup = () => {
    const [Loading, setLoading] = useState(false);
    const { push } = useRouter();
    const context = useContext(AppContext)
    const {setAuth_Crededentials}  = context
    const [Crededetials, setCrededetials] = useState({
        "Email":"",
        "Password":""
    });
    const [Validation, setValidation] = useState(true);
    const [error, seterror] = useState("");
    useEffect(() => {
        const {Email,Password} = Crededetials
        if(!(Email.includes("@") && Email.includes(".") )&& Email.length>0){
            if(Password.length<6 && Password.length>0){
                setValidation(false)
                seterror("Please enter password of more than 6 letters and a valid email")
            }
            else{
                setValidation(false)
                seterror("Add a valid email")
            }
        }
        else if(Password.length<6 && Password.length>0){
            if(!(Email.includes("@") && Email.includes(".") && Email.length>0)){
                setValidation(false)
                seterror("Please enter password of more than 6 letters and a valid email")
            }
            else{
                setValidation(false)
                seterror("Password must be more than 6 letters")
            }
        }
        else{
            setValidation(true)
        }
    }, [Crededetials]);
    const post = async()=>{
        setLoading(true)
        setValidation(true)
        try {
            if(Validation){
                const response = await Server_call("/api/Auth/check/Signup",Crededetials,"POST")
                const response_back = await response.json();
                console.log("RESPONSE BACK FROM SERVER AHHAHA : ",response_back)
                if(response_back.message === "Already Exist"){
                    setValidation(false)
                    seterror("ACCOUNT ALREADY EXIST")
                    setLoading(false)
                }
                console.log("Responsive from server : ", response_back)
                if(response.status === 200){
                    setLoading(false)
                    setAuth_Crededentials(
                        Crededetials
                    )
                    setCrededetials({
                        "Email":"",
                        "Password":""
                    })
                    push("/UserConfig")
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
        setTimeout(() => {
            setValidation(true)
        }, 10000);
    }, [Validation]);
    return (
        <div className='w-full h-screen flex justify-center items-center'>
        <div className=' w-1/3 m-auto bg-slate-900 rounded-xl h-4/5 pt-6'>
            <div className='text-white font-bold text-5xl text-center'>Sign Up</div>
            <div className='w-full flex flex-col justify-center items-center gap-6 mt-6'>
                <div className='flex flex-col justify-start w-11/12'>
                <div className='text-white text-lg font-semibold'>Email</div>
            <input value={Crededetials.Email} onChange={ChangingCredentials} name='Email' className=' w-full m-auto bg-slate-600 text-white rounded-md pl-4 outline-none h-14'/>
            </div>
            <div className='flex flex-col justify-start w-11/12'>
            <div className='text-white text-lg font-semibold'>Password</div>
            <input value={Crededetials.Password} name='Password' onChange={ChangingCredentials} className=' w-full m-auto bg-slate-600 text-white rounded-md pl-4 outline-none h-14'/>
            </div>
            </div>
            { Validation ? null : <ErrorException message={error} />}
            <div className='w-full flex items-center justify-center mt-8'>
            <button
            onClick={post}
            className=" w-40 h-14 background_of_sub_component_contrast rounded-xl text-lg text-white flex items-center justify-center"
          >
            {!Loading ? <div>Sign Up</div> : <div className=" pt-2 pr-2 w-full h-full flex item-center justify-center"><Spinner/></div>}
          </button>
            </div>
        </div>
        </div>
    );
}

export default Signup;
