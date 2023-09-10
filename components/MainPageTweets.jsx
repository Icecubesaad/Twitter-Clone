"use client";
import React from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useRef } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Tweets from "@/components/cards/Tweets";
import { Cookies } from "react-cookie";
import { useContext, useEffect } from "react";
import AppContext from "@/app/context/AppContext";
import Server_call from "@/hooks/PostRequest";
import Get_server_call from "@/hooks/GetRequest";
import { useState } from "react";
import { Send } from "@mui/icons-material";
import Spinner from "@/components/Loading/Spinner";
import checkLikes from "@/hooks/checkLikes";
import { GetTweets, checkingToken } from "@/hooks";
const MainPageTweets = () => {
    const [loadingPost, setloadingPost] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [fetching, setfetching] = useState(false);
  const [totalDocuments, settotalDocuments] = useState(null);
  const [DocumentLeft, setDocumentLeft] = useState(null);
  const [loading, setloading] = useState(true);
  const [limit, setlimit] = useState(3);
  const [media, setmedia] = useState([]);
  const [option, setoption] = useState(false);
  const context = useContext(AppContext);
  const [imagePayload, setimagePayload] = useState("");
  const [skip, setskip] = useState(0);
  const [clientSide, setclientSide] = useState(false);
  

  const { LoggedIn,setLikedList,LikedList, setLoggedIn, UserDetails, setUserDetails,TweetsState,setTweetsState,Total_Documents,SetTotal_Documents,getDetails } = context;
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
      ["Image"]: media,
    });
  };




  // getting token from cookies
  

  useEffect(() => {
    if(TweetsState.length===0){
      const response = GetTweets(limit,skip,setskip,setfetching,setDocumentLeft,setTweetsState,TweetsState,'/api/Tweets/TweetGet',settotalDocuments,totalDocuments) 
    }
    checkingToken(getDetails,setLoggedIn)           // checking if  user is logged in
    const interval = setInterval(checkingToken, 60 * 60 * 1000); // 1 hour interval

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);



  useEffect(() => {
    setTweet({
      ...Tweets,
      ["User_id"] : UserDetails.UserId,
      ["Image"]:['null']
    })
  }, [UserDetails.UserId]);



  


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
  const [client_side_tweet, setclient_side_tweet] = useState(null);
  const PostTweet = async () => {
    setloadingPost(true)
    const response = await Server_call("/api/Tweets/TweetPost",Tweet,"POST");
    const response_back = await response.json()
    if(response.status === 200){
      setloadingPost(false)
      setclient_side_tweet({
        image:Tweet.Image,
        postedBy : UserDetails.UserTag,
        UserImage : UserDetails.Image,
        Text:Tweet.Text,
        User_id:UserDetails.UserId,      
        LikedBy: [],
        imageAmount : Tweet.Image.length,
        Likes:0,
        Comments:0
      })
      setTweet({
        Image:"",
        Text:"",
        User_id:""
      })
      if(response_back.message){
        setclientSide(response_back.message)
        setclientSide(true)
      }
    }
  };


    useEffect(() => {
      if(DocumentLeft<5 && DocumentLeft>0 && DocumentLeft!=null){
        setlimit(DocumentLeft)
      }
      if(DocumentLeft<=0  && DocumentLeft!=null){
        sethasMore(false)
      }
      if(DocumentLeft>0 && fetching && DocumentLeft!=null)
      {
        GetTweets(limit,skip,setskip,setfetching,setDocumentLeft,setTweetsState,TweetsState,'/api/Tweets/TweetGet',settotalDocuments,totalDocuments)
      }
    }, [DocumentLeft,TweetsState]);

    return (
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
                value={Tweet.Text}
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
               {!loadingPost  ? <div className="pt-4"><Send sx={{ color: "white" }} /> Post</div> : <div className="pr-4"><Spinner/></div>}
            </button>

          </div>
        </div>:null}
        {clientSide && client_side_tweet.Text ? <Tweets authorImage={client_side_tweet.UserImage} author={client_side_tweet.postedBy} Text={client_side_tweet.Text} LikedBy={client_side_tweet.LikedBy} unique={client_side_tweet._id} Image={client_side_tweet.image} link={'/tweet/'} ImageAmount={client_side_tweet.imageAmount} User_using={UserDetails.UserId} Likes={client_side_tweet.Likes} query={'t'} Comments={client_side_tweet.Comments}  /> : null}
        { TweetsState.length>0 ?
          TweetsState.map((e,index)=>
            <Tweets authorImage={e.UserImage} author={e.postedBy} Text={e.Text} LikedBy={e.LikedBy} unique={e._id} Image={e.image} link={'/tweet/'} ImageAmount={e.imageAmount} User_using={UserDetails.UserId} Likes={e.Likes} query={'t'} Comments={e.Comments} />
          )
          : null
        }
       {(DocumentLeft<=0 && DocumentLeft) || DocumentLeft === null ? <div className="text-white">no more tweets :(</div> : <div className=" flex items-center justify-center"><Spinner/></div>}
      </div>
    );
}

export default MainPageTweets;
