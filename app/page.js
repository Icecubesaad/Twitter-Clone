"use client";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import MainPageTweets from "@/components/MainPageTweets";
export default function Home() {
  return (
    <div className="flex flex-row">
      <LeftSidebar />
      <MainPageTweets/>
      <RightSidebar />
    </div>
  );
}
