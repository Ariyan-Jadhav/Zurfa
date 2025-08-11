import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import toast from "react-hot-toast";

function Layout() {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user, isSignedIn, isLoaded } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    const t1 = gsap.timeline();
    if (sidebarOpen) {
      t1.to(".sidebar", {
        height: "54px", // Collapsed height
        ease: "power2.inOut",
        duration: 1,
      });
    } else {
      t1.to(".sidebar", {
        height: "185px", // Expanded height
        ease: "power2.inOut",
        duration: 1,
      });
    }
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/");
      toast("Sign-in Required!");
    }
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div>
      <div className="bg-gray-800 d-font">
        <div
          className="sidebar overflow-hidden text-white"
          style={{ height: "54px" }}
        >
          <div className=" flex justify-between h-[55px] w-screen items-center">
            <div className="flex items-center ml-2">
              <button onClick={toggleSidebar} className="flex items-center">
                <img className="object-center h-[45px]" src="/logo.png" />
                {!sidebarOpen ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" fill="none" />
                    <path
                      d="M5.00015 9H19.0002L12.7072 15.293C12.5196 15.4805 12.2653 15.5858 12.0002 15.5858C11.735 15.5858 11.4807 15.4805 11.2932 15.293L5.00015 9Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="24"
                      height="24"
                      transform="matrix(-1 0 0 -1 24 24)"
                      fill="none"
                    />
                    <path
                      d="M18.9998 15L4.99985 15L11.2928 8.707C11.4804 8.51953 11.7347 8.41421 11.9998 8.41421C12.265 8.41421 12.5193 8.51953 12.7068 8.707L18.9998 15Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div>
              {user ? (
                <div className="mr-3 sm:mr-7 flex text-sm gap-3 items-center font-mono font-bold">
                  <h2>{`Welcome ${user.firstName}`}</h2>
                  <UserButton />
                </div>
              ) : (
                <div>
                  <button
                    className="px-2 py-1 rounded-2xl mr-3 sm:mr-9 border-2 hover:border-white cursor-pointer"
                    onClick={openSignIn}
                  >
                    Sign-In
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-around text-sm">
            <div className="flex flex-col gap-2.5 ">
              <NavLink
                className={
                  "rounded-md px-3 py-0.5 font-bold  text-black   bg-gradient-to-br from-[rgb(250,218,122)] via-yellow-300 to-orange-300 hover:from-orange-400 hover:via-yellow-400 hover:to-amber-500 focus:bg-[#F0A04B] transition-colors duration-500 ease-in-out "
                }
                to="/ai"
              >
                Dashboard
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `block rounded-md px-3  transition-colors duration-200 ${
                    isActive
                      ? "text-purple-600 outline-none bg-blue-100"
                      : "text-white"
                  } ease-in-out hover:bg-gray-100 hover:text-gray-900`
                }
                to="/ai/generate-images"
              >
                Pixel Flex
              </NavLink>
              <NavLink
                to="/ai/remove-background"
                className={({ isActive }) =>
                  `block rounded-md px-3  transition-colors duration-200 ${
                    isActive
                      ? "text-purple-600 outline-none bg-blue-100"
                      : "text-white"
                  } ease-in-out hover:bg-gray-100 hover:text-gray-900`
                }
              >
                Pixel Purify
              </NavLink>
              <NavLink
                to="/ai/remove-object"
                className={({ isActive }) =>
                  `block rounded-md px-3  transition-colors duration-200 ${
                    isActive
                      ? "text-purple-600 outline-none bg-blue-100"
                      : "text-white"
                  } ease-in-out hover:bg-gray-100 hover:text-gray-900`
                }
              >
                RePexel
              </NavLink>
            </div>
            <div className="flex flex-col gap-2.5 mt-2">
              <NavLink
                className={({ isActive }) =>
                  `block rounded-md px-3  transition-colors duration-200 ${
                    isActive
                      ? "text-purple-600 outline-none bg-blue-100"
                      : "text-white"
                  } ease-in-out hover:bg-gray-100 hover:text-gray-900`
                }
                to="/ai/code"
              >
                Loop Daddy
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `block rounded-md px-3  transition-colors duration-200 ${
                    isActive
                      ? "text-purple-600 outline-none bg-blue-100"
                      : "text-white"
                  } ease-in-out hover:bg-gray-100 hover:text-gray-900`
                }
                to="/ai/write-article"
              >
                Type Lord
              </NavLink>
              <NavLink
                to="/ai/review-resume"
                className={({ isActive }) =>
                  `block rounded-md px-3  transition-colors duration-200 ${
                    isActive
                      ? "text-purple-600 outline-none bg-blue-100"
                      : "text-white"
                  } ease-in-out hover:bg-gray-100 hover:text-gray-900`
                }
              >
                CV Doctor
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `block rounded-md px-3  transition-colors duration-200 ${
                    isActive
                      ? "text-purple-600 outline-none bg-blue-100"
                      : "text-white"
                  } ease-in-out hover:bg-gray-100 hover:text-gray-900`
                }
                to="/ai/blog-titles"
              >
                Head Liner
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
<div className="min-h-screen w-full relative">
  {/* Ocean Abyss Background with Top Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background:
        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
    }}
  />

  {/* Your Content/Components */}
</div>;
