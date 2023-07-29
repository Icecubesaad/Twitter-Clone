'use client'
import AppContext from "./AppContext";
import React,{useState} from "react";
const AppState = ({ children }) => {
    // Define the state or any data you want to share using the context
    const [LoggedIn, setLoggedIn] = useState(false);
    const [Auth_Crededentials, setAuth_Crededentials] = useState("");
    return (
      <AppContext.Provider value={{ LoggedIn, setLoggedIn, Auth_Crededentials, setAuth_Crededentials }}>
        {children}
      </AppContext.Provider>
    );
  };
export default AppState