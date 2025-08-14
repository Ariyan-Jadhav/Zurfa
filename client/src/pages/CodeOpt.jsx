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
    <div className="flex flex-col lg:flex-row bg-[#FAF0E6] min-h-screen d-font gap-4 p-4">
      {/* Left Panel - Input Section */}
      <div className="flex flex-col lg:w-1/2 xl:w-2/5">
        {/* Image Container */}
        <div className="flex justify-center items-center mb-6">
          <div className="w-full max-w-md lg:max-w-lg">
            <img src="/code.png" className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* Input Section */}
        <div className="flex flex-col items-center space-y-4 px-4">
          <textarea
            value={input}
            placeholder="Enter your prompt..."
            onChange={(e) => setInput(e.target.value)}
            className="px-4 py-2 w-full max-w-lg h-32 rounded-xl border-2 border-gray-300 font-bold
             focus:outline-none focus:ring-2 focus:ring-purple-500
             hover:border-purple-400
             transition-all duration-300 shadow-lg
             hover:shadow-md placeholder-gray-400
             resize-none"
          />

          <button
            onClick={onSubmitHandler}
            className="w-[130px] rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Right Panel - Output Section */}
      <div className="flex-1 lg:w-1/2 xl:w-3/5 flex items-stretch">
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-full h-[500px] lg:h-[600px] xl:h-[700px] text-white text-sm rounded-2xl p-5 bg-[#000] font-mono overflow-scroll break-words whitespace-pre-wrap">
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
    </div>
  );
};

export default CodeOpt;
