'use client'
import React, { useContext } from "react";
import Follow from "./cards/Follow";
import LoggedIn_Component from "./others/LoggedIn-component";
import NotLoggedIn from "./others/NotLoggedIn";
import AppContext from "@/app/context/AppContext";
const LeftSidebar = () => {
    const context = useContext(AppContext)
    const {LoggedIn} = context
  return (
    <div className="w-1/4 ml-5 flex flex-col gap-2 h-auto bg-black rounded-xl pb-8">
      { LoggedIn ? <LoggedIn_Component/> : <NotLoggedIn/>}
      <div className="h h-auto w-11/12 rounded-xl bg-slate-500 flex flex-col">
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
