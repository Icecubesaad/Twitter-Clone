import React from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from 'react';
import AppContext from '@/app/context/AppContext';
import NotificationsLike from '../cards/NotificationsLike';
import Spinner from '../Loading/Spinner';
const SideBarNotifications = ({sidebarNotify}) => {
  const context = useContext(AppContext)
  const {NotificationList} = context
    return (
        <div className="mr-2">
        <div id="sidebarNotify" className="sidebarNotify overflow-hidden overflow-y-scroll h-screen bg-black flex flex-col">
            <button id="closebtnNotify" onClick={sidebarNotify}>
                <CloseIcon sx={{ fontSize: 40, color:"white" }} />
              </button>
              <div className=' flex flex-col w-full'>
              {
                NotificationList ? NotificationList.map((e)=><NotificationsLike Name={e.name} image={e.image} Text={e.Tweet} />) : <div><Spinner/></div>
              }
              </div>
        </div>
      </div>
    );
}

export default SideBarNotifications;
