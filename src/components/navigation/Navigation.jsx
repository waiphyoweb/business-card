import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CgMenuGridO } from "react-icons/cg";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  IoIosNotificationsOutline,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";

import Switch from "./Switch";
import ProfileMenu from "./ProfileMenu";

const Navigation = () => {
  const { sidebar, setSidebar, isDark } = useStateContext();

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div
        className={` py-4 flex  justify-between  items-center md:justify-between  px-5 transition-all duration-500 shadow-xl   ${
          isDark ? "bg-[#2a2b32] text-white" : ""
        }`}
      >
        <button onClick={(ev) => showSidebar(ev)} className="">
          <CgMenuGridO size={24} className="lg:hidden" />
        </button>

        <div className="flex items-center gap-4">
          <Link className=" rounded-full p-1 bg-slate-100">
            <IoIosNotificationsOutline size={22} className="text-blue-800" />
          </Link>

          <Switch />

          <ProfileMenu />
        </div>
      </div>
    </>
  );
};

export default Navigation;
