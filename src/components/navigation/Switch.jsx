import classNames from "classnames";
import React, { useState } from "react";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useStateContext } from "../../contexts/ContextProvider";
const Switch = () => {
  const [isSelected, setIsSelected] = useState(false);
  const { isDark, setIsDark } = useStateContext();
  const handleSwitch = () => {
    setIsSelected(!isSelected);
    setIsDark(!isDark);
  };

  return (
    <div
      className={classNames(
        "flex w-16 h-8  mx-auto rounded-full transition-all duration-500 bg-blue-500 shadow-5xl",
        {}
      )}
      onClick={() => handleSwitch()}
    >
      <div
        className={classNames(
          "h-6 w-6 bg-slate-200 rounded-full transition-all duration-500  my-auto ml-1 ",
          {
            "ml-9": isSelected,
          }
        )}
      >
        <BsFillSunFill
          className={`ml-[4px] mt-[4px] text-slate-600 transition-all duration-500 ${
            isSelected ? "hidden" : ""
          }`}
        />

        <BsFillMoonStarsFill
          className={`mt-[4px] ml-[4px] text-slate-500 transition-all duration-500  hidden${
            isSelected ? "block" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Switch;
