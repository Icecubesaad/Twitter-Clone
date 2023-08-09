"use client";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";
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
import Tweet_call from "@/hooks/Tweet";
import Spinner from "@/components/Loading/Spinner";
export default function Home() {
  const {push} = useRouter()
  const [loadingPost, setloadingPost] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [fetching, setfetching] = useState(false);
  const [limit, setlimit] = useState(3);
  const [DocumentLeft, setDocumentLeft] = useState(null);
  const [loading, setloading] = useState(true);
  const [media, setmedia] = useState([]);
  const [option, setoption] = useState(false);
  const context = useContext(AppContext);
  const [imagePayload, setimagePayload] = useState("");
  const [skip, setskip] = useState(0);
  
  

  const { LoggedIn, setLoggedIn, UserDetails, setUserDetails,TweetsState,setTweetsState,Total_Documents,SetTotal_Documents } = context;
  // ref for tweet media
  const searchBoxRef = useRef(null);
  const fileInputRef = useRef(null);
  let token;


    // tweet payload
  const [Tweet, setTweet] = useState({
    Text: "",
    Image: ["null"], 
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
    if(TweetsState.length===0){
      GetTweets(limit,skip)   
    }
    checkingToken()
    const interval = setInterval(checkingToken, 60 * 60 * 1000); // 1 hour interval

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Setting token in Tweet Payload
  const checkingToken = ()=>{
    console.log("heh")
    const cookies = new Cookies();
    token = cookies.get("user") || null;
    if (token) {
      setLoggedIn(true);
      getDetails(token);
      settingToken(token)
    } else {
      setLoggedIn(false);
    }
  }



  const settingToken =(token)=>{
    setTweet({
      User_id : token,
      "Image":["null"]
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
      UserId : User_data.message._id,
      Image:User_data.message.Image
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
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };





  // making call to post tweet



  const PostTweet = async () => {
    setloadingPost(true)
    const response = await Server_call("/api/TweetPost",Tweet,"POST");
    const response_back = await response.json()
    if(response_back.message === 'SUCCESS'){
      setloadingPost(false)
      setTweetsState([Tweet,...TweetsState])
    }
  };


  useEffect(() => {
    console.log(Tweet)
  }, [Tweet]);


  const FetchNewData = async()=>{
    console.log("getting new document of limit : ",limit," documents left are : ",DocumentLeft)
    console.log("from fetched data : ",TweetsState)
    const response = await Get_server_call(`/api/TweetGet?limit=${limit}&skip=${skip}`)
      const response_back = await response.json();
      if(response_back.message.data){
        setskip(e=>e+3)
        setDocumentLeft(response_back.message.DocumentsLeft)
        console.log("Document Left : ",response_back.message.DocumentLeft)
        console.log(typeof(response_back.message.data))     // object
        console.log("raw : ",response_back.message.data)
        setTweetsState([...TweetsState,...response_back.message.data])
        setfetching(true)
      }
  }

  // getting tweets from Database

    const GetTweets = async(limit,skip)=>{
      console.log("inside a function : ",TweetsState)
      const response = await Get_server_call(`/api/TweetGet?limit=${limit}&skip=${skip}`)
      const response_back = await response.json();
      if(response_back.message.data){
        setskip(e=>e+3)
        console.log("fetched the initial data")
        setDocumentLeft(response_back.message.DocumentsLeft)
        console.log("Documents Requested: ",limit," Documents Left : ",response_back.message.DocumentsLeft)
        setTweetsState([...response_back.message.data])
        setfetching(true)
      }
      return response_back
    }



    useEffect(() => {
      console.log("TRIGGEREd")
      console.log(DocumentLeft)
      if(DocumentLeft<5 && DocumentLeft>0 && DocumentLeft!=null){
        setlimit(DocumentLeft)
      }
      if(DocumentLeft<=0  && DocumentLeft!=null){
        console.log("All the data has been fetched")
        sethasMore(false)
      }
      if(DocumentLeft>0 && fetching && DocumentLeft!=null)
      {
        console.log("FETCHING NEW DATa")
        FetchNewData()
      }
    }, [DocumentLeft]);



    useEffect(() => {
      console.log(TweetsState)
    }, [TweetsState]);


    
  return (
    <div className="flex flex-row">
      <LeftSidebar />
      <div className=" element-with-scrollbar w-2/4 flex flex-col gap-2 items-center mr-5" style={{height:"120vh" , overflow:"hidden", overflowY : "scroll"}}>
        {LoggedIn ? <div
          className="h background_of_sub_component h-auto flex flex-col rounded-xl pb-5"
          style={{ width: "98%" }}
        >
          <div className="h-auto w-full ml-3 flex flex-row gap-4 pt-2">
            <div
            
              className="w-1/12 bg-amber-100"
              style={{ borderRadius: "40px",height:"53px" }}
            >
              <img src={UserDetails.Image} className=" rounded-full border-1 border-black" style={{height:"100%",width:"100%"}} />
            </div>
            <div className="rounded-xl h-auto" style={{ width: "80%" }}>
              <textarea
                onChange={changeTweet}
                name="Text"
                className="background_of_sub_component_contrast"
                placeholder="what's happening"
                style={{
                  overflow: 'hidden',
                  width: '100%',
                  height: 'auto',
                  resize: 'none', // Change this to your desired background color
                  color: 'white',
                  fontFamily: 'sans-serif',
                  fontSize: '1.25rem',
                  borderRadius: '1rem',
                  border: 'none',
                  outline: 'none',
                  padding: '1rem',
                }}
                // className=" backdrop-blur-sm w-full rounded-xl h-auto text-white font-sans placeholder:text-white text-lg bg-slate-900 border-none outline-none pl-5 bg-blend-saturation"
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


          <div className="flex flex-row gap-8 ml-20">
            <div>
              <button
                style={{ transition: "all 300ms" }}
                onClick={handleSelectFile}
                className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4  rounded-lg"
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
              className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500  pb-4 background_of_sub_component_contrast rounded-lg"
            >
              <PlayCircleIcon sx={{ color: "blue" }} /> video
            </div>
            <div
              style={{ transition: "all 300ms" }}
              className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500  pb-4 background_of_sub_component_contrast rounded-lg"
            >
              <FormatQuoteIcon sx={{ color: "orange" }} /> quote
            </div>
            <button
            onClick={PostTweet}
              style={{ transition: "all 300ms" }}
              className="w cursor-pointer w-auto pl-4 pr-4 flex flex-row items-center gap-1 text-white h-12 border-1 hover:bg-slate-500 pb-4 background_of_sub_component_contrast rounded-lg justify-center"
            >
               {!loadingPost ? <div className="pt-4"><Send sx={{ color: "white" }} /> Post</div> : <div className="pr-4"><Spinner/></div>}
            </button>

          </div>
        </div>:null}
        { TweetsState.length>0 ?
          TweetsState.map((e,index)=>
            <Tweets authorImage={e.UserImage} author={e.postedBy} Text={e.Text} unique={e._id} Image={e.image} ImageAmount={e.imageAmount} User_using={UserDetails.UserId} />
          )
          : null
        }
       {DocumentLeft>0 ? <div className=" flex items-center justify-center"><Spinner/></div> : <div className=" text-white">No more tweets ):</div>}
      </div>
      <RightSidebar />
    </div>
  );
}
