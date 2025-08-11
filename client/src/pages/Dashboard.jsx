import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {
  Protect,
  useAuth,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { NavLink, useNavigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const navigate = useNavigate();

  const { isSignedIn, isLoaded } = useUser();
  const [creations, setCreations] = useState([]);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/ai/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        console.error("Create an account for better exprience");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/");
    } else getDashboardData();
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-[#3E5879] p-6 w-full overflow-x-hidden d-font ">
      <div className="w-full flex justify-center sm:hidden">
        <NavLink
          to="/"
          aria-label="Back to home"
          className={({ isActive }) =>
            `inline-flex mb-4 items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition transform
     focus:outline-none focus:ring-2 focus:ring-indigo-300/60 ${
       isActive
         ? "bg-indigo-600 text-white shadow-md"
         : "bg-white/30 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:shadow-md"
     }`
          }
        >
          {/* subtle left-arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </NavLink>
      </div>
      <div className="flex justify-center">
        <div className="flex w-full text-[12px] justify-around items-center h-[30px] mb-4 bg-[rgb(0,0,0,0.1)] rounded-4xl sm:w-[50%]">
          <NavLink
            className="text-white h-full w-full flex justify-center items-center hover:bg-[rgb(0,0,0,0.5)] focus:bg-[rgb(0,0,0,0.5)] rounded-l-4xl"
            to="/ai/generate-images"
          >
            Pixel Flex
          </NavLink>
          <NavLink
            className="text-white h-full w-full flex justify-center items-center hover:bg-[rgb(0,0,0,0.5)] focus:bg-[rgb(0,0,0,0.5)]"
            to="/ai/code"
          >
            Loop Daddy
          </NavLink>
          <NavLink
            className="text-white h-full w-full flex justify-center items-center hover:bg-[rgb(0,0,0,0.5)] focus:bg-[rgb(0,0,0,0.5)] rounded-r-4xl"
            to="/ai/write-article"
          >
            Type Lord
          </NavLink>
        </div>
      </div>
      <div className=" sm:flex sm:justify-around gap-2">
        <div className="font-mono flex justify-around sm:justify-center sm:gap-9 w-full sm:w-[70%] items-center">
          <div className=" flex shadow-2xl justify-around items-center flex-col h-[145px] w-[135px] rounded-3xl bg-gradient-to-br from-fuchsia-400 via-sky-200 to-teal-700 hover:from-indigo-200 hover:via-cyan-300 hover:to-emerald-400 transition-colors duration-500">
            <div className="flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 42 42"
                fill="none"
              >
                <path
                  d="M33.25 3.5H8.75C7.35761 3.5 6.02226 4.05312 5.03769 5.03769C4.05312 6.02226 3.5 7.35761 3.5 8.75V33.25C3.5 34.6424 4.05312 35.9777 5.03769 36.9623C6.02226 37.9469 7.35761 38.5 8.75 38.5H33.25C33.5378 38.496 33.8248 38.4667 34.1075 38.4125L34.6325 38.29H34.755H34.8425L35.49 38.045L35.7175 37.9225C35.8925 37.8175 36.085 37.73 36.26 37.6075C36.4937 37.4356 36.7158 37.2485 36.925 37.0475L37.0475 36.89C37.2193 36.7159 37.3773 36.5287 37.52 36.33L37.6775 36.1025C37.7997 35.9077 37.9051 35.7028 37.9925 35.49C38.0405 35.406 38.0815 35.3182 38.115 35.2275C38.2025 35.0175 38.255 34.79 38.325 34.5625V34.3C38.4242 33.9581 38.483 33.6056 38.5 33.25V8.75C38.5 7.35761 37.9469 6.02226 36.9623 5.03769C35.9777 4.05312 34.6424 3.5 33.25 3.5ZM8.75 35C8.28587 35 7.84075 34.8156 7.51256 34.4874C7.18438 34.1593 7 33.7141 7 33.25V25.7075L12.7575 19.9325C12.9202 19.7685 13.1137 19.6383 13.327 19.5494C13.5402 19.4606 13.769 19.4149 14 19.4149C14.231 19.4149 14.4598 19.4606 14.673 19.5494C14.8863 19.6383 15.0798 19.7685 15.2425 19.9325L30.2925 35H8.75ZM35 33.25C34.9984 33.4658 34.9568 33.6794 34.8775 33.88C34.8375 33.9653 34.7907 34.0472 34.7375 34.125C34.6907 34.1991 34.638 34.2693 34.58 34.335L25.2175 24.9725L26.7575 23.4325C26.9202 23.2685 27.1137 23.1383 27.327 23.0494C27.5402 22.9606 27.769 22.9149 28 22.9149C28.231 22.9149 28.4598 22.9606 28.673 23.0494C28.8863 23.1383 29.0798 23.2685 29.2425 23.4325V23.4325L35 29.2075V33.25ZM35 24.255L31.71 21C30.7085 20.0497 29.3806 19.52 28 19.52C26.6194 19.52 25.2915 20.0497 24.29 21L22.75 22.54L17.71 17.5C16.7085 16.5497 15.3806 16.02 14 16.02C12.6194 16.02 11.2915 16.5497 10.29 17.5L7 20.755V8.75C7 8.28587 7.18438 7.84075 7.51256 7.51256C7.84075 7.18438 8.28587 7 8.75 7H33.25C33.7141 7 34.1593 7.18438 34.4874 7.51256C34.8156 7.84075 35 8.28587 35 8.75V24.255ZM23.625 10.5C23.1058 10.5 22.5983 10.654 22.1666 10.9424C21.735 11.2308 21.3985 11.6408 21.1998 12.1205C21.0011 12.6001 20.9492 13.1279 21.0504 13.6371C21.1517 14.1463 21.4017 14.614 21.7688 14.9812C22.136 15.3483 22.6037 15.5983 23.1129 15.6996C23.6221 15.8008 24.1499 15.7489 24.6295 15.5502C25.1092 15.3515 25.5192 15.0151 25.8076 14.5834C26.0961 14.1517 26.25 13.6442 26.25 13.125C26.25 12.4288 25.9734 11.7611 25.4812 11.2688C24.9889 10.7766 24.3212 10.5 23.625 10.5Z"
                  fill="black"
                />
              </svg>
              <h1>Creations</h1>
            </div>
            <div>
              <h1 className="font-bold text-xl">{creations.length}</h1>
            </div>
          </div>
          <div className=" flex justify-around shadow-2xl items-center flex-col h-[145px] w-[135px] rounded-3xl  bg-gradient-to-br from-rose-100 via-red-300 to-orange-400 hover:from-orange-200 hover:via-orange-400 hover:to-red-500 transition-colors duration-500">
            <div className="flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
              >
                <path
                  d="M33.25 12.25H28V10.5C28 8.64348 27.2625 6.86301 25.9497 5.55025C24.637 4.2375 22.8565 3.5 21 3.5C19.1435 3.5 17.363 4.2375 16.0503 5.55025C14.7375 6.86301 14 8.64348 14 10.5V12.25H8.75C8.28587 12.25 7.84075 12.4344 7.51256 12.7626C7.18437 13.0908 7 13.5359 7 14V33.25C7 34.6424 7.55312 35.9777 8.53769 36.9623C9.52226 37.9469 10.8576 38.5 12.25 38.5H29.75C31.1424 38.5 32.4777 37.9469 33.4623 36.9623C34.4469 35.9777 35 34.6424 35 33.25V14C35 13.5359 34.8156 13.0908 34.4874 12.7626C34.1592 12.4344 33.7141 12.25 33.25 12.25ZM17.5 10.5C17.5 9.57174 17.8687 8.6815 18.5251 8.02513C19.1815 7.36875 20.0717 7 21 7C21.9283 7 22.8185 7.36875 23.4749 8.02513C24.1313 8.6815 24.5 9.57174 24.5 10.5V12.25H17.5V10.5ZM31.5 33.25C31.5 33.7141 31.3156 34.1592 30.9874 34.4874C30.6592 34.8156 30.2141 35 29.75 35H12.25C11.7859 35 11.3408 34.8156 11.0126 34.4874C10.6844 34.1592 10.5 33.7141 10.5 33.25V15.75H14V17.5C14 17.9641 14.1844 18.4092 14.5126 18.7374C14.8408 19.0656 15.2859 19.25 15.75 19.25C16.2141 19.25 16.6592 19.0656 16.9874 18.7374C17.3156 18.4092 17.5 17.9641 17.5 17.5V15.75H24.5V17.5C24.5 17.9641 24.6844 18.4092 25.0126 18.7374C25.3408 19.0656 25.7859 19.25 26.25 19.25C26.7141 19.25 27.1592 19.0656 27.4874 18.7374C27.8156 18.4092 28 17.9641 28 17.5V15.75H31.5V33.25Z"
                  fill="black"
                />
              </svg>
              <h1 className="">Current Plan</h1>
            </div>
            <Protect
              plan="premium"
              fallback={<span className="font-bold text-xl">Free Plan</span>}
            >
              <span className="font-bold text-2xl">Premium</span>
            </Protect>
          </div>
        </div>
        <div className="[145px] w-full shadow-2xl  bg-gradient-to-br from-[#FFDC7F] via-orange-200 to-pink-300 hover:from-orange-400 hover:via-coral-400 hover:to-red-400 transition-colors duration-500 hidden sm:flex rounded-3xl text-center justify-between items-center">
          <NavLink
            to="/"
            className=" hover:bg-[rgb(0,0,0,0.1)] transition-colors duration-500 h-full w-[27%] rounded-l-3xl flex justify-center items-center"
          >
            <img className="h-[100px] " src="/logo.png" alt="" />
          </NavLink>
          <div className="w-[73%] flex justify-center items-center p-0.5">
            <h1 className="">
              The database has limits, just like your ex's patience. So don't
              spam it like a 5-year-old discovering the refresh button. Save
              some for the rest of us, aight?
            </h1>
          </div>
        </div>
      </div>
      <div className="mb-6 flex justify-center "></div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {creations.length !== 0 ? (
          creations.map((creation, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-300 bg-[#C0C9EE] p-4 shadow-lg transition duration-300 hover:shadow-md"
            >
              <div className="mb-2 text-sm text-gray-500">
                Type:{" "}
                <span className="font-medium text-gray-700">
                  {creation.type}
                </span>
              </div>
              <div className="mb-4 text-xs text-gray-400">
                Created: {new Date(creation.created_at).toLocaleDateString()}
              </div>

              {creation.type === "article" ||
              creation.type === "blog-title" ||
              creation.type === "code" ||
              creation.type === "resume-review" ? (
                <div className="prose max-w-full text-sm text-gray-700">
                  <div className=" prose max-w-full h-48 overflow-y-auto rounded-md  bg-[#A2AADB] p-2 text-sm text-gray-700 ">
                    <Markdown>{creation.content}</Markdown>
                  </div>
                </div>
              ) : (
                <div className="h-48 overflow-hidden rounded-lg bg-gray-200">
                  <img
                    className="h-full w-full object-cover"
                    src={encodeURI(creation.content)}
                    alt="Generated content"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex w-screen justify-center h-[200px] ">
            <video
              src="/load.mp4"
              className="rounded-4xl mr-[46px] sm:w-[280px] object-cover bg-transparent"
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
