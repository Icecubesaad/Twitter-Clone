"use client";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import { useRef } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Tweets from "@/components/cards/Tweets";
import { Cookies } from "react-cookie";
import { useContext, useEffect } from "react";
import AppContext from "./context/AppContext";
import Server_call from "@/hooks/PostRequest";
import Get_server_call from "@/hooks/GetRequest";
import { useState } from "react";
import { Send } from "@mui/icons-material";
export default function Home() {
  const [media, setmedia] = useState([]);
  const [option, setoption] = useState(false);
  const context = useContext(AppContext);
  const [imagePayload, setimagePayload] = useState("");
  const { LoggedIn, setLoggedIn, UserDetails, setUserDetails } = context;
  // ref for tweet media
  const searchBoxRef = useRef(null);
  const fileInputRef = useRef(null);
  let token;


    // tweet payload
  const [Tweet, setTweet] = useState({
    Text: "",
    Image: [], 
    User_id : ""
  });





  // getting input from media file and setting it into tweet payload


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
    console.log("TRIGGERED");
    console.log(event);
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



  // getting token from cookies


  useEffect(() => {
    GetTweets()
    const cookies = new Cookies();
    token = cookies.get("user") || null;
    if (token) {
      setLoggedIn(true);
      getDetails(token);
      settingToken(token)
    } else {
      setLoggedIn(false);
    }
  }, []);

  // Setting token in Tweet Payload


  const settingToken =(token)=>{
    setTweet({
      User_id : token
    })
  }


  // Getting User Details




  const getDetails = async (data) => {
    
    const request = await Server_call(
      "/api/getDetails",
      data,
      "POST"
    );
    const User_data = await request.json();
    setUserDetails({
      UserName: User_data.message.User_Name,
      UserTag: User_data.message.User_tag,
      UserId : User_data.message._id
    });
  };




  // changing tweet credit (might turn it into a seprate function)


  const changeTweet = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTweet({
      ...Tweet,
      [name]: value,
    });
  };





  // making call to post tweet



  const PostTweet = async () => {
    const response = Server_call("/api/TweetPost",Tweet,"POST")
  };


  // getting tweets from Database

    const GetTweets = async()=>{
      const response = await Get_server_call("/api/TweetGet")
      const response_back = await response.json();
      console.log(response_back)
    }

  return (
    <div className="flex flex-row">
      <LeftSidebar />
      <div className="w-2/4 flex flex-col gap-2 items-center mr-5">
        <div
          className="h bg-slate-500 h-auto flex flex-col rounded-xl pb-5"
          style={{ width: "98%" }}
        >
          <div className="h-24 w-full ml-4 flex flex-row gap-4 pt-2">
            <div
              className="h-14 w-1/12 bg-amber-100"
              style={{ borderRadius: "40px" }}
            ></div>
            <div className="rounded-xl h-12" style={{ width: "80%" }}>
              <input
                onChange={changeTweet}
                name="Text"
                placeholder="what's happening"
                className=" backdrop-blur-sm w-full rounded-xl h-12 text-white font-sans placeholder:text-white bg-slate-900 border-none outline-none pl-5 bg-blend-saturation"
              />
            </div>
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







          <div className="flex flex-row gap-5 ml-20">
            <div>
              <button
                style={{ transition: "all 300ms" }}
                onClick={handleSelectFile}
                className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl"
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
              className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl"
            >
              <PlayCircleIcon sx={{ color: "blue" }} /> video
            </div>
            <div
              style={{ transition: "all 300ms" }}
              className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl"
            >
              <FormatQuoteIcon sx={{ color: "orange" }} /> quote
            </div>
            <button
            onClick={PostTweet}
              style={{ transition: "all 300ms" }}
              className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-8 border-2 pt-4 hover:bg-slate-500 bg-slate-900 pb-4 border-slate-900 rounded-3xl"
            >
              <Send sx={{ color: "white" }} /> Post
            </button>

          </div>
        </div>
        <Tweets />
      </div>
      <RightSidebar />
    </div>
  );
}
