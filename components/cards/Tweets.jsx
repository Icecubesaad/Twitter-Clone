"use client";
import React from "react";
import { useState, useEffect } from "react";

import ReplyIcon from "@mui/icons-material/Reply";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BrushIcon from "@mui/icons-material/Brush";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import AppContext from "@/app/context/AppContext";
import like_tweet from "@/hooks/likeTweet";
import { ThumbUp, ThumbsUpDown } from "@mui/icons-material";
const Tweets = ({ Text, Image, unique, ImageAmount,author,authorImage,LikedBy,Likes }) => {
  const [TweetLikes, setTweetLikes] = useState(Likes);
  const [liked, setliked] = useState(false);
  const context = useContext(AppContext)
  const {UserDetails} = context
  const [UserId, setUserId] = useState(null);
  useEffect(() => {
    if(UserId){
      return
    }
    getUserId()
    if(LikedBy.includes(UserDetails.UserId)){
        setliked(true)
    }
  }, []);
  useEffect(() => {
    if(UserDetails.UserId){
      if(LikedBy.includes(UserDetails.UserId)){           // working
        setliked(true)
      }
    }
    else{
      setliked(false)
    }
  }, [UserDetails.UserId]);
  const like = async()=>{
    const response = await like_tweet(unique,"like",UserId,author,"api/TweetActions/Like")
    if(response.status === 200){
      const response2 = await like_tweet(unique,"like",UserId,author,"api/TweetActions/Notifications/POST")
    }
    console.log(response)
    setTweetLikes((e)=>e+1)
  }
  const dislike = ()=>{
  
    like_tweet(unique,"dislike",UserId)
    setTweetLikes((e)=>e-1)

  }
  const getUserId = ()=>{
    setUserId(UserDetails.UserId)
  }
  const [ImageStyle, setImageStyle] = useState({
   image :  {height:"100%",width:"100%"}
  });
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
    if (ImageAmount === 1) {
      setImageGrid({
        main: {
          display: "flex",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
        },
        Left: {
            display: "flex",
            width: "100%",
            height: "250px",
            justifyContent :"center",
            alignItems:"center"
          },
          
      });
    }
    if (ImageAmount === 2) {
      setImageGrid({
        main: {
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          width: "80%",
        },
        Left: {
          display: "flex",
          width: "100%",
          height: "250px",
        },
        Right: {
          display: "flex",
          width: "100%",
          height: "250px",
        },
      });
    }
    if (ImageAmount === 3) {
      setImageGrid({
        main: {
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          width: "80%",
          columnGap : "20px"
        },
        Right: {
          display: "grid",
          gridTemplateRows: "repeat(2,1fr)",
          width: "100%",
          height: "200px",
        },
      });
    }
    if (ImageAmount === 4) {
      setImageGrid({
        main: {
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          width: "80%",
        },
        Left: {
          display: "grid",
          gridTemplateRows: "repeat(2,1fr)",
          width: "100%",
          height: "250px",
        },
        Right: {
          display: "grid",
          gridTemplateRows: "repeat(2,1fr)",
          width: "100%",
          height: "250px",
        },
      });
    }
  }, []);
  const [style, setstyle] = useState({
    color: "blue",
    display: "flex",
  });
  const showFullText = () => {
    setstyle({ display: "none" });
    const tweet_area = document.getElementById("tweet_area");
    const read_more = document.getElementById("read_more");
    read_more.style.display = "none";
    tweet_area.style.height = "auto";
    setcutText(Text);
  };
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
        <div className=" ml-5 flex flex-row gap-2">
          <div className=" h-7 w-7 border-1 rounded-full bg-blue-700 flex items-center justify-center"><ThumbUp sx={{ fontSize: 20 }}/></div>
          <div>{TweetLikes}</div>
        </div>
        <div className="flex flex-row gap-5 ml-20">
        {(LikedBy.includes(UserDetails.UserId) && liked) || liked
        ? 
        <div
        style={{ transition: "all 300ms" }}
        className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4 rounded-lg"
        onClick={()=>{dislike(),setliked(false)}}
      ><FavoriteIcon sx={{color:"red"}}/> Liked</div>
              : 
          <div
            style={{ transition: "all 300ms" }}
            className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4 rounded-lg"
            onClick={()=>{like(),setliked(true)}}
          >
              <FavoriteIcon /> like </div> 
              }
          <div
            style={{ transition: "all 300ms" }}
            className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4  rounded-lg"
          >
            <AutorenewIcon /> retweet
          </div>
          <div
            style={{ transition: "all 300ms" }}
            className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4  rounded-lg"
          >
            <ReplyIcon /> reply
          </div>
          <div
            style={{ transition: "all 300ms" }}
            className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4 rounded-lg"
          >
            <BrushIcon /> quote
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweets;
