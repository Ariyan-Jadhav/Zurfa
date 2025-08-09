import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function ReviewResume() {
  const { getToken } = useAuth();
  const [input, setInput] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input) {
      toast.error("File not found");
      return;
    }

    const formData = new FormData();
    formData.append("resume", input);

    try {
      setLoading(true);
      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row bg-[rgb(250,240,230)] min-h-screen d-font">
      <div className="flex justify-center xl:justify-start items-center flex-col xl:w-[80%] mt-4 ">
        <div className="object-cover w-[70%] xl:w-[60%] xl:ml-7">
          <img src="/resume.png" />
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="w-[90%] flex flex-col xl:gap-14 rounded-2xl py-4 xl:w-[80%] bg-[rgb(255,255,255,0.7)] xl:flex-row gap-4 justify-center items-center"
        >
          <label htmlFor="file-upload">
            <div className=" h-[90px] hover:border-blue-400 font-mono hover:bg-[rgb(0,0,0,0.1)] border-blue-600 flex flex-col gap-1 justify-center items-center w-[150px]  ease-in-out xl:w-[200px] border-dotted border-2 rounded-md text-blue-700">
              <h1>Upload PDF</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="45"
                viewBox="0 0 40 45"
                fill="none"
              >
                <g filter="url(#filter0_d_3_715)">
                  <path
                    d="M21.6667 23.333H15.0001C14.5581 23.333 14.1341 23.5086 13.8216 23.8212C13.509 24.1337 13.3334 24.5576 13.3334 24.9997C13.3334 25.4417 13.509 25.8656 13.8216 26.1782C14.1341 26.4907 14.5581 26.6663 15.0001 26.6663H21.6667C22.1088 26.6663 22.5327 26.4907 22.8453 26.1782C23.1578 25.8656 23.3334 25.4417 23.3334 24.9997C23.3334 24.5576 23.1578 24.1337 22.8453 23.8212C22.5327 23.5086 22.1088 23.333 21.6667 23.333ZM28.3334 6.66634H26.3667C26.0229 5.69376 25.3866 4.85134 24.5452 4.25457C23.7037 3.65781 22.6983 3.33591 21.6667 3.33301H18.3334C17.3018 3.33591 16.2964 3.65781 15.455 4.25457C14.6135 4.85134 13.9773 5.69376 13.6334 6.66634H11.6667C10.3407 6.66634 9.0689 7.19313 8.13121 8.13081C7.19353 9.06849 6.66675 10.3403 6.66675 11.6663V31.6663C6.66675 32.9924 7.19353 34.2642 8.13121 35.2019C9.0689 36.1396 10.3407 36.6663 11.6667 36.6663H28.3334C29.6595 36.6663 30.9313 36.1396 31.8689 35.2019C32.8066 34.2642 33.3334 32.9924 33.3334 31.6663V11.6663C33.3334 10.3403 32.8066 9.06849 31.8689 8.13081C30.9313 7.19313 29.6595 6.66634 28.3334 6.66634V6.66634ZM16.6667 8.33301C16.6667 7.89098 16.8423 7.46706 17.1549 7.1545C17.4675 6.84194 17.8914 6.66634 18.3334 6.66634H21.6667C22.1088 6.66634 22.5327 6.84194 22.8453 7.1545C23.1578 7.46706 23.3334 7.89098 23.3334 8.33301V9.99967H16.6667V8.33301ZM30.0001 31.6663C30.0001 32.1084 29.8245 32.5323 29.5119 32.8449C29.1994 33.1574 28.7754 33.333 28.3334 33.333H11.6667C11.2247 33.333 10.8008 33.1574 10.4882 32.8449C10.1757 32.5323 10.0001 32.1084 10.0001 31.6663V11.6663C10.0001 11.2243 10.1757 10.8004 10.4882 10.4878C10.8008 10.1753 11.2247 9.99967 11.6667 9.99967H13.3334V11.6663C13.3334 12.1084 13.509 12.5323 13.8216 12.8449C14.1341 13.1574 14.5581 13.333 15.0001 13.333H25.0001C25.4421 13.333 25.866 13.1574 26.1786 12.8449C26.4912 12.5323 26.6667 12.1084 26.6667 11.6663V9.99967H28.3334C28.7754 9.99967 29.1994 10.1753 29.5119 10.4878C29.8245 10.8004 30.0001 11.2243 30.0001 11.6663V31.6663ZM25.0001 16.6663H15.0001C14.5581 16.6663 14.1341 16.8419 13.8216 17.1545C13.509 17.4671 13.3334 17.891 13.3334 18.333C13.3334 18.775 13.509 19.199 13.8216 19.5115C14.1341 19.8241 14.5581 19.9997 15.0001 19.9997H25.0001C25.4421 19.9997 25.866 19.8241 26.1786 19.5115C26.4912 19.199 26.6667 18.775 26.6667 18.333C26.6667 17.891 26.4912 17.4671 26.1786 17.1545C25.866 16.8419 25.4421 16.6663 25.0001 16.6663Z"
                    fill="#333BFF"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_3_715"
                    x="-4"
                    y="0"
                    width="48"
                    height="48"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_3_715"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_3_715"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </label>
          <input
            type="file"
            accept=".pdf"
            id="file-upload"
            onChange={(e) => setInput(e.target.files[0])}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center">
            <button className="w-[130px] mt-3 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
              Submit
            </button>
            <div className="mt-2 text-center text-sm font-light">
              <p>
                File :{" "}
                {input
                  ? input.name.length > 20
                    ? input.name.slice(0, 20) + "..."
                    : input.name
                  : "none"}
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full flex justify-center">
        <div className="xl:w-[70%] overflow-scroll xl:rounded-none text-sm w-[95%] rounded-2xl  xl:mr-9 my-5 p-5 h-[500px] bg-[#9AA6B2] xl:flex xl:justify-center mb-5 font-mono">
          {!loading && content && (
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center w-full h-full">
              <div className="code-loader"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewResume;
