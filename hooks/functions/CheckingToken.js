import { Cookies } from "react-cookie";
const checkingToken = (getDetails,setLoggedIn)=>{
    const cookies = new Cookies();
    let token = cookies.get("user") || null;
    if (token) {
      setLoggedIn(true);
      getDetails(token);
    } else {
      setLoggedIn(false);
    }
  }
module.exports = checkingToken