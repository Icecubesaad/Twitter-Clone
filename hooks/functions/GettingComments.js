import Get_server_call from "../GetRequest";
// getting tweets from Database
// /api/Tweets/TweetGet
const GetComments = async (
  limit,
  skip,
  setskip,
  setfetching,
  settotalcomment,
  setTweetsState,
  TweetsState,
  path,
  id
) => {
  const response = await Get_server_call(
    `${path}?limit=${limit}&skip=${skip}&id=${id}`
  );
  const response_back = await response.json();
  if (response_back.message.data) {
    setskip((e) => e + 3);
    settotalcomment((e)=>e-3);
    setTweetsState([...TweetsState, ...response_back.message.data]);
    setfetching(true);
  }
  
  return response_back;
};
module.exports = GetComments;
