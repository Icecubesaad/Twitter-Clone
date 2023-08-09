'use client'
import AppContext from '@/app/context/AppContext';
import React, { useContext } from 'react';
import Spinner from '../Loading/Spinner';

const LoggedIn_Component = () => {
  const context = useContext(AppContext)
  const {UserDetails,LoggedIn} = context
    return (
        <div className=" background_of_sub_component w-11/12  h-96 rounded-xl ">
        <div className="flex justify-center items-center h-52 flex-col">
          <div className="h h-32 w-32 bg-slate-900 rounded-full">
            {UserDetails.Image ? <img src={UserDetails.Image} className=' h-full w-full border-1 border-slate-900 rounded-full' />:<Spinner/>}
          </div>
          <div className=" mt-1 text-white">{UserDetails.UserName === "" ? <Spinner/> : UserDetails.UserName}</div>
        </div>
        <div className="h-px w-full bg-white"></div>
        <div className="flex flex-row h-32">
          <div className=" flex flex-col items-center gap-3 w-1/2 justify-center">
            <div className="text-white font-sans text-lg">followers</div>
            <div className="text-white font-sans text-lg">0</div>
          </div>
          <div className=" w-px h-24 bg-white mt-3"></div>
          <div className="flex flex-col items-center gap-3 w-1/2 justify-center">
            <div className="text-white font-sans text-lg">following</div>
            <div className="text-white font-sans text-lg">0</div>
          </div>
        </div>
        <div className="h-px w-full bg-white"></div>
        <div className=" flex justify-center mt-3">
          <button className=" text-white">View Profile</button>
        </div>
      </div>
    );
}

export default LoggedIn_Component;
