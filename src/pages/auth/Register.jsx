import React from "react";
import { Link } from "react-router-dom";

const App = () => {
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
            Sign up new account
          </h1>

          <form action="#" method="POST" className="mt-6">
            <div>
              <label className="block text-gray-700">User Name</label>
              <input
                type="text"
                placeholder="Enter Email Address "
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoComplete={true}
                autoFocus={true}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email Address "
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoComplete={true}
                autoFocus={true}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                minLength={6}
                name=""
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Comfirm Password</label>
              <input
                type="password"
                placeholder="Comfirm Password"
                minLength={6}
                name=""
                className="w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <button className="w-full block bg-blue-500 hover:bg-blue-400 px-4 py-3 mt-6 rounded-lg font-semibold text-white focus:bg-blue-400 focus:outline-none ">
              Register
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
