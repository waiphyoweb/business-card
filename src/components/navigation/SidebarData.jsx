import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import Cookies from "universal-cookie";

import { useStateContext } from "../../contexts/ContextProvider";

// console.log(adminTest);
// let admin = {};

// if (adminTest) {
//   admin = {
//     title: "Register",
//     path: "/register",
//     icon: <BiIcons.BiRegistered />,
//   };
// } else {
//   admin = {};
// }

export const SidebarData = [
  {
    title: "Dashboard",
    path: "#",
    icon: <BiIcons.BiSolidDashboard />,
    iconClosed: <IoIcons.IoIosArrowDown />,
    iconOpened: <IoIcons.IoIosArrowUp />,

    subNav: [
      {
        title: "Home",
        path: "/dashboard",
      },
    ],
  },
  {
    title: "Profile",
    path: "#",
    icon: <BiIcons.BiSolidUserAccount />,
    iconClosed: <IoIcons.IoIosArrowDown />,
    iconOpened: <IoIcons.IoIosArrowUp />,

    subNav: [
      {
        title: "My Profile",
        path: "/profile",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "All Users",
        path: "/users",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Cards",
    path: "#",
    icon: <BsIcons.BsFillCreditCard2BackFill />,
    iconClosed: <IoIcons.IoIosArrowDown />,
    iconOpened: <IoIcons.IoIosArrowUp />,

    subNav: [
      {
        title: "View Cards",
        path: "/cards",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Create Cards",
        path: "/cardForm",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <IoIcons.IoIosNotificationsOutline />,
  },

  {
    title: "Logout",
    path: "/logout",
    icon: <IoIcons.IoIosNotificationsOutline />,
  },
];
