"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useContext } from "react";
import AppContext from "@/app/context/AppContext";
import Spinner from "./Loading/Spinner";
import { ExitToApp, Logout } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Cookies, useCookies } from "react-cookie";
import { Badge } from "@mui/material";
import Sidebar from "./others/Sidebar";
import SideBarNotifications from "./others/sideBarNotifications";
import gettingNotifications from "@/hooks/GettingNotifications";
const Header = () => {
  const { push } = useRouter();
  const context = useContext(AppContext);
  const {
    LoggedIn,
    setLoggedIn,
    UserDetails,
    setUserDetails,
    NotificationList,
    setNotificationList,
    getDetails
  } = context;




    
let token;

useEffect(() => {
  console.log("heh")
  const cookies = new Cookies();
  token = cookies.get("user") || null;
  if (token) {
    setLoggedIn(true);
    getDetails(token);
  } else {
    setLoggedIn(false);
  }
}, []);


















  const [length, setlength] = useState(UserDetails.Notifications);
  useEffect(() => {
    if (UserDetails.Notifications) {
      setlength(UserDetails.Notifications);
    }
  }, [UserDetails.Notifications]);
  const sidebar = () => {
    const sideBar_component = document.getElementById("sidebar");
    if (sideBar_component.classList.contains("active")) {
      sideBar_component.classList.remove("active");
    } else {
      sideBar_component.classList.add("active");
    }
  };
  const sidebarNotify = async () => {
    const sideBar_component = document.getElementById("sidebarNotify");
    if (sideBar_component.classList.contains("active")) {
      sideBar_component.classList.remove("active");
    } else {
      sideBar_component.classList.add("active");
    }
    if ((NotificationList && NotificationList.length==0) || UserDetails.Notifications > 0) {
      const response = await gettingNotifications(
        UserDetails.UserId,
        "/api/Tweets/TweetActions/Notifications/GET"
      );
      if (response) {
        console.log(response)
        setNotificationList(response);
        const response2 = await gettingNotifications(
          UserDetails.UserId,
          "/api/Tweets/TweetActions/Notifications/Reset"
        );
        setUserDetails({
          ...UserDetails,Notifications : 0
        })
      }
    }
    // UserDetails.Notifications = []
  };
  useEffect(() => {
    console.log(NotificationList);
  }, [NotificationList]);
  const Logout_func = () => {
    try {
      setUserDetails({
        UserName: "",
        UserTag: "",
        UserId: "",
        Image: "",
        LikedList: "",
      });
      setNotificationList([]);
      setLoggedIn(false);
      const cookie = new Cookies();
      cookie.remove("user");
      push("/Login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-ful h-16 flex flex-row">
      <div className="left_sidebar w-3/4 flex flex-row items-center">
        <div className="w-1/12"></div>
        <div className="rounded-xl h-12" style={{ width: "27%" }}>
          <input
            placeholder="Search here"
            className=" backdrop-blur-sm w-full rounded-xl h-12 text-white font-sans placeholder:text-white background_of_sub_component border-none outline-none pl-3 bg-blend-saturation"
          />
        </div>
      </div>

      {LoggedIn ? (
        <div className="right_sidebar w-2/5 h-14 flex flex-row items-center justify-between">
          <div className="w-13 bg-white h-12 w-24 border-2 rounded-xl border-white flex items-center justify-center">
            Home
          </div>
          <div>
            <EmailIcon sx={{ color: "white", fontSize: 30 }} />
          </div>
          <button onClick={sidebarNotify}>
            <Badge
              badgeContent={UserDetails.Notifications > 0 ? length : null}
              color="primary"
            >
              <NotificationsIcon sx={{ color: "white", fontSize: 30 }} />
            </Badge>
          </button>
          <div
            className="h-10 flex background_of_sub_component flex-row border-white border w-auto pr-3 items-center "
            style={{ borderRadius: 50 }}
          >
            <div className="w-10 border1 border-white bg-white rounded-full h-10">
              {UserDetails.Image ? (
                <img
                  src={UserDetails.Image}
                  className=" h-full w-full border-1 background_of_sub_component rounded-full"
                />
              ) : (
                <Spinner />
              )}
            </div>
            <div className="text-white text-sm ml-2 flex justify-center items-center">
              {UserDetails.UserName === "" ? <Spinner /> : UserDetails.UserName}
            </div>
          </div>
          <Sidebar Logout_func={Logout_func} sidebar={sidebar} />
          <SideBarNotifications sidebarNotify={sidebarNotify} />
        </div>
      ) : (
        <div className="w-2/5 h-14"></div>
      )}
    </div>
  );
};

export default Header;
