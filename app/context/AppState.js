'use client'
import AppContext from "./AppContext";
import React,{useState} from "react";
const AppState = ({ children }) => {
    // Define the state or any data you want to share using the context
    const [LoggedIn, setLoggedIn] = useState(false);
    const [Auth_Crededentials, setAuth_Crededentials] = useState("");
    const [UserDetails, setUserDetails] = useState({
      UserName : "",
      UserTag : "",
      UserId:"",
      Image:"",
      LikedList:"",
      Notifications : ""
    });
    const [NotificationList, setNotificationList] = useState([]);
    const [LikedList, setLikedList] = useState([]);
    const [Total_Documents,SetTotal_Documents]=useState(0);
    const [TweetsState, setTweetsState] = useState([]);
    const [SingleTweet, setSingleTweet] = useState([]);
    const [comments,setcomments] = useState([])
    return (
      <AppContext.Provider value={{NotificationList,setNotificationList,LikedList, setLikedList, Total_Documents,SetTotal_Documents,TweetsState,setTweetsState,LoggedIn, setLoggedIn, Auth_Crededentials, setAuth_Crededentials, UserDetails, setUserDetails,SingleTweet,setSingleTweet, comments,setcomments}}>
        {children}
      </AppContext.Provider>
    );
  };
export default AppState