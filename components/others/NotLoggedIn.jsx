import React from 'react';
import Link from 'next/link';
const NotLoggedIn = () => {
    return (
        <div className="w-11/12  h-96 rounded-xl background_of_sub_component flex flex-col gap-7 justify-center items-center">
            <Link href='/Login'><button className=' w-36 h-14 background_of_sub_component_contrast text-white rounded-2xl'>sign in</button></Link>
            <Link href='/Signup'><button className=' w-36 h-14  background_of_sub_component_contrast text-white rounded-2xl'>sign up</button></Link>
        </div>
    );
}

export default NotLoggedIn;
