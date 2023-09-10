"use client";
import React, { useEffect, useState } from "react";
import AppContext from "@/app/context/AppContext";
import { useContext } from "react";
import Tweets from "@/components/cards/Tweets";
import { usePathname, useRouter } from "next/navigation";
import Server_call from "@/hooks/PostRequest";
import { Skeleton } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import like_tweet from "@/hooks/ActionCaller";
import { ThumbUp } from "@mui/icons-material";
import { GetComments, GetTweets, followers, getting_image_grid_styles, updatingUserDetails } from "@/hooks";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/Loading/Spinner";
import CommentBox from "@/components/CommentBox";
export default function Page() {
  const searchparams = useSearchParams();
  const path = usePathname();
  const [liked, setliked] = useState(false);
  const context = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const { UserDetails, setUserDetails ,setSingleTweet, SingleTweet, setcomments, comments } =
    context;
  const [TweetLikes, setTweetLikes] = useState(SingleTweet.Likes);
  const [commentsN, setcommentsN] = useState(SingleTweet.Comments);
  const id = path.split("/")[2];
  const [found, setfound] = useState(true);
  const [errorCode, seterrorCode] = useState("");
  const [fetching, setfetching] = useState(true);
  const [DocumentLeft, setDocumentLeft] = useState(null);
  const [TotalComment, setTotalComment] = useState(null);

  const [limit, setlimit] = useState(3);
  const [skip, setskip] = useState(0);
  const [fetchPath, setfetchPath] = useState(null);
  const [followed, setfollowed] = useState(false);
  const [noComments, setnoComments] = useState(false);
  const [server_side_comment, setserver_side_comment] = useState([]);
  const [client_side_comment, setclient_side_comment] = useState([]);
  const [clientSide, setclientSide] = useState(false);
  const [likePath, setlikePath] = useState(null);
  useEffect(() => {
    if (
      SingleTweet &&
      UserDetails.FollowingList &&
      UserDetails.FollowingList.length > 0
    ) {
      UserDetails.FollowingList.map((e) => {
        if (e.name === SingleTweet.postedBy) {
          setfollowed(true);
        } else {
          setfollowed(false);
        }
      });
    }
    if (
      SingleTweet.LikedBy &&
      SingleTweet.LikedBy.includes(UserDetails.UserId)
    ) {
      setliked(true);
    }

  }, [SingleTweet]);

  useEffect(() => {
    setTotalComment(SingleTweet.Comments);
    setTweetLikes(SingleTweet.Likes);
    setcommentsN(SingleTweet.Comments)
    if(SingleTweet.Comments===0){
      setnoComments(true)
    }
  }, [SingleTweet]);


  useEffect(() => {
    const query = searchparams.get("t");
    if (SingleTweet && SingleTweet._id === id) {
      return;
    } else {
      if (query === "c") {
        setcomments([]);
        setSingleTweet({});
        setfetchPath("/api/Tweets/filteredTweet?t=c");
        setlikePath('/api/Tweets/TweetActions/Like?t=c')
        fetchTweet();
      }
      if (query === "t") {
        setcomments([]);
        setSingleTweet({});
        setlikePath('/api/Tweets/TweetActions/Like?t=t');
        setfetchPath("/api/Tweets/filteredTweet");
      }
    }
  }, [path]);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    if (fetchPath && typeof fetchPath === "string") {
      fetchTweet();
    }
  }, [fetchPath]);
  const fetchTweet = async () => {
    if (fetchPath) {
      const response = await Server_call(fetchPath, id, "POST");
      if (response.status === 200 || response) {
        GetComments(limit,skip,setskip,setfetching,setTotalComment,setcomments,comments,'/api/Tweets/TweetActions/comments/GET',id)
        const data = await response.json();
        setSingleTweet(data.message);
        setfound(true);
        setfetching(false);
      } 
      if (response && response.status === 404) {
        setfound(false);
        seterrorCode(404);
      } 
      if (response && response.status === 400) {
        setfound(false);
        seterrorCode(400);
      }
      if(response.status === 401){
        setnoComments(true)
      }
    }
  };

  const like = async (id) => {
    setTweetLikes((e) => e + 1);
    const response = await like_tweet(
      SingleTweet._id,
      "like",
      UserDetails.UserId,
      SingleTweet.postedBy,
      likePath
    );
    if (response && response.status === 200) {
      const response2 = await like_tweet(
        SingleTweet._id,
        "like",
        UserDetails.UserId,
        SingleTweet.postedBy,
        "/api/Tweets/TweetActions/Notifications/POST"
      );
    }
  };


  const dislike = () => {
    like_tweet(SingleTweet._id, "dislike", UserDetails.UserId,SingleTweet.postedBy,likePath);
    setTweetLikes((e) => e - 1);
  };


  const [ImageGrid, setImageGrid] = useState({
    Left: {
      display: "grid",
      gridTemplateColumns: "",
      gridTemplateRows: "",
    },
    Right: {
      display: "grid",
      gridTemplateColumns: "",
      gridTemplateRows: "",
    },
    main: {
      display: "grid",
      gridTemplateColumns: "",
      gridTemplateRows: "",
    },
  });
  useEffect(() => {
    getting_image_grid_styles(SingleTweet.imageAmount,setImageGrid)
  }, []);

  useEffect(() => {
    if (TotalComment > 0 && fetching && TotalComment !== null&& TotalComment!==undefined && comments.length>0) {
     
      GetComments(limit,skip,setskip,setfetching,setTotalComment,setcomments,comments,'/api/Tweets/TweetActions/comments/GET',id)
    }
    if(TotalComment < 0 && fetching && TotalComment !== null&& TotalComment!==undefined && comments.length>0){
      setfetching(false)
    }
  }, [TotalComment]);

  const follow = async () => {
    setfollowed(true);
    updatingUserDetails(setUserDetails,UserDetails,'Following','i',UserDetails.Following)
    followers(
      UserDetails.UserId,
      UserDetails.UserTag,
      UserDetails.Image,
      SingleTweet.postedBy,
      "i"
    );
  };
  const unfollow = async () => {
    setfollowed(false);
    updatingUserDetails(setUserDetails,UserDetails,'Following','d',UserDetails.Following)
    followers(
      UserDetails.UserId,
      UserDetails.UserTag,
      UserDetails.Image,
      SingleTweet.postedBy,
      "d"
    );
    
  };
const router = useRouter()
  if (!found) {
    router.push('/error')
  }

  return (
    <div className="element-with-scrollbar w-2/4 flex flex-col gap-2 items-center mr-5">
      <div className=" h-auto w-[98%] background_of_sub_component rounded-xl pb-5 mb-3">
        <div className="h-auto w-full ml-3 flex flex-row gap-4 pt-2">
          <div className="w-full flex  flex-row justify-between">
            <div className="w-full flex flex-row items-center gap-2 pb-5">
              <div
                className=" w-1/6 bg-amber-100"
                style={{ borderRadius: "40px", height: "53px" }}
              >
                {SingleTweet.UserImage ? (
                  <img
                    src={SingleTweet.UserImage}
                    className=" rounded-full border-1 w-full h-full border-black"
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    className=" rounded-full border-1  border-black"
                    variant="circular"
                    height={53}
                    width={60}
                  />
                )}
              </div>
              <div>
                {SingleTweet.postedBy ? (
                  <p className="text-white w-[100%] text-justify pr-2">
                    {SingleTweet.postedBy}
                  </p>
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    className="w-full h-60"
                    height={40}
                    width={150}
                  />
                )}
              </div>
            </div>
            <div
              className="w-full flex pr-6 items-center"
              style={{ justifyContent: "right" }}
            >
              {!followed ? (
                <button
                  onClick={follow}
                  className="background_of_sub_component_contrast text-white w-auto h-10 pr-4 pl-4 border-1 rounded-xl hover:bg-white hover:text-black"
                >
                  Follow
                </button>
              ) : (
                <button
                  onClick={unfollow}
                  className="background_of_sub_component_contrast text-white w-auto h-10 pr-4 pl-4 border-1 rounded-xl hover:bg-white hover:text-black"
                >
                  Followed
                </button>
              )}
            </div>
          </div>
        </div>
        {SingleTweet.Text ? (
          <p className="w-full text-white pl-6  text-justify pr-2">
            {SingleTweet.Text}
          </p>
        ) : (
          <div className="pl-3">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={500}
              height={70}
            />
          </div>
        )}
        <div>
          {SingleTweet &&
          SingleTweet.image &&
          SingleTweet.image[0] !== "null" &&
          SingleTweet.imageAmount > 0 ? (
            <div
              className=" flex item-center justify-center pb-3 ml-10"
              style={ImageGrid.main}
            >
              <div style={ImageGrid.Left}>
                {SingleTweet.imageAmount === 1 ||
                SingleTweet.imageAmount === 2 ||
                SingleTweet.imageAmount === 3 ? (
                  <div style={{ height: "auto" }}>
                    {SingleTweet.image[0] ? (
                      <img
                        src={SingleTweet.image[0]}
                        className=" rounded-xl  border-1 border-slate-700"
                        style={{ height: "250px", width: "300px" }}
                      />
                    ) : (
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                ) : null}
                {SingleTweet.imageAmount === 4 ? (
                  <div style={ImageGrid.Left}>
                    {SingleTweet.image[0] ? (
                      <img
                        src={SingleTweet.image[0]}
                        className=" rounded-xl  border-1 border-slate-700"
                        style={{ height: "125px", width: "100%" }}
                      />
                    ) : (
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        className="w-full h-full"
                      />
                    )}
                    {SingleTweet.image[2] ? (
                      <img
                        src={SingleTweet.image[2]}
                        className=" rounded-xl  border-1 border-slate-700"
                        style={{ height: "125px", width: "100%" }}
                      />
                    ) : (
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                ) : null}
              </div>
              {SingleTweet.imageAmount >= 2 ? (
                <div style={{ height: "auto", width: "100%" }}>
                  {SingleTweet.imageAmount === 2 ? (
                    <div style={ImageGrid.Right}>
                      {SingleTweet.image[1] ? (
                        <img
                          src={SingleTweet.image[1]}
                          className="rounded-xl  border-1 border-slate-700"
                          style={{ height: "250px", width: "300px" }}
                        />
                      ) : (
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  ) : null}
                  {SingleTweet.imageAmount === 3 ? (
                    <div style={ImageGrid.Right}>
                      {SingleTweet.image[1] ? (
                        <img
                          src={SingleTweet.image[1]}
                          className="rounded-xl  border-1 border-slate-700"
                          style={{ height: "125px", width: "100%" }}
                        />
                      ) : (
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="w-full h-full"
                        />
                      )}
                      {SingleTweet.image[2] ? (
                        <img
                          src={SingleTweet.image[2]}
                          className="rounded-xl  border-1 border-slate-700"
                          style={{ height: "125px", width: "100%" }}
                        />
                      ) : (
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  ) : null}
                  {SingleTweet.imageAmount === 4 ? (
                    <div style={ImageGrid.Right}>
                      {SingleTweet.image[1] ? (
                        <img
                          src={SingleTweet.image[1]}
                          className=" rounded-xl  border-1 border-slate-700"
                          style={{ height: "125px", width: "100%" }}
                        />
                      ) : (
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="w-full h-full"
                        />
                      )}
                      {SingleTweet ? (
                        <img
                          src={SingleTweet.image[3]}
                          className=" rounded-xl  border-1 border-slate-700"
                          style={{ height: "125px", width: "100%" }}
                        />
                      ) : (
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className=" flex flex-row justify-between w-full m-3">
          <div className=" flex flex-row gap-2">
            <div className=" h-7 w-7 border-1 rounded-full bg-blue-700 flex items-center justify-center">
              <ThumbUp sx={{ fontSize: 20, color: "white" }} />
            </div>
            <div className="text-white">{TweetLikes}</div>
          </div>
          <div className="mr-3 pr-3 text-white">{commentsN} comments</div>
        </div>
        <div className="flex flex-row gap-5 ml-4 mt-4 mr-4">
          {(SingleTweet.LikedBy &&
            SingleTweet.LikedBy.includes(UserDetails.UserId) &&
            liked) ||
          liked ? (
            <div
              style={{ transition: "all 300ms" }}
              className="w cursor-pointer w-1/3 pl-6 pr-6 flex flex-row justify-center items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4 rounded-lg"
              onClick={() => {
                dislike(), setliked(false);
              }}
            >
              <FavoriteIcon sx={{ color: "red" }} /> Liked
            </div>
          ) : (
            <div
              style={{ transition: "all 300ms" }}
              className="w cursor-pointer w-1/3 pl-6 pr-6 flex flex-row justify-center items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4 rounded-lg"
              onClick={() => {
                like(), setliked(true);
              }}
            >
              <FavoriteIcon /> like{" "}
            </div>
          )}
          <div
            style={{ transition: "all 300ms" }}
            className="w cursor-pointer w-1/3 pl-6 pr-6 flex flex-row justify-center items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4 rounded-lg"
          >
            <AutorenewIcon /> retweet
          </div>
          <div
            onClick={handleClickOpen}
            style={{ transition: "all 300ms" }}
            className="w cursor-pointer w-1/3 pl-6 pr-6 flex flex-row justify-center items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4 rounded-lg"
          >
            <ReplyIcon /> reply
          </div>
          <CommentBox
            open={open}
            accountName={SingleTweet.postedBy}
            AccountPic={SingleTweet.UserImage}
            TweetText={SingleTweet.Text}
            User={UserDetails.UserTag}
            TweetId={SingleTweet._id}
            UserPic={UserDetails.Image}
            UserId={UserDetails.UserId}
            handleClose={handleClose}
            setcomment={setclient_side_comment}
            set={setclientSide}
            currentState={client_side_comment}
            setserver_side_comment={setserver_side_comment}
            server_side_comment={server_side_comment}
          />
        </div>
      </div>
      {server_side_comment && clientSide &&
      server_side_comment.length > 0
        ? server_side_comment.map((e) => {
            return (
              <Tweets
                authorImage={e.UserImage}
                author={e.postedBy}
                Text={e.Text}
                LikedBy={e.LikedBy}
                unique={e.id}
                Image={e.image}
                link={"/tweet/"}
                ImageAmount={e.imageAmount}
                User_using={UserDetails.UserId}
                Likes={e.Likes}
                query={"c"}
                Comments={e.Comments}
              />
            );
          })
        : clientSide && client_side_comment && client_side_comment.length > 0
        ? client_side_comment.map((e) => {
            return (
              <Tweets
                authorImage={e.UserImage}
                author={e.postedBy}
                Text={e.Text}
                LikedBy={e.LikedBy}
                unique={e._id}
                Image={e.image}
                link={"/tweet/"}
                ImageAmount={e.imageAmount}
                User_using={UserDetails.UserId}
                Likes={e.Likes}
                query={"c"}
                Comments={e.Comments}
              />
            );
          })
        : null}
      {
  noComments ? null :
  (
    comments && comments.length > 0 ?
      comments.map((e, index) => (
        <Tweets
          key={e._id} // Add a unique key prop for each mapped element
          authorImage={e.UserImage}
          author={e.postedBy}
          Text={e.Text}
          LikedBy={e.LikedBy}
          unique={e._id}
          Image={e.image}
          link={"/tweet/"}
          query={"c"}
          ImageAmount={e.imageAmount}
          User_using={UserDetails.UserId}
          Likes={e.Likes}
          Comments={e.Comments}
        />
      )) :
      null
  )
}
{
  TotalComment>0 || TotalComment===undefined || TotalComment===null?<Spinner/>:<div className="text-white">no comments on this tweet</div>
}
    </div>
  );
}
