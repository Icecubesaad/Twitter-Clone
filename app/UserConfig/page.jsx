'use client'
import React,{useState,useEffect,useContext} from 'react';
import ErrorException from '@/components/error/ErrorException';
import Server_call from '@/hooks/PostRequest';
import AppContext from '../context/AppContext';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Loading/Spinner';
import UploadPhoto from '@/components/UploadPhoto';
const UserName = () => {
    const [loading_post, setloading_post] = useState(false);
    const [loading, setloading] = useState(false);
    const [ready_to_post, setready_to_post] = useState(false);
    const {push} = useRouter()
    const context = useContext(AppContext)
    const {Auth_Crededentials,setAuth_Crededentials} = context
    useEffect(() => {
        if(Auth_Crededentials === ""){
            push("/Signup")
        }
    }, []);
    
    const [Crededetials, setCrededetials] = useState({
        "User_Name":"",
        "User_tag":"",
        "Email":Auth_Crededentials.Email,
        "Password":Auth_Crededentials.Password,
        "Image":""
    });
    
    const [Validation, setValidation] = useState(true);
    const [error, seterror] = useState("");
    const post = async()=>{
        setValidation(true)
        setloading_post(true)
        const {User_Name,User_tag,Image} = Auth_Crededentials
       if(User_Name.length<1){
        setValidation(false)
        seterror(" must be 1 letter long")
        setloading_post(false)
       }
       if(User_tag.length<1){
        setValidation(false)
        seterror("User Tag must be 1 letter long")
        setloading_post(false)
       }
       if(User_Name.length < 1 && User_tag.length < 1){
        setValidation(false)
        seterror("User Tag and Username must be 1 letter long")
        setloading_post(false)
       }
        else{
            setValidation(true)
        }
        try {
            if(Validation){
                const response = await Server_call("/api/Auth/Signup",Auth_Crededentials, "POST")
                const response_back = await response.json();
                if(response_back.message === "Account already exist"){
                    setValidation(false)
                    seterror("ACCOUNT ALREADY EXIST")
                    setloading_post(false)
                }
                if(response.status === 200){
                    setValidation(true)
                    setloading_post(false)
                    setCrededetials({
                        "User_Name":"",
                        "User_tag":""
                    })
                    push("/Login")
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
            console.error(error)
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
    const change_image = (image)=>{
        setloading_post(true)
        if(image){
            setAuth_Crededentials({
                ...Auth_Crededentials,Image : image[0]
            })         
            
        }
    }
    useEffect(() => {
    }, [Auth_Crededentials]);
    useEffect(() => {
        if(Auth_Crededentials.Image){
            post()
        }
    }, [Auth_Crededentials.Image]);
    const Changing_style = ()=>{

        setAuth_Crededentials(Crededetials)
        const container_element = document.getElementById("getting_name")
        const container_element2 = document.getElementById("after_post")
        container_element.style.display = "none"
        container_element2.style.display = "flex"

    }
    return (
        <>
        <div id='getting_name' className='w-full h-screen flex justify-center items-center'>
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
            <button
            onClick={Changing_style}
            className=" w-40 h-14 background_of_sub_component_contrast rounded-xl text-lg text-white flex items-center justify-center"
          >
            {!loading_post ? <div>Sign Up</div> : <div className=" pt-2 pr-2 w-full h-full flex item-center justify-center"><Spinner/></div>}
          </button>
            </div>
        </div>
        </div>
        <div style={{display:"none"}} id='after_post'>
            {
                loading ? <Spinner/> : <UploadPhoto loading_post={loading_post} change_image={change_image}/>
            }
        </div>
        </>

    );
}

export default UserName;
