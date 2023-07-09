import React, { createContext, useContext, useState } from "react";
import Cookies from "universal-cookie";

const stateContext = createContext({
  cards: [],
  setCards: () => {},
  token: null,
  setToken: () => {},
  isOpen: false,
  setIsOpen: () => {},
  sidebar: false,
  setSidebar: () => {},
  isDark: false,
  setIsDark: () => {},
  refreshToken: null,
  setRefreshToken: () => {},
  values: {},
  setValues: () => {},
  frontErrors: {},
  setFrontErrors: () => {},
  userValidation: true,
  setUserValidation: () => {},
  userErrors: "",
  setUserErrors: () => {},
  cardAndProfile: true,
  setCardAndProfile: () => {},
  admin: null,
  setAdmin: () => {},
});

const ContextProvider = ({ children }) => {
  const cookies = new Cookies();
  const [cards, setCards] = useState([]);
  const [token, _setToken] = useState(cookies.get("token"));
  const [refreshToken, _setRefreshToken] = useState(cookies.get("jwt"));
  const [isOpen, setIsOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [userValidation, setUserValidation] = useState(true);
  const [cardAndProfile, setCardAndProfile] = useState(true);
  const [userErrors, setUserErrors] = useState("");
  const [admin, setAdmin] = useState(null);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [frontErrors, setFrontErrors] = useState({});

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      cookies.set("token", token, { path: "/" });
    } else {
      cookies.remove("token");
    }
  };

  const setRefreshToken = (refreshToken) => {
    _setRefreshToken(refreshToken);
    if (refreshToken) {
      cookies.set("jwt", refreshToken, { path: "/" });
    } else {
      cookies.remove("jwt");
    }
  };

  const value = {
    cards,
    setCards,
    token,
    setToken,
    isOpen,
    setIsOpen,
    sidebar,
    setSidebar,
    isDark,
    setIsDark,
    refreshToken,
    setRefreshToken,
    values,
    setValues,
    frontErrors,
    setFrontErrors,
    userValidation,
    setUserValidation,
    userErrors,
    setUserErrors,
    cardAndProfile,
    setCardAndProfile,
    admin,
    setAdmin,
  };

  return (
    <stateContext.Provider value={value}>{children}</stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
export default ContextProvider;
