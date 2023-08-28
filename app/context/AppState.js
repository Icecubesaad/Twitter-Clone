'use client'
import AppContext from "./AppContext";
import React,{useState} from "react";
import Server_call from "@/hooks/PostRequest";
const AppState = ({ children }) => {
    // Define the state or any data you want to share using the context
    const [LoggedIn, setLoggedIn] = useState(false);
    const [Auth_Crededentials, setAuth_Crededentials] = useState("");
    const [UserDetails, setUserDetails] = useState({
      UserName : "",
      UserTag : "",
      UserId:"",
      Image:"",
      LikedList:[],
      Notifications : [],
      Followers:0,
      Following:0,
      FollowerList:[],
      FollowingList:[]
    });
    const [NotificationList, setNotificationList] = useState([]);
    const [LikedList, setLikedList] = useState([]);
    const [Total_Documents,SetTotal_Documents]=useState(0);
    const [TweetsState, setTweetsState] = useState([]);
    const [SingleTweet, setSingleTweet] = useState([]);
    const [comments,setcomments] = useState([])
    const getDetails = async (data) => {
    
      const request = await Server_call(
        "/api/Auth/getDetails",
        data,
        "POST"
      );
      const User_data = await request.json();
      setUserDetails({
        UserName: User_data.message.User_Name,
        UserTag: User_data.message.User_tag,
        UserId : User_data.message._id,
        Image:User_data.message.Image,
        LikedList : User_data.message.Like_list,
        Notifications : User_data.message.NewNotifications,
        Followers:User_data.message.Followers,
        Following:User_data.message.Following,
        FollowerList:User_data.message.Follower_list,
        FollowingList:User_data.message.Following_list
      });
    };
    return (
      <AppContext.Provider value={{getDetails,NotificationList,setNotificationList,LikedList, setLikedList, Total_Documents,SetTotal_Documents,TweetsState,setTweetsState,LoggedIn, setLoggedIn, Auth_Crededentials, setAuth_Crededentials, UserDetails, setUserDetails,SingleTweet,setSingleTweet, comments,setcomments}}>
        {children}
      </AppContext.Provider>
    );
  };
export default AppState