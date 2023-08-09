'use client'
import React from 'react';

const Page = () => {
    const check = async()=>{
        const resp = await fetch("/api/Dynamic?name=3&limit=0",{
            method : "POST"
        });
        const data = await resp.json()
        console.log(data)
    }
    return (
        <div>
            <button className=' text-white' onClick={check}>click on this bich</button>
        </div>
    );
}

export default Page;
