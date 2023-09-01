"use client";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center flex-col gap-3">
        <h1 className=" text-9xl text-white">404</h1>
        <h3 className=" text-3xl text-white">couldnt find this page</h3>
        <button
          onClick={() => {
            router.push("/");
          }}
          className=" w-40 h-14 background_of_sub_component_contrast rounded-xl text-lg text-white flex items-center justify-center"
        >
          go to homepage
        </button>
      </div>
    </div>
  );
};

export default page;
