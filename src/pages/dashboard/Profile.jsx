import React from "react";
import CardForm from "./CardForm";

const Profile = () => {
  return (
    <div className="flex gap-10 items-start flex-col lg:flex-row justify-center">
      <div className="w-80 bg-[#2a2b32] rounded-xl overflow-hidden pb-5 shadow-5xl">
        <div className="flex relative ">
          <img src="/image/background.jpg" alt="" className=" h-32 w-80 " />
          <span className="absolute left-1/2 transform -translate-x-1/2 top-2/3 p-[2px] bg-slate-400 rounded-full shadow-sm shadow-white">
            <img
              src="/assets/img/profile.jpg"
              alt=""
              className="w-20 h-20 object-cover rounded-full
              "
            />
          </span>
        </div>

        <div className="text-slate-200 mt-14 px-10">
          <div className="">
            <p className="text-center">Kaung Min Khant</p>
            <p className="text-center text-slate-400 text-xs">
              kmkhant1500@gmail.com
            </p>
            <p className="text-center text-slate-400 text-xs">
              Software developer
            </p>

            <p className="text-center text-slate-400 text-xs">from Myanmar</p>
          </div>

          <hr className="border-t border-slate-300 mt-5 mb-2" />

          <div className="flex justify-center gap-2">
            <span className="flex flex-col items-center">
              <span className="text-xl">5</span>{" "}
              <span className="text-slate-400 text-xs">Cards</span>
            </span>
            <div className="w-[1px] bg-slate-300"></div>
            <span className="flex flex-col items-center">
              <span className="text-xl">5</span>{" "}
              <span className="text-slate-400 text-xs">Tags</span>
            </span>
          </div>
        </div>
      </div>

      <div className="w-3/2 overflow-auto">
        <CardForm />
      </div>
    </div>
  );
};

export default Profile;
