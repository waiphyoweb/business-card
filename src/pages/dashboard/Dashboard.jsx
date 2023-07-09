import React from "react";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FaUsers, FaTags } from "react-icons/fa";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Dashboard = () => {
  const [text] = useTypewriter({
    words: ["the Dashboard!", "BMS"],
    loop: {},
  });

  return (
    <div className="">
      <div className="bg-[#2a2b32] h-[300px] w-full mb-3 rounded-2xl">
        <h1 className=" h3 text-2xl text-white pt-[130px]  md:text-6xl text-center font-poppinsBold">
          Welcome to&nbsp;
          <span className="text-blue-500 ">{text}</span> <Cursor />
        </h1>
      </div>

      <div className="grid grid-cols-1 text-white md:grid-cols-2 lg:grid-cols-4 gap-4 font-poppinsRegular">
        <div className="bg-[#2a2b32] p-4 rounded-xl shadow-9xl">
          <p>Total Cards</p>

          <div className="flex  items-center gap-10  ">
            <h2 className="text-6xl">90</h2>
            <BsFillCreditCardFill size={90} />
          </div>
          <p className="text-xs text-slate-300 mt-1">
            This is the total amount of cards all the users created!
          </p>

          <div className="bg-white rounded-lg py-2 mt-4 text-center justify-center gap-2 flex items-center px-2">
            <BsFillCreditCardFill size={30} className="text-[#2a2b32]" />
            <h1 className="text-lg text-[#2a2b32] font-poppinsBold">
              TOTAL CARDS
            </h1>
          </div>
        </div>
        <div className="bg-[#2a2b32] p-4 rounded-xl">
          <p>Total Users</p>

          <div className="flex  items-center gap-10  ">
            <h2 className="text-6xl">50</h2>
            <FaUsers size={90} />
          </div>
          <p className="text-xs text-slate-300 mt-1">
            This is the total amount of people who use this app!
          </p>

          <div className="bg-white rounded-lg py-2 mt-4 text-center justify-center gap-2 flex items-center px-2">
            <FaUsers size={30} className="text-[#2a2b32]" />
            <h1 className="text-lg text-[#2a2b32] font-poppinsBold">
              TOTAL USERS
            </h1>
          </div>
        </div>
        <div className="bg-[#2a2b32] p-4 rounded-xl">
          <p>Total Tags</p>

          <div className="flex  items-center gap-10  ">
            <h2 className="text-6xl">90</h2>
            <FaTags size={90} />
          </div>
          <p className="text-xs text-slate-300 mt-1">
            This is the total amount of Tags all the users created!
          </p>

          <div className="bg-white rounded-lg py-2 mt-4 text-center justify-center gap-2 flex items-center px-2">
            <FaTags size={30} className="text-[#2a2b32]" />
            <h1 className="text-lg text-[#2a2b32] font-poppinsBold">
              TOTAL TAGS
            </h1>
          </div>
        </div>
        <div className="bg-[#2a2b32] p-4 rounded-xl">
          <p>Total Cards</p>

          <div className="flex  items-center gap-10  ">
            <h2 className="text-6xl">90</h2>
            <BsFillCreditCardFill size={90} />
          </div>
          <p className="text-xs text-slate-300 mt-1">
            This is the total amount of cards created by every single account!
          </p>

          <div className="bg-white rounded-lg py-2 mt-4 text-center justify-around flex items-center px-2">
            <BsFillCreditCardFill size={30} className="text-[#2a2b32]" />
            <h1 className="text-xl text-[#2a2b32] font-poppinsBold">
              TOTAL CARDS
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
