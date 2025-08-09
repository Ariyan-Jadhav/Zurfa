import React from "react";
import TestimonialCard from "../components/Card";
import { NavLink } from "react-router-dom";
import {
  useClerk,
  UserButton,
  useUser,
  PricingTable,
} from "@clerk/clerk-react";
const Home = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const users = [
    "coll/ayyan.jpg",
    "coll/utk.jpg",
    "coll/ved.jpg",
    "coll/omj.jpg",
  ];

  return (
    <div className="min-h-screen w-full bg-[#0f172a] relative d-font">
      {/* Blue Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
        }}
      />
      <div className="">
        <div className="bg-[rgb(0,0,0,0.3)] w-screen justify-between items-center fixed flex h-[70px] z-0">
          <div>
            <img src="/logo.png" className="h-[70px] ml-2 sm:ml-3" />
          </div>
          <div>
            {user ? (
              <div className="mr-3 sm:mr-9">
                <UserButton />
              </div>
            ) : (
              <button
                className="bg-white px-2 py-1 rounded-2xl mr-3 sm:mr-9 border-2 hover:border-white"
                onClick={openSignIn}
              >
                Get started
              </button>
            )}
          </div>
        </div>
        <div className="text-white h-[179px] sm:h-[250px] font-bold pt-[100px] text-[22px] sm:text-[50px] text-center ">
          <p className="">Where creativity meets clarity</p>
          <p>- with ZURFA</p>
        </div>
        <div className="text-center text-gray-300 text-sm sm:text-md flex justify-center">
          <p className="sm:w-[55%] w-[90%]">
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>
        </div>

        <div className="h-[100px] flex items-center gap-5 justify-center">
          <NavLink
            to="/ai"
            className="flex justify-center z-50 w-[130px] mt-3 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/docs"
            className="flex justify-center z-50 w-[130px] mt-3 rounded-2xl border-2 border-dashed border-black bg-white px-6 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          >
            Docs
          </NavLink>
        </div>
        <div className="flex items-center gap-2 mt-7 justify-center ">
          {/* Avatars */}
          <div className="flex -space-x-3">
            {users.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`user-${i}`}
                className="w-9 h-9 rounded-full border-2 border-white shadow-md object-cover"
              />
            ))}
          </div>

          {/* Text */}
          <p className="text-gray-300 text-[12px] font-medium">
            Trusted by <span className="font-semibold">10+</span> students
            (including you)
          </p>
        </div>
        <div>
          <div className="text-white text-center mt-[8px] flex flex-col items-center">
            <h1 className="sm:text-[39px] text-[30px]">Loved by Students</h1>
            <p className="text-sm w-[90%]">
              Don't just take our word for it. Here's what the students are
              saying
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center mt-3 justify-center gap-4">
            <TestimonialCard
              content="I used to juggle five tools for visuals, writing, and code—now I just open Zurfa. From banners to bugs to blog posts, it handles it all and makes everything better."
              name="Ayyan Shaikh"
              role="Electronics, 2nd year"
              img="ayyan"
            ></TestimonialCard>
            <TestimonialCard
              content="I came to Zurfa for code generation—clean, optimized, and smart. But then I discovered the image tools, and resume reviews. It’s not just an AI it’s a full-on productivity beast.
"
              name="Ankit Saini"
              role="Electronics, 3rd year"
              img="ankit"
            ></TestimonialCard>
          </div>
          <div className="flex justify-center mt-4">
            <TestimonialCard
              content="Zurfa’s that overachieving friend who codes, designs, writes, and still finds time to roast you. From fixing my spaghetti code to uncropping cursed images and rewriting my resume like a pro—she does it all while I just sit back and vibe.
"
              name="DD. Ompranal"
              role="Electronics, 2rd year"
              img="omp"
            ></TestimonialCard>
          </div>
        </div>
        <div>
          <div className="text-white flex flex-col items-center mt-9 justify-center text-center">
            <h2 className="text-[40px]">Choose your plan</h2>
            <p className="text-amber-300">
              Pay with test card to access the premium subscription for free
            </p>
          </div>
          <div className="max-w-2xl w-[80%] mx-auto scale-90">
            <PricingTable />
          </div>
        </div>
      </div>
      <footer className="bg-black bg-opacity-20 py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Zurfa. Developed by OMJ.
      </footer>
    </div>
  );
};

export default Home;
