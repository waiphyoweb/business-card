import { useState } from "react";
import { Link } from "react-router-dom";

const Submenu2 = ({ item }) => {
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
      hahahaha
    </div>
  );
};

export default Submenu2;
