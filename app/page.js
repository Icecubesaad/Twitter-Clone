'use client'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import Image from 'next/image'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Tweets from '@/components/cards/Tweets';
import { Cookies } from 'react-cookie';
import { useContext, useEffect } from 'react';
import AppContext from './context/AppContext';
import Auth_function from '@/hooks/Auth';
export default function Home() {
  const context = useContext(AppContext)
  const {LoggedIn, setLoggedIn, UserDetails,setUserDetails} = context
  
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('user') || null;
    if(token){
      setLoggedIn(true)
      getDetails(token)
    }
    else{
      setLoggedIn(false)
    }
  }, []);
  const getDetails = async(data)=>{
    const data_to_server = {
      "Token" : data
    }
    const request = await Auth_function("/api/getDetails",data_to_server,"POST")
    const User_data = await request.json()
    setUserDetails({
      "UserName" : User_data.message.User_Name,
      "UserTag":User_data.message.User_tag
    })

  }
  return (
    <div className='flex flex-row'>
      <LeftSidebar/>
      <div className='w-2/4 flex flex-col gap-2 items-center mr-5'>
        <div className='h bg-slate-500 h-36 flex flex-col rounded-xl' style={{width:"98%"}}>
          <div className='h-24 w-full ml-4 flex flex-row gap-4 pt-2'>
            <div className='h-14 w-1/12 bg-amber-100' style={{borderRadius:"40px"}}>
            </div>
            <div className="rounded-xl h-12" style={{width:"80%"}}>
                <input placeholder="what's happening" className=' backdrop-blur-sm w-full rounded-xl h-12 text-white font-sans placeholder:text-white bg-slate-900 border-none outline-none pl-5 bg-blend-saturation'/>
            </div>
          </div>
          <div className='flex flex-row gap-5 ml-20'>
             <div style={{transition:"all 300ms"}} className='w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl'><InsertPhotoIcon sx={{color:"green"}}/> images</div>
             <div style={{transition:"all 300ms"}} className='w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl'><PlayCircleIcon sx={{color:"blue"}}/> video</div>
             <div style={{transition:"all 300ms"}} className='w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl'><FormatQuoteIcon sx={{color:"orange"}}/> quote</div>
          </div>
        </div>
        <Tweets/>
      </div>
      <RightSidebar/>
    </div>
  )
}
