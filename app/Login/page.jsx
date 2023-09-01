"use client";
import React from "react";
import { useState, useEffect } from "react";
import ErrorException from "@/components/error/ErrorException";
import { redirect, useRouter } from "next/navigation";
import Server_call from "@/hooks/PostRequest";
import { useCookies } from "react-cookie";
import Spinner from "@/components/Loading/Spinner";
const Login = () => {
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6eyJpZCI6IjY0YzZjMmFlMzRlZmY1NjVhYjA3Y2YyNSJ9LCJpYXQiOjE2OTA3NDc1OTB9.x4_LcqVjQSHJPorTrYkhgQMDR8w5ueSgOD7G9prbXGY
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6eyJpZCI6IjY0YzJjNjY4N2YxMGRjNTM1YTllMjVmYyJ9LCJpYXQiOjE2OTA3NDc2NzB9.9oieXqeiHFIKCZWiLZ6QrBkhyiravmo1H0W8wkY2H6Q
  const [cookie, setCookie] = useCookies(["user"]);
  const [loading, setloading] = useState(false);
  const { push } = useRouter();
  const [error, seterror] = useState("");
  const [Validation, setValidation] = useState(true);
  const [Crededetials, setCrededetials] = useState({
    Email: "",
    Password: "",
  });
  const ChangingCredentials = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCrededetials({
      ...Crededetials,
      [name]: value,
    });
  };
  const post = async () => {
    setloading(true)
    setValidation(true)
    const response = await Server_call("https://twitter-clone-pearl-phi.vercel.app/api/Auth/Login", Crededetials, "POST");
    const response_back = await response.json();

    if (response.status === 400) {
      setValidation(false);
      setloading(false)
      seterror("Wrong Crededentials");
    }
    if (response.status === 200) {
      setloading(false)
      setCookie("user", response_back.message, {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      setCrededetials({
        Email: "",
        Password: "",
      });
      push("/");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setValidation(true);
    }, 10000);
  }, [Validation]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" w-1/3 m-auto background_of_sub_component rounded-xl h-4/5 pt-6">
        <div className="text-white font-bold text-5xl text-center">Sign In</div>
        <div className="w-full flex flex-col justify-center items-center gap-6 mt-6">
          <div className="flex flex-col justify-start w-11/12">
            <div className="text-white text-lg font-semibold">Email</div>
            <input
              value={Crededetials.Email}
              onChange={ChangingCredentials}
              name="Email"
              className=" w-full m-auto bg-slate-600 text-white rounded-md pl-4 outline-none h-14"
            />
          </div>
          <div className="flex flex-col justify-start w-11/12">
            <div className="text-white text-lg font-semibold">Password</div>
            <input
              value={Crededetials.Password}
              name="Password"
              onChange={ChangingCredentials}
              className=" w-full m-auto bg-slate-600 text-white rounded-md pl-4 outline-none h-14"
            />
          </div>
        </div>
        {Validation ? null : <ErrorException message={error} />}
        <div className="w-full flex items-center justify-center mt-8">
          <button
            onClick={post}
            className=" w-40 h-14 background_of_sub_component_contrast rounded-xl text-lg text-white flex items-center justify-center"
          >
            {!loading ? <div>Sign In</div> : <div className=" pt-2 pr-2 w-full h-full flex item-center justify-center"><Spinner/></div>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
