'use client'
import React from 'react';
import { useState,useEffect } from 'react';
import ErrorException from '@/components/error/ErrorException';
import { redirect } from 'next/navigation'
import Auth_function from '@/hooks/Auth';
const Login = () => {
    const [error, seterror] = useState("");
    const [Validation, setValidation] = useState(true);
    const [Crededetials, setCrededetials] = useState({
        "Email":"",
        "Password":""
    });
    const ChangingCredentials = (e)=>{
        let name = e.target.name
        let value = e.target.value
        setCrededetials({
            ...Crededetials,
            [name] : value
        })
    }
    const post = async()=>{
        const response =await Auth_function("/api/Login",Crededetials,"POST")
        const response_back = await response.json()
        if(response_back.message === "Wrong crededentials"){
            setValidation(false)
            seterror("Wrong Crededentials")
        }
        if(response.status === 200){
            setCrededetials({
                Email : "",
                Password  : ""
            })
            redirect("/")
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setValidation(true)
        }, 10000);
    }, [Validation]);
    return (
        <div className='w-full h-screen flex justify-center items-center'>
        <div className=' w-1/3 m-auto bg-slate-900 rounded-xl h-4/5 pt-6'>
            <div className='text-white font-bold text-5xl text-center'>Sign In</div>
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
                <button onClick={post} className=' w-40 h-14 bg-slate-600 rounded-xl text-lg text-white'>
                    Sign In
                </button>
            </div>
        </div>
        </div>
    );
}

export default Login;
