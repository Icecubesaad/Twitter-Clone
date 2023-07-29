import React from 'react';

const LoggedIn_Component = () => {
    return (
        <div className="w-11/12  h-96 rounded-xl bg-slate-500">
        <div className="flex justify-center items-center h-52 flex-col">
          <div className="h h-32 w-32 bg-slate-900 rounded-full"></div>
          <div className=" mt-1 text-white">ICECUBE</div>
        </div>
        <div className="h-px w-full bg-slate-900"></div>
        <div className="flex flex-row h-32">
          <div className=" flex flex-col items-center gap-3 w-1/2 justify-center">
            <div className="text-white font-sans text-lg">followers</div>
            <div className="text-white font-sans text-lg">0</div>
          </div>
          <div className=" w-px h-24 bg-slate-900 mt-3"></div>
          <div className="flex flex-col items-center gap-3 w-1/2 justify-center">
            <div className="text-white font-sans text-lg">following</div>
            <div className="text-white font-sans text-lg">0</div>
          </div>
        </div>
        <div className="h-px w-full bg-slate-900"></div>
        <div className=" flex justify-center mt-3">
          <button className=" text-blue-950">View Profile</button>
        </div>
      </div>
    );
}

export default LoggedIn_Component;
