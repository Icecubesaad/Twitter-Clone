"use client";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useRouter } from "next/navigation";
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
import Spinner from "@/components/Loading/Spinner";
import checkLikes from "@/hooks/checkLikes";
import MainPageTweets from "@/components/MainPageTweets";
export default function Home() {
  return (
    <div className="flex flex-row">
      <LeftSidebar />
      <MainPageTweets/>
      <RightSidebar />
    </div>
  );
}
