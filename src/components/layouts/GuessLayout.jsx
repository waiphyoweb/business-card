import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

const GuessLayout = () => {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default GuessLayout;
