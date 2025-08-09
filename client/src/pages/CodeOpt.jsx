import React from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const CodeOpt = () => {
  const [input, setInput] = useState("");
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write a clean, efficient, and optimized code implementation for the following prompt: "${input}". 
      The code should be simple, well-structured, and follow best practices. Do not include any extra explanations, summaries, or markdown syntax — only the raw code. if the prompt is empty or irrelevent then display // 404: Prompt not found.
// Please insert brain and try again. `;
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
      <div className="flex justify-center lg:justify-start items-center flex-col lg:w-[80%]">
        <div className="object-cover w-[70%] lg:w-[60%] lg:ml-7">
          <img src="/code.png" />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <textarea
            value={input}
            placeholder="Enter your prompt..."
            onChange={(e) => setInput(e.target.value)}
            className="px-4 py-2 w-[80%] h-32 rounded-xl border-2 border-gray-300 font-bold
             focus:outline-none focus:ring-2 focus:ring-purple-500
             hover:border-purple-400
             transition-all duration-300 shadow-lg
             hover:shadow-md placeholder-gray-400
             resize-none"
          />

          <button
            onClick={onSubmitHandler}
            className="w-[130px] mt-3 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="sm:min-w-[55%] flex items-center justify-center">
        <div className="xl:w-[70%] w-[95%] max-w-full overflow-scroll text-white text-sm rounded-2xl lg:rounded-none my-5 p-5 h-[500px] bg-[#000] font-mono box-border break-words whitespace-pre-wrap">
          {!loading && content && (
            <div className="prose max-w-none">
              <Markdown>{content}</Markdown>
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center w-full h-full">
              <div className="code-loader" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeOpt;
