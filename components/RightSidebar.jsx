import React from 'react';
import Trends from './cards/Trends';

const RightSidebar = () => {
    return (
        <div className='w-1/4 mr-5 h-screen bg-slate-500 rounded-xl flex flex-col pt-3 pl-3'>
            <div className=' text-3xl font-sans font-bold text-white'>Trends for you</div>
            <div className=' pt-6'>
            <Trends/>
            <Trends/>
            <Trends/>
            <Trends/>
            <Trends/>
            <Trends/>
            </div>
        </div>
        
    );
}

export default RightSidebar;
