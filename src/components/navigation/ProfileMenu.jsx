import React, { useState } from "react";
import { BiSolidUserAccount } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  const { sidebar, setSidebar, isDark } = useStateContext();

  const handleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  return (
    <div className="flex flex-col">
      <Link
        className=" rounded-full flex gap-2 items-center"
        onClick={() => handleProfileMenu()}
        to="#"
      >
        <div>
          <p className="text-sm">The Real Deal</p>
          <p className="text-xs font-light text-slate-500">Web Developer</p>
        </div>
        <img
          src="assets/img/profile.jpg"
          className="h-10 w-10 rounded-full"
          alt=""
        />

        {profileMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </Link>

      {profileMenu ? (
        <div
          className={`fixed mt-[60px] border  p-5 mr-[30px] ${
            isDark ? "bg-[#2a2b32] " : "bg-white"
          }`}
        >
          <Link
            className={`flex items-center gap-2  mb-2 ${
              isDark ? "text-slate-200" : "text-slate-600"
            }`}
            to="/profile"
          >
            <BiSolidUserAccount />
            <span className="text-sm">My Profile</span>
          </Link>

          <Link
            className={`flex items-center gap-2  mb-2 ${
              isDark ? "text-slate-200" : "text-slate-600"
            }`}
          >
            <AiFillSetting />
            <span className="text-sm">Setting</span>
          </Link>

          <hr className="mt-3 " />
          <Link
            className={`flex items-center gap-2  mt-2 ${
              isDark ? "text-slate-200" : "text-slate-600"
            }`}
          >
            <CiLogout />
            <span className="text-sm">Logout</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileMenu;
