import React from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import Loading from "../../components/Loading";

const Logout = () => {
  const { setToken, setRefreshToken, refreshToken } = useStateContext();
  axiosClient.post("/logout", { refreshToken }).then(() => {
    // setUser({});
    setToken(null);
    setRefreshToken(null);
  });
  return (
    <div>
      <Loading />
    </div>
  );
};

export default Logout;
