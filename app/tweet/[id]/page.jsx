"use client";
import React, { useEffect, useState } from "react";
import MainPageTweets from "@/components/MainPageTweets";
import AppContext from "@/app/context/AppContext";
import { useContext } from "react";
import Tweets from "@/components/cards/Tweets";
import { usePathname } from "next/navigation";
import Server_call from "@/hooks/PostRequest";
import { Skeleton } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BrushIcon from "@mui/icons-material/Brush";
import FavoriteIcon from "@mui/icons-material/Favorite";
import like_tweet from "@/hooks/ActionCaller";
import { ThumbUp, ThumbsUpDown } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Error from "next/error";
import Spinner from "@/components/Loading/Spinner";
import Get_server_call from "@/hooks/GetRequest";
export default function Page() {
  const searchparams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [liked, setliked] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const context = useContext(AppContext);
  const { UserDetails, setSingleTweet, SingleTweet, setcomments, comments } =
    context;
  const [TweetLikes, setTweetLikes] = useState(SingleTweet.Likes);
  const [commentsN, setcommentsN] = useState(SingleTweet.Comments);
  const id = path.split("/")[2];
  const [found, setfound] = useState(true);
  const [errorCode, seterrorCode] = useState("");
  const [fetching, setfetching] = useState(true);
  const [DocumentLeft, setDocumentLeft] = useState(null);
  const [limit, setlimit] = useState(3);
  const [skip, setskip] = useState(0);
  const [fetchPath, setfetchPath] = useState(null);
  useEffect(() => {
    setcommentsN(SingleTweet.Comments)
    setTweetLikes(SingleTweet.Likes)
  }, [SingleTweet]);
  useEffect(() => {
    console.log(comments);
  }, [comments]);
  useEffect(() => {
    const query = searchparams.get("t");
    if (SingleTweet && SingleTweet._id === id) {
      return;
    } else {
      if (query === "c") {
        setcomments([]);
        setSingleTweet({});
        setfetchPath("/api/Tweets/filteredTweet?t=c");
        fetchTweet();
      }
      if (query === "t") {
        setcomments([]);
        setSingleTweet({});
        setfetchPath("/api/Tweets/filteredTweet");
      }
    }
  }, []);
  useEffect(() => {
    if (fetchPath && typeof fetchPath === "string") {
      fetchTweet();
    }
  }, [fetchPath]);
  const fetchTweet = async () => {
    if (fetchPath) {
      const response = await Server_call(fetchPath, id, "POST");
      if (response.status === 200 || response) {
        GetComments(limit, skip);
        const data = await response.json();
        console.log(data.message);
        setSingleTweet(data.message);
        setfound(true);
        setfetching(false);
        setDocumentLeft(data.message.Comments);
      } else if (response.status === 404) {
        setfound(false);
        seterrorCode(404);
      } else if (response.status === 400) {
        setfound(false);
        seterrorCode(400);
      }
    }
  };
  const like = async () => {
    setTweetLikes((e) => e + 1);
    const response = await like_tweet(
      unique,
      "like",
      UserId,
      author,
      "api/Tweets/TweetActions/Like"
    );
    if (response && response.status === 200) {
      const response2 = await like_tweet(
        unique,
        "like",
        UserId,
        author,
        "api/Tweets/TweetActions/Notifications/POST"
      );
    }
  };
  const dislike = () => {
    like_tweet(unique, "dislike", UserId);
    setTweetLikes((e) => e - 1);
  };
  const getUserId = () => {
    setUserId(UserDetails.UserId);
  };
  const [ImageStyle, setImageStyle] = useState({
    image: { height: "100%", width: "100%" },
  });
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
    if (SingleTweet.imageAmount === 1) {
      setImageGrid({
        main: {
          display: "flex",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
        },
        Left: {
          display: "flex",
          width: "100%",
          height: "250px",
          justifyContent: "center",
          alignItems: "center",
        },
      });
    }
    if (SingleTweet.imageAmount === 2) {
      setImageGrid({
        main: {
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          width: "80%",
        },
        Left: {
          display: "flex",
          width: "100%",
          height: "250px",
        },
        Right: {
          display: "flex",
          width: "100%",
          height: "250px",
        },
      });
    }
    if (SingleTweet.imageAmount === 3) {
      setImageGrid({
        main: {
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          width: "80%",
          columnGap: "20px",
        },
        Right: {
          display: "grid",
          gridTemplateRows: "repeat(2,1fr)",
          width: "100%",
          height: "200px",
        },
      });
    }
    if (SingleTweet.imageAmount === 4) {
      setImageGrid({
        main: {
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          width: "80%",
        },
        Left: {
          display: "grid",
          gridTemplateRows: "repeat(2,1fr)",
          width: "100%",
          height: "250px",
        },
        Right: {
          display: "grid",
          gridTemplateRows: "repeat(2,1fr)",
          width: "100%",
          height: "250px",
        },
      });
    }
  }, []);

  // getting commets
  const FetchNewData = async () => {
    console.log(
      "getting new document of limit : ",
      limit,
      " documents left are : ",
      DocumentLeft
    );
    console.log("from fetched data : ", comments);
    const response = await Get_server_call(
      `/api/Tweets/TweetActions/comments/GET?limit=${limit}&skip=${skip}&id=${id}`
    );
    const response_back = await response.json();
    if (response_back.message.data) {
      setDocumentLeft((e) => e - skip);
      setskip((e) => e + 3);
      console.log("Document Left : ", response_back.message.DocumentLeft);
      console.log(typeof response_back.message.data); // object
      console.log("raw : ", response_back.message.data);
      setcomments([...comments, ...response_back.message.data]);
      setfetching(true);
    }
  };

  // getting tweets from Database

  const GetComments = async (limit, skip) => {
    console.log("inside a function : ", comments);
    const response = await Get_server_call(
      `/api/Tweets/TweetActions/comments/GET?limit=${limit}&skip=${skip}&id=${id}`
    );
    const response_back = await response.json();
    if (response_back.message.data) {
      setDocumentLeft((e) => e - skip);
      setskip((e) => e + 3);
      console.log("fetched the initial data");
      console.log(
        "Documents Requested: ",
        limit,
        " Documents Left : ",
        response_back.message.DocumentsLeft
      );
      setcomments([...response_back.message.data]);
      setfetching(true);
    }
    return response_back;
  };

  useEffect(() => {
    console.log("TRIGGEREd");
    console.log(DocumentLeft);
    if (DocumentLeft <= 0 && DocumentLeft != null) {
      console.log("All the data has been fetched");
      sethasMore(false);
    }
    if (DocumentLeft > 0 && fetching && DocumentLeft != null) {
      console.log("FETCHING NEW DATa");
      FetchNewData();
    }
  }, [DocumentLeft]);

  if (!found) {
    return <Error statusCode={errorCode} />;
  }
  return (
    <div className="element-with-scrollbar w-2/4 flex flex-col gap-2 items-center mr-5">
      <div className=" h-auto w-[98%] background_of_sub_component rounded-xl pb-5 mb-3">
        <div className="h-auto w-full ml-3 flex flex-row gap-4 pt-2">
          <div className="w-full flex flex-row items-center gap-2 pb-5">
            <div
              className="w-1/12 bg-amber-100"
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
          <div className=" h-7 w-7 border-1 rounded-full bg-blue-700 flex items-center justify-center"><ThumbUp sx={{ fontSize: 20,color:"white" }}/></div>
          <div className="text-white">{TweetLikes}</div>
        </div>
        <div className="mr-3 pr-3 text-white">
                {commentsN} comments
        </div>
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
            style={{ transition: "all 300ms" }}
            className="w cursor-pointer w-1/3 pl-6 pr-6 flex flex-row justify-center items-center gap-1 text-white h-12 border-1 pt-4 hover:bg-slate-500 background_of_sub_component_contrast pb-4 rounded-lg"
          >
            <ReplyIcon /> reply
          </div>
          {/* <CommentBox open={open} accountName={author} AccountPic={authorImage} TweetText={Text} User={UserDetails.UserTag} TweetId={unique} UserPic={UserDetails.Image} UserId={UserDetails.UserId} handleClose={handleClose} /> */}
        </div>
      </div>
      {comments && comments.length > 0 ? (
        <div className="w-full">
          {comments.map((e, index) => (
            <Tweets
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
          ))}
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
}
