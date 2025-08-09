import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const categoryList = [
    "Realistic",
    "Ghibli",
    "Cartoon",
    "Fantasy",
    "Anime",
    "3D",
    "Cyber",
    "Pixel Art",
  ];
  const { getToken } = useAuth();
  const [input, setInput] = useState("");
  const [category, setCategory] = useState(categoryList[0]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    setLoading(true);
    try {
      const prompt = `generate a ${category} style image of ${input}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) setContent(data.content);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#9AD0C2] flex flex-col items-center p-4 d-font">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Controls Card */}
        <div className="flex flex-col items-center bg-[rgb(255,255,255,0.2)] rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Image Generator</h2>
          <div className="grid grid-cols-4 gap-2 mb-6 w-full">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-2 py-[2px] rounded-full border-2 focus:outline-none transition-all text-[11px] font-bold sm:text-[12px] ${
                  category === cat
                    ? "border-black text-black"
                    : "border-[#99b9ff]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <form
            onSubmit={handleGenerate}
            className="w-full flex flex-col items-center"
          >
            <textarea
              value={input}
              placeholder="Me securing 9.2 cgpa.."
              onChange={(e) => setInput(e.target.value)}
              className="px-4 py-2 w-full h-32 rounded-xl border-2 border-gray-500 font-bold focus:outline-none focus:ring-2 focus:ring-[#18375d] hover:border-[#18375d] transition-all duration-300 shadow-sm hover:shadow-md placeholder-gray-600 resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-[140px] mt-5 rounded-2xl border-2 flex justify-center border-dashed border-black bg-white px-6 py-2 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0"
            >
              {loading ? "Processing..." : "Generate"}
            </button>
          </form>
        </div>
        {/* Preview Section */}
        <div className="flex justify-center items-center bg-[#ECF4D6] rounded-2xl p-6 shadow-lg">
          {loading ? (
            <div className="text-lg font-bold">Cooking...</div>
          ) : content ? (
            <img
              src={encodeURI(content)}
              alt="Generated"
              className="object-contain max-h-[400px] rounded-2xl"
            />
          ) : (
            <img
              src="/pixel.png"
              alt="Placeholder"
              className="object-contain max-h-[400px] rounded-2xl"
            />
          )}
        </div>
      </div>
      <div className="mt-6 text-sm text-center text-gray-600 w-full max-w-xs">
        💡 Tip: Drag & drop your generated image to save it into your local
        storage! 🎨
      </div>
    </div>
  );
};

export default GenerateImages;
