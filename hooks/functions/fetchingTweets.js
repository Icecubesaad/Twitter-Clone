import Get_server_call from "../GetRequest";
  // getting tweets from Database
  // /api/Tweets/TweetGet
    const GetTweets = async(limit,skip,setskip,setfetching,setDocumentLeft,setTweetsState,TweetsState,path,setTotalDocuments,totalDocuments)=>{
      const response = await Get_server_call(`${path}?limit=${limit}&skip=${skip}`)
      const response_back = await response.json();
      if(response_back.message.data){

        setskip(e=>e+3)
        setDocumentLeft(response_back.message.DocumentsLeft)
        setTweetsState([...TweetsState,...response_back.message.data])
        setfetching(true)
        // if(totalDocuments!==null){
        //   setTotalDocuments(e=>e-3)
        // }
        // if(totalDocuments === null){
        //   setTotalDocuments(response_back.message.TotalDocuments)
        // }
      }
      return response_back
    }
    // 5 => 5-3 => 2 to left => 2-3 => 2 fetched =>everything ok? 
module.exports = GetTweets