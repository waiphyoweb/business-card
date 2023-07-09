import { useState } from "react";
import { Link } from "react-router-dom";

const Submenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubNav = () => setSubnav(!subnav);

  return (
    <div className="px-3">
      <Link
        to={item.path}
        className="flex text-slate-100 justify-between items-center my-[10px] py-[8px] px-[6px] hover:bg-slate-700 rounded-lg"
        onClick={item.subNav && showSubNav}
      >
        <div className="flex items-center gap-4">
          {item.icon}
          <span className="text-sm font-poppinsRegular">{item.title}</span>
        </div>

        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>

      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              className="flex gap-2 items-center my-2  pl-10"
            >
              <span className="text-slate-400 text-sm hover:text-white">
                {item.title}
              </span>
            </Link>
          );
        })}
    </div>
  );
};

export default Submenu;
