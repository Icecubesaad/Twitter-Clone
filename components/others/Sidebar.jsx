import React from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { ExitToApp, Logout } from "@mui/icons-material";
const Sidebar = ({Logout_func,sidebar}) => {
    return (
        <div className="mr-2">
            <div id="sidebar" className="SideBar h-screen bg-slate-500">
              <button id="closebtn" onClick={sidebar}>
                <CloseIcon sx={{ fontSize: 40 }} />
              </button>
              <button className=" mt-3" onClick={Logout_func}>
                <ExitToApp sx={{ fontSize: 40 }} />
                Logout
              </button>
            </div>
            <button onClick={sidebar}>
              <MenuIcon sx={{ color: "white", fontSize: 30 }} />
            </button>
          </div>
    );
}

export default Sidebar;
