import React from 'react';

const Follow = () => {
    return (
        <>
        <div className='flex flex-row gap-12 h-24 items-center justify-center text-white'>
            <div className=' h-12 w-12 rounded-full bg-white text-white'></div>
            <div>
                ICECUBE
                <p>@icecube</p>
            </div>
            <div><button className=' text-black bg-white pl-3 pr-3 w-auto rounded-xl h-8'>follow</button></div>
        </div>
        </>

    );
}

export default Follow;
