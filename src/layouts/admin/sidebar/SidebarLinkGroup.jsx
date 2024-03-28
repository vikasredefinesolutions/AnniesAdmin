import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function SidebarLinkGroup({ children, activecondition, type }) {
  const [open, setOpen] = useState(activecondition);
  const location = useLocation();
  const { pathname } = location;

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(activecondition);
  }, [activecondition, pathname]);

  return (
    <li className={`${type ? 'px-3 pt-2 pb-2 rounded-sm mb-1 last:mb-0' : ""} ${activecondition && ''}`}>
      {children(handleClick, open)}
    </ li>
  );
}

export default SidebarLinkGroup;
