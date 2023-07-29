'use client'
import React from 'react';
import { useState,useEffect } from 'react';



import ReplyIcon from '@mui/icons-material/Reply';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BrushIcon from '@mui/icons-material/Brush';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Tweets = () => {
    const [Tweet, setTweet] = useState("d asd asdlas dnasldnlasnddlas dl asld la dlas dlas d askdnaskdnas dlas daskdlas dla sd as da;skd ;a a;jd jka dka;s dajsd asdkasd a;ks dk;asd;kas jdk;as d; as djaks dkas jdk aksd dhakshdkahskdkashdksahkdkshdlasldas asd sadasjdpoajspdass daposj dpoasjdpjas dasjdpojas das djpas jdpasjdpasj dpasj dpas ");
    const showFullText = ()=>{
        const tweet_area = document.getElementById('tweet_area')
        const read_more = document.getElementById('read_more')
        read_more.style.display = 'none'
        tweet_area.style.height = 'auto'
        setcutText(Tweet)
    }
    const [CutText, setcutText] = useState(Tweet);
    useEffect(() => {
        if(Tweet.length>200){
            setcutText(Tweet.slice(0,200))
        }
    }, []);
    return (
        <div className='w-full flex flex-col items-center mr-1 mt-2'>
        <div className='h bg-slate-500 h-auto pb-5 flex flex-col rounded-xl' style={{width:"98%"}}>
          <div id='tweet_area' className='h-24 w-full ml-4 flex flex-row gap-4 pt-2'>
            <div  className='h-14 w-1/12 bg-amber-100' style={{borderRadius:"40px"}}>
            </div>
            <div  className="rounded-xl h-auto pb-3" style={{width:"80%"}}>
                {Tweet.length < 230 ? Tweet : <div>{CutText} <button id='read_more' onClick={showFullText} style={{color:"blue"}}>...read more</button></div>}
            </div>
          </div>
          <div className='flex flex-row gap-5 ml-20'>
             <div style={{transition:"all 300ms"}} className='w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl'><FavoriteIcon/> like</div>
             <div style={{transition:"all 300ms"}} className='w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl'><AutorenewIcon/> retweet</div>
             <div style={{transition:"all 300ms"}} className='w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl'><ReplyIcon /> reply</div>
             <div style={{transition:"all 300ms"}} className='w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl'><BrushIcon /> quote</div>
          </div>
        </div>
      </div>
    );
}

export default Tweets;
