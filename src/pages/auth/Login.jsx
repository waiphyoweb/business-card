import React, { useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { validation } from "../Validation";

const App = () => {
  const { setToken, setRefreshToken } = useStateContext();

  const [results, setResults] = useState(false);

  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(payload);

    axiosClient
      .post("/auth", payload, {
        withCredentials: true, // Send cookies along with the request
      })
      .then(({ data }) => {
        console.log(data.accessToken);
        console.log(data.refreshToken);
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
      })
      .catch((err) => {
        const response = err.response;

        if (response && response.status == 400) {
        }
      });
  };

  return (
    <section className="flex flex-col md:flex-row  h-screen items-center">
      {/* Login left banner */}
      <div className=" h-screen hidden bg-blue-500 lg:block  md:w-1/2 xl:w-2/3">
        <img
          src="/image/Login2.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login left banner  */}
      {/* Login Right content Section  */}
      <div className="bg-white items-center justify-center  flex md:mx-auto lg:max-w-full  w-full md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12 ">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <form
            action="#"
            method="POST"
            className="mt-6"
            onSubmit={(ev) => handleSubmit(ev)}
          >
            <div>
              <label className="block text-gray-700">UserName</label>

              <input
                type="text"
                placeholder="Enter Username "
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                ref={nameRef}
                required
                name="username"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                ref={passwordRef}
                placeholder="Enter Password"
                minLength={6}
                name="password"
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <button className="w-full block bg-blue-500 hover:bg-blue-400 px-4 py-3 mt-6 rounded-lg font-semibold text-white focus:bg-blue-400 focus:outline-none ">
              Log In
            </button>

            <hr className="my-6 border-gray-300 w-full" />

            <p className="text-sm text-gray-500 mt-8">
              &copy; 2023 Kaung Min Login Landing Page
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default App;
