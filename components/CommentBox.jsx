'use client'
import React from 'react';
import { useState,useEffect,useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Send } from "@mui/icons-material";
import Server_call from '@/hooks/PostRequest';
import Spinner from './Loading/Spinner';
import AppContext from '@/app/context/AppContext';
import { useContext } from 'react';
const CommentBox = ({handleClose,TweetId, open,accountName, User,TweetText,AccountPic,UserPic,UserId}) => {
  const context = useContext(AppContext)
  const {UserDetails} = context
    const searchBoxRef = useRef(null);
    const fileInputRef = useRef(null);
    const [media, setmedia] = useState([]);
    const [option, setoption] = useState(false);
    const [loading, setloading] = useState(false);
    const [Tweet, setTweet] = useState({
        Text: "",
        User_id : UserDetails.UserId,
        Image: ["null"],
        OriginalTweet : TweetId,
        UserTag:UserDetails.UserTag,
        UserImage:UserDetails.Image
      });


      //IMAGES FUNCTIONALITY
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            searchBoxRef.current &&
            !searchBoxRef.current.contains(event.target)
          ) {
            setoption(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [option]);
      const handleSelectFile = () => {
        fileInputRef.current.click();
      };
    
    
    
    
    
      const handleFileInputChange = async (event) => {
      
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setmedia((e) => [...e, reader.result]);
        };
    
      };
    
    
    
    
      // media of tweet
    
      useEffect(() => {
          changingMediaState(media);
      }, [media]);
    
    
    
      const changingMediaState = (media) => {
        setTweet({
          ...Tweet,
          Image: media,
        });
      };

      
      // END OF IMAGES FUNCTIONALITY
      const changeTweet = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setTweet({
          ...Tweet,
          [name]: value,
        });
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      };


      // POSTING TWEET
      const PostTweet = async()=>{
        setloading(true)
        const response = await Server_call("/api/comments/POST",Tweet,"POST")
        if(response.status === 200){
            setloading(false)
            handleClose()
        }
      }
    return (
        <Dialog open={open} onClose={handleClose} className=" bg-transparent">
        <DialogTitle className=" bg-slate-700 text-white border-1 rounded-tl-xl rounded-tr-xl">replying to @ {accountName}</DialogTitle>
        <DialogContent className=" bg-slate-700 Text-white rounded-bl-xl rounded-br-xl">
          <div className="flex  flex-col w-full h-auto">
            <div className="flex flex-row w-full h-20 items-center gap-2">
              <div className=" h-12 w-14 border-1 rounded-full bg-slate-900" style={{height:"51px"}}>
                <img src={AccountPic} className=' border rounded-full' style={{height:"100%",width:"100%"}}/>
              </div>
              <div className=" w-full text-white">{accountName}</div>
            </div>
            <article className="h-auto text-white">
              {TweetText}
            </article>
          </div>
          <div>
          <div className="flex flex-row w-full h-20 items-center gap-2">
              <div className=" h-12 w-14 border-1 rounded-full bg-slate-900" style={{height:"51px"}}>
              <img src={UserPic} className=' border rounded-full' style={{height:"100%",width:"100%"}}/>
              </div>
              <div className=" w-full text-white">{User}</div>
            </div>
            <div className="w-full">
            <div className="rounded-xl h-auto" style={{ width: "100%" }}>
              <textarea
                onChange={changeTweet}
                name="Text"
                className="background_of_sub_component_contrast"
                placeholder="write your reply"
                style={{
                  overflow: 'hidden',
                  width: '100%',
                  height: 'auto',
                  resize: 'none', // Change this to your desired background color
                  color: 'white',
                  fontFamily: 'sans-serif',
                  fontSize: '1.25rem',
                  borderRadius: '1rem',
                  border: 'none',
                  outline: 'none',
                  padding: '1rem',
                }}
                // className=" backdrop-blur-sm w-full rounded-xl h-auto text-white font-sans placeholder:text-white text-lg bg-slate-900 border-none outline-none pl-5 bg-blend-saturation"
              />
            </div>
            <div className="flex flex-col w-full h-auto items-center">
          {
            media ? media.map((e,index)=>
            <img src={e} width={300} height={150} className=" border-1 border-slate-900 rounded-xl" key={index} />
            )
            :
            null
          }
          </div>
            <div className="flex flex-row gap-8">
            <div>
              <button
                style={{ transition: "all 300ms" }}
                onClick={handleSelectFile}
                className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4  rounded-lg"
              >
                <InsertPhotoIcon sx={{ color: "green" }} /> images
              </button>
              <input
                className="absolute opacity-0 top-1 "
                ref={fileInputRef}
                onChange={handleFileInputChange}
                type="file"
              />
            </div>

            <div
              style={{ transition: "all 300ms" }}
              className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500  pb-4 background_of_sub_component_contrast rounded-lg"
            >
              <PlayCircleIcon sx={{ color: "blue" }} /> video
            </div>
            <div
              style={{ transition: "all 300ms" }}
              className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500  pb-4 background_of_sub_component_contrast rounded-lg"
            >
              <FormatQuoteIcon sx={{ color: "orange" }} /> quote
            </div>
            <button
            onClick={PostTweet}
              style={{ transition: "all 300ms" }}
              className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 hover:bg-slate-500 pb-4 background_of_sub_component_contrast rounded-lg justify-center"
            >
               {!loading ? <div className="pt-4"><Send sx={{ color: "white" }} /> Post</div> : <div className="pr-4"><Spinner/></div>}
            </button>

          </div>
          </div>
          </div>
          
        </DialogContent>
      </Dialog>
    );
}

export default CommentBox;
