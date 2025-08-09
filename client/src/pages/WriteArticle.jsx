import React from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function WriteArticle() {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1000, text: "Medium (800-1200 words)" },
    { length: 1500, text: "Long (1200+ words)" },
  ];

  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [selectedLength, setSelectedLength] = useState(articleLength[0].length);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength} words`;
      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength },
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
          <img src="/article.png" />
        </div>
        <div className="flex justify-around text-[9px] gap-2 font-bold text-white">
          <button
            onClick={() => setSelectedLength(articleLength[0].length)}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            selectedLength === articleLength[0].length
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            Short (500+ words)
          </button>
          <button
            onClick={() => setSelectedLength(articleLength[1].length)}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            selectedLength === articleLength[1].length
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            Medium (800+ words)
          </button>
          <button
            onClick={() => setSelectedLength(articleLength[2].length)}
            className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none lg:text-[12px] transition-all
          ${
            selectedLength === articleLength[2].length
              ? "border-black text-black"
              : "border-[#99b9ff]"
          }`}
          >
            Long (1200+ words)
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
}

export default WriteArticle;
