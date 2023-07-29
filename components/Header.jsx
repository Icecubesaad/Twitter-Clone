'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import AppContext from '@/app/context/AppContext';

const Header = () => {
    const context = useContext(AppContext)
    const {LoggedIn} = context;
    const sidebar = ()=>{
        const sideBar_component = document.getElementById('sidebar')
        if(sideBar_component.classList.contains('active')){
            sideBar_component.classList.remove('active')
        }
        else{
            sideBar_component.classList.add('active')
        }
    }    
    return (
        <div className='w-ful h-16 flex flex-row'>
            <div className='left_sidebar w-3/4 flex flex-row items-center'>
            <div className='w-1/12'></div>
            <div className="rounded-xl h-12" style={{width:"27%"}}>
                <input placeholder='Search here' className=' backdrop-blur-sm w-full rounded-xl h-12 text-white font-sans placeholder:text-white bg-slate-500 border-none outline-none pl-3 bg-blend-saturation'/>
            </div>
            </div>

            { LoggedIn ? <div className='right_sidebar w-2/5 h-14 flex flex-row items-center justify-between'>
                    <div className='w-13 bg-white h-12 w-24 border-2 rounded-xl border-white flex items-center justify-center'>
                            Home
                    </div>
                    <div>
                        <EmailIcon sx={{ color: "white",fontSize: 30 }} />
                    </div>
                    <div>
                        <NotificationsIcon sx={{ color: "white",fontSize: 30 }} />
                    </div>
                      <div className='h-10 flex flex-row border-white border w-auto pr-3 items-center ' style={{borderRadius : 50}}>
                        <div className='w-10 border1 border-white bg-white rounded-full h-10'>

                        </div>
                        <div className='text-white text-sm ml-2'>ICECUBE</div>

                    </div>
                    <div className='mr-2'>
                          <div id='sidebar' className='SideBar h-screen bg-slate-500'>
                            <button id='closebtn' onClick={sidebar}><CloseIcon sx={{fontSize:40}} /></button>
                            </div>  
                            <button onClick={sidebar}><MenuIcon sx={{ color: "white",fontSize: 30 }} /></button>
                    </div>  
            </div>: <div className = "w-2/5 h-14"></div>}

        </div>
    );
}

export default Header;
