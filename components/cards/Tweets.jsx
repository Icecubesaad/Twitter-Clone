"use client";
import React from "react";
import { useState, useEffect } from "react";

import ReplyIcon from "@mui/icons-material/Reply";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BrushIcon from "@mui/icons-material/Brush";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import AppContext from "@/app/context/AppContext";
import like_tweet from "@/hooks/ActionCaller";
import { ThumbUp, ThumbsUpDown } from "@mui/icons-material";
import CommentBox from "../CommentBox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ActionCaller from "@/hooks/ActionCaller";
import { followers, getting_image_grid_styles, handleClickOpen, handleClose } from "@/hooks";
const Tweets = ({ Text, Image, unique, ImageAmount,author,authorImage,LikedBy,Likes,link,query,Comments }) => {
  const [TweetLikes, setTweetLikes] = useState(Likes);
  const router = useRouter()
  const [liked, setliked] = useState(false);
  const context = useContext(AppContext)
  const {UserDetails} = context
  const [UserId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [comments, setcomments] = useState(Comments);



  // FOR INIITAL RENDER


  useEffect(() => {
    if(UserId){
      return
    }
    getUserId()

    if(LikedBy.includes(UserDetails.UserId)){
        setliked(true)
    }
  }, []);


  // CHECKING LIKES  ON A TWEET BY LOGGED IN USER WHENEVER USER ID CHANGES (LOGGING, SIGNING OUT)


  useEffect(() => {
    if(UserDetails.UserId){
      if(LikedBy.includes(UserDetails.UserId)){ 
        setliked(true)
      }
    }
    else{
      setliked(false)
    }
  }, [UserDetails.UserId]);

  // LIKING TWEET

  const like = async()=>{
    if(!UserDetails.UserId || UserDetails.UserId === ''){
      router.push('/Login')
    }
    else{
      setliked(true)
      setTweetLikes((e)=>e+1)
      const response = await ActionCaller(unique,"like",UserDetails.UserId,author,`/api/Tweets/TweetActions/Like?t=${query}`)
      if(response && response.status === 200){
        const response2 = await ActionCaller(unique,"like",UserDetails.UserId,author,`/api/Tweets/TweetActions/Notifications/POST?t=${query}`)
      }
      if(response && response.status === 402){
        return
      }
      if(response && response.status === 405){
        router.push('/Login')
      }
    }
  }

  // DISLIKING TWEET
  const dislike = ()=>{
    setliked(false)
    ActionCaller(unique,"dislike",UserId,author,`/api/Tweets/TweetActions/Like?t=${query}`)
    setTweetLikes((e)=>e-1)
  }
  const getUserId = ()=>{
    setUserId(UserDetails.UserId)
  }

  const [ImageStyle, setImageStyle] = useState({
   image :  {height:"100%",width:"100%"}
  });


  // SETTING THE IMAGE GRID STYLES FOR INDIVIDUAL TWEETS

  const [ImageGrid, setImageGrid] = useState({
    Left: {
      display: "grid",
      gridTemplateColumns: "",
      gridTemplateRows: "",
    },
    Right: {
      display: "grid",
      gridTemplateColumns: "",
      gridTemplateRows: "",
    },
    main: {
      display: "grid",
      gridTemplateColumns: "",
      gridTemplateRows: "",
    },
  });


  useEffect(() => {
    getting_image_grid_styles(ImageAmount,setImageGrid)
  }, []);

  const [style, setstyle] = useState({
    color: "blue",
    display: "flex",
  });

  // SHOWING FULL TEXT

  const showFullText = () => {
    setstyle({ display: "none" });
    const tweet_area = document.getElementById("tweet_area");
    const read_more = document.getElementById("read_more");
    read_more.style.display = "none";
    tweet_area.style.height = "auto";
    setcutText(Text);
  };

  // SLICING TEXT STRING IF IT EXCEEDS THE LIMIT OF 200 AND ADDING A READ MORE BUTTON.

  const [CutText, setcutText] = useState(Text);
  useEffect(() => {
    if (Text.length > 200) {
      setcutText(Text.slice(0, 200));
    }
  }, []);
  
  return (
    
    <div className="w-full flex flex-col items-center mr-1 mt-2" key={unique}>
      <div
        className="h background_of_sub_component text-white h-auto pb-5 flex flex-col rounded-xl"
        style={{ width: "98%" }}
      >
      <Link href={{ pathname : `${link+unique}`, query:{'t':query}}} className="w-full">
        <div
          id="tweet_area"
          className="h-auto w-full ml-4 flex flex-col gap-4 pt-2 pb-3"
        >
          <div className=" flex flex-row w-full gap-6 items-center">
          <div
            className="w-1/12 bg-amber-100"
            style={{ borderRadius: "40px",height:"53px" }}
          >
            {authorImage ? <img src={authorImage} style={ImageStyle.image} className=" border-1 rounded-full" /> : null}
          </div>
          <div>{author}</div>
          
          </div>
          <div
            className="rounded-xl h-auto pb-3 text-lg"
            style={{ width: "100%" }}
          >
            {Text.length < 230 ? (
              Text
            ) : (
              <div>
                {CutText}
                <button id="read_more" onClick={showFullText} style={style}>
                  ...read more
                </button>
              </div>
            )}
          </div>
        </div>
        { Image && Image[0] !== "null" ? <div
          className=" flex item-center justify-center pb-3 ml-10"
          style={ImageGrid.main}
        >
          <div style={ImageGrid.Left}>
            {ImageAmount === 1 || ImageAmount === 2 ||  ImageAmount===3 ? (
              <div style={{height:"auto"}}>
                <img src={Image[0]} className=" rounded-xl  border-1 border-slate-700"  style={{height:"250px",width:"300px"}} />
              </div>
            ) : null}
            {ImageAmount === 4 ? (
              <div style={ImageGrid.Left}>
                <img src={Image[0]} className=" rounded-xl  border-1 border-slate-700"  style={{height:"125px",width:"100%"}}/>
                <img src={Image[2]} className=" rounded-xl  border-1 border-slate-700" style={{height:"125px",width:"100%"}}/>
              </div>
            ) : null}
          </div>
          {ImageAmount >= 2 ? (
            <div style={{height:"auto",width:"100%"}}>
              {ImageAmount === 2 ? (
                <div style={ImageGrid.Right}>
                  <img src={Image[1]} className="rounded-xl  border-1 border-slate-700" style={{height:"250px",width:"300px"}} />
                </div>
              ) : null}
              {
                ImageAmount === 3 ? (
                    <div style={ImageGrid.Right}>
                      <img src={Image[1]} className="rounded-xl  border-1 border-slate-700" style={{height:"125px",width:"100%"}}/>
                      <img src={Image[2]} className="rounded-xl  border-1 border-slate-700" style={{height:"125px",width:"100%"}}/>
                    </div>
                  ) : null 
              }
              {ImageAmount === 4 ? (
                <div style={ImageGrid.Right}>
                  <img src={Image[1]} className=" rounded-xl  border-1 border-slate-700" style={{height:"125px",width:"100%"}}/>
                  <img src={Image[3]} className=" rounded-xl  border-1 border-slate-700" style={{height:"125px",width:"100%"}}/>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>:null}
        <div className=" flex flex-row justify-between w-full">
        <div className=" ml-5 flex flex-row gap-2">
          <div className=" h-7 w-7 border-1 rounded-full bg-blue-700 flex items-center justify-center"><ThumbUp sx={{ fontSize: 20 }}/></div>
          <div>{TweetLikes}</div>
        </div>
        <div className=" mr-3 text-white">
                {comments} comments
        </div>
        </div>
          </Link>
        <div className="flex flex-row gap-5 ml-4 mt-4 mr-4">
        {(LikedBy.includes(UserDetails.UserId) && liked) || liked
        ? 
        <div
        style={{ transition: "all 300ms" }}
        className="w cursor-pointer w-1/3 pl-6 pr-6 flex flex-row justify-center items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4 rounded-lg"
        onClick={()=>{dislike()}}
      ><FavoriteIcon sx={{color:"red"}}/> Liked</div>
      : 
      <div
      style={{ transition: "all 300ms" }}
      className="w cursor-pointer w-1/3 pl-6 pr-6 flex flex-row justify-center items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4 rounded-lg"
      onClick={()=>{like()}}
      >
              <FavoriteIcon /> like </div> 
              }
          <div
            style={{ transition: "all 300ms" }}
            className="w cursor-pointer w-1/3 pl-4 pr-4 flex justify-center  flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4  rounded-lg"
          >
            <AutorenewIcon /> retweet
          </div>
          <div
            style={{ transition: "all 300ms" }}
            onClick={()=>handleClickOpen(setOpen,UserDetails.UserId,router)}
            className="w cursor-pointer w-1/3 pl-4 pr-4 flex justify-center  flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4  rounded-lg"
          >
            <ReplyIcon /> reply
          </div>
          <CommentBox open={open} accountName={author} AccountPic={authorImage} TweetText={Text} User={UserDetails.UserTag} TweetId={unique} UserPic={UserDetails.Image} UserId={UserDetails.UserId} handleClose={()=>{handleClose(setOpen)}} />
        </div>
      </div>
    </div>
  );
};

export default Tweets;
