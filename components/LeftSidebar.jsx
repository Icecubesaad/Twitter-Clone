'use client'
import React, { useContext } from "react";
import Follow from "./cards/Follow";
import LoggedIn_Component from "./others/LoggedIn-component";
import NotLoggedIn from "./others/NotLoggedIn";
import AppContext from "@/app/context/AppContext";
const LeftSidebar = () => {
    const context = useContext(AppContext)
    const {LoggedIn,UserDetails} = context
  return (
    <div className="w-1/4 ml-5 flex flex-col gap-2 h-auto  rounded-xl pb-8" style={{backgroundColor:"#06141d"}}>
      { LoggedIn ? <LoggedIn_Component/> : <NotLoggedIn/>}
      <div className=" background_of_sub_component h h-auto w-11/12 rounded-xl  flex flex-col">
        <div>
          <Follow />
          <Follow />
          <Follow />
        </div>
        <div className="flex items-center justify-center pb-2">
          <button className="  text-blue-950">see more</button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
