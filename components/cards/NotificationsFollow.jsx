import React from 'react';

const NotificationsFollow = ({Name,image}) => {
    return (
        <div className=' h-auto pb-4 flex justify-center pl-8 gap-2 pt-2  flex-col border-t border-white border-b' style={{width:"100%"}}>
            <div className=' flex flex-row gap-9 items-center'>
                <div className=' h-10 w-10 border-1 rounded-full'>
                    <img src={image} className='h-10 w-10 border-1 rounded-full' style={{height:"100%",width:"100%"}} />
                </div>
                <div className=' text-white'>
                    {Name} followed you
                </div>
            </div>
        </div>
    );
}

export default NotificationsFollow;
