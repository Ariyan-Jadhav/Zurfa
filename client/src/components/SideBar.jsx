import { useClerk, useUser } from "@clerk/clerk-react";
import React from "react";

const SideBar = ({ sideBar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  return (
    <div
      className={`w-60 flex flex-col ${
        sideBar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full"></div>
      <div>
        <img src={user.imageUrl} />
        <h1>{user.fullName}</h1>
      </div>
    </div>
  );
};

export default SideBar;
