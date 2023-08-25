import React from 'react';

const NotificationsComments = (
    {image,Name,Text,OriginalTweet}
) => {
    return (
        <div className=' h-auto pb-4 flex justify-center pl-8 gap-2 pt-2  flex-col border-t border-white border-b' style={{width:"100%"}}>
            <div className=' flex flex-row gap-9 items-center'>
            <div className=' h-10 w-10 border-1 rounded-full'>
                    <img src={image} className='h-10 w-10 border-1 rounded-full' style={{height:"100%",width:"100%"}} />
                </div>
                <div className=' text-white'>
                    {Name} Commented on your tweet
                </div>
            </div>
            <div className='text-white'>
            "{Text}"
            </div>
            <div>
                <p className=' text-gray-500'>{OriginalTweet}</p>
            </div>
        </div>
    );
}

export default NotificationsComments;
