import React from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitle = () => {
  const categoryList = [
    "General",
    "Technology",
    "Business",
    "gen-z",
    "Lifestyle",
    "Education",
    "Travel",
    "Health",
  ];

  const [input, setInput] = useState("");
  const [category, setCategory] = useState(categoryList[0]);
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a list of catchy blog title ideas based on the following details: Prompt: "${input}" Category: "${category}".Try to have less introduction and directly jump to the title names and if the prompt is empty or irrelevant, reply with: "Bro, even ChatGPT would ghost you for this prompt!"`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-[#FAF0E6] min-h-screen d-font">
      <div className="flex justify-center lg:justify-start items-center flex-col lg:w-[80%] mt-4">
        <div className="object-cover w-[70%] lg:w-[60%] lg:ml-7">
          <img src="/title.png" />
        </div>
        <div className=" grid grid-cols-4 text-[11px] text-amber-50 gap-2 font-bold">
          <button
            onClick={() => setCategory(categoryList[0])}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            category === categoryList[0]
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            General
          </button>
          <button
            onClick={() => setCategory(categoryList[1])}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            category === categoryList[1]
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            Technology
          </button>
          <button
            onClick={() => setCategory(categoryList[2])}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            category === categoryList[2]
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            Business
          </button>
          <button
            onClick={() => setCategory(categoryList[3])}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            category === categoryList[3]
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            gen-z
          </button>
          <button
            onClick={() => setCategory(categoryList[4])}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            category === categoryList[4]
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            Lifestyle
          </button>
          <button
            onClick={() => setCategory(categoryList[5])}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            category === categoryList[5]
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            Education
          </button>
          <button
            onClick={() => setCategory(categoryList[6])}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            category === categoryList[6]
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            Travel
          </button>
          <button
            onClick={() => setCategory(categoryList[7])}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            category === categoryList[7]
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            Health
          </button>
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="w-full flex flex-col justify-center items-center"
        >
          <textarea
            value={input}
            placeholder="Enter the title..."
            onChange={(e) => setInput(e.target.value)}
            className="px-4 py-2 w-[80%] h-32 rounded-xl mt-5 border-2 border-gray-300 font-bold
             focus:outline-none focus:ring-2 focus:ring-[#18375d]
             hover:border-[#18375d]
             transition-all duration-300 shadow-sm
             hover:shadow-md placeholder-gray-600
             resize-none"
          />

          <button className="w-[130px] mt-3 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
            Submit
          </button>
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
};

export default BlogTitle;
