import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const categoryList = ["background", "object"];
  const { getToken } = useAuth();
  const [input, setInput] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categoryList[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (endpoint) => {
    if (!input) {
      toast.error("File not found");
      return;
    }

    const formData = new FormData();
    formData.append("image", input);

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/ai/${endpoint}`, formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) setContent(data.content);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(154,208,194)] flex flex-col items-center p-4 d-font">
      {/* Main Grid: controls + preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Controls Section */}
        <div className="flex flex-col items-center bg-[rgb(255,255,255,0.2)] rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Image Processor</h2>

          {/* Category Buttons */}
          <div className="flex gap-4 mb-6 text-white text-sm">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setContent("");
                }}
                className={`bg-[rgb(58,109,140)] hover:bg-[rgb(58,109,140,0.8)] px-3 rounded-full border-2 focus:outline-none transition-all ${
                  category === cat
                    ? "border-black text-black"
                    : "border-[#99b9ff]"
                }`}
              >
                {cat === "background" ? "Background" : "Object"}
              </button>
            ))}
          </div>

          {/* File Upload & Submit */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(
                category === "background"
                  ? "remove-image-background"
                  : "remove-image-object"
              );
            }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <label htmlFor="file-upload">
              <div className="cursor-pointer h-[90px] sm:h-[120px] w-[200px] border-dotted border-2 border-blue-600 rounded-md flex flex-col justify-center items-center text-blue-700 hover:border-blue-400 hover:bg-[rgb(0,0,0,0.05)] transition-all">
                <h3 className="font-medium">Click to Upload</h3>
                {input && (
                  <p className="mt-2 text-sm pl-2 font-light text-green-900">
                    {input.name}
                  </p>
                )}
              </div>
            </label>
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={(e) => setInput(e.target.files[0])}
              className="hidden"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl border-2 border-dashed border-black bg-white px-6 py-2 font-semibold uppercase text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_black] transition-all duration-300 active:translate-x-0 active:translate-y-0"
            >
              {loading ? "Processing..." : "Remove"}
            </button>
          </form>

          {/* Guidelines (hidden on small) */}
          <div className="hidden sm:block mt-6 text-sm text-center text-gray-600">
            📷 Upload a high-quality image with clear subject.
            <br />
            🧠 Select mode before uploading.
            <br />
            🎯 Supported: JPG, PNG, WebP (max 5MB).
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex justify-center items-center bg-[#ECF4D6] rounded-2xl p-6 shadow-lg">
          {content ? (
            <img
              src={encodeURI(content)}
              alt="Processed"
              className="object-contain max-h-[400px]"
            />
          ) : (
            <img
              src="/bgc.png"
              alt="Placeholder"
              className="object-center h-[300px]"
            />
          )}
        </div>
      </div>

      {/* Mobile Guidelines */}
      <div className="sm:hidden mt-6 text-xs text-center text-gray-600 w-full max-w-xs">
        📷 High-quality image, clear subject. 🧠 Choose mode. 🎯 JPG/PNG/WebP
        (≤5MB).
      </div>
    </div>
  );
};

export default RemoveBackground;
