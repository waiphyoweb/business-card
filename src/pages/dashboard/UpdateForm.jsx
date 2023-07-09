import React, { useEffect, useState, useMemo, useRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import jwt_decode from "jwt-decode";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import axiosClient from "../../axios-client";
import { BsFillTrash2Fill } from "react-icons/bs";
import { matchSorter } from "match-sorter";
import { useThrottle } from "use-throttle";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import Cookies from "universal-cookie";

const UpdateForm = () => {
  const { isDark } = useStateContext();

  const [tags, setTags] = useState([]);
  const [data, setData] = useState([]);

  const [cards, setCards] = useState([]);
  const [positions, setPositions] = useState([]);
  const [company, setCompany] = useState([]);
  const [valueData, setValueData] = useState([]);
  const [valueTag, setValueTag] = useState([]);
  const [cardTagValue, setCardTagValue] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/tags")
      .then(({ data }) => {
        setTags(data.data);
      })
      .catch((err) => {
        const response = err.response;

        if (response && response.status === 400) {
        }
      });

    axiosClient
      .get("/cards")
      .then(({ data }) => {
        setCards(data.data);
      })
      .catch((err) => {
        const response = err.response;

        if (response && response.status === 400) {
        }
      });

    axiosClient.get("/cards/649bff04232a49841c1bae8c").then(({ data }) => {
      setValueData(data);

      setPValue(data.position);
      setCValue(data.company);
      //   console.log(data.tags);
      setCardTagValue(data.tags);
    });

    axiosClient.get("/tags").then(({ data }) => setValueTag(data.data));
  }, []);

  useEffect(() => {}, [valueTag]);

  useEffect(() => {
    let unduplicateArr = [];
    const duplicateArr = [];

    let unduplicateArrP = [];
    const duplicateArrP = [];

    let unduplicateArrC = [];
    const duplicateArrC = [];

    tags.map((tag) => duplicateArr.push(tag.name));
    cards.map((card) => duplicateArrP.push(card.position));
    cards.map((card) => duplicateArrC.push(card.company));

    unduplicateArr = [...new Set(duplicateArr)];
    unduplicateArrP = [...new Set(duplicateArrP)];
    unduplicateArrC = [...new Set(duplicateArrC)];

    setData(unduplicateArr);
    setPositions(unduplicateArrP);
    setCompany(unduplicateArrC);
  }, [tags, cards]);

  //Company
  const [term, setTerm] = useState("");
  const [tagResults, setTagResults] = useState([...matchSorter(data, term)]);

  //Positions
  const [termP, setTermP] = useState("");
  const useCityMatchP = (termP) => {
    const throttledTerm = useThrottle(termP, 100);
    return useMemo(
      () => (termP.trim() === "" ? null : matchSorter(positions, termP)),
      [throttledTerm]
    );
  };
  const resultsP = useCityMatchP(termP);

  //Company
  const [termC, setTermC] = useState("");
  const useCityMatchC = (termC) => {
    const throttledTerm = useThrottle(termC, 100);
    return useMemo(
      () => (termC.trim() === "" ? null : matchSorter(company, termC)),
      [throttledTerm]
    );
  };
  const resultsC = useCityMatchC(termC);

  useEffect(() => {
    // resultsP.map(r => console.log("results "+ r))
  }, [positions]);

  useEffect(() => {
    setTagResults([...matchSorter(data, term)]);
  }, [term, data]);

  const [inputV, setInputV] = useState("");
  const [todos, setTodos] = useState([]);

  const [pValue, setPValue] = useState("");
  const [cValue, setCValue] = useState("");

  //positions

  const handleChangeP = (event) => {
    setTermP(event.target.value);
    setPValue(event.target.value);
  };

  //company

  const handleChangeC = (event) => {
    setTermC(event.target.value);
    setCValue(event.target.value);
  };

  const handleChangeTag = (event) => {
    setTerm(event.target.value);
    setInputV(event.target.value);
  };

  const addTodo = (todo) => {
    const newToDo = tags.find((tag) => tag.name === todo);
    console.log("todo : " + todo);
    console.log("newTodo : " + newToDo._id);
    setTodos([...todos, { id: newToDo._id, task: todo }]);
  };

  const deleteTodo = (id, task) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    setData((prev) => [...prev, task]);
  };

  const handleSelectTag = (item) => {
    setInputV(item);

    addTodo(item);

    setData(data.filter((tag) => tag !== item));

    setInputV("");
  };

  //Input values
  const nameRef = useRef();
  const companyRef = useRef();
  const positionRef = useRef();
  const phoneRef = useRef();
  const viberRef = useRef();
  const emailRef = useRef();
  const websiteRef = useRef();
  const publicRef = useRef();
  const addressRef = useRef();

  //file Upload
  const [imageUpload, setImageUpload] = useState(null);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const name = nameRef.current.value;
    const company = companyRef.current.value;
    const position = positionRef.current.value;
    const phone = phoneRef.current.value;
    const viber = viberRef.current.value;
    const email = emailRef.current.value;
    const website = websiteRef.current.value;
    const isPublic = publicRef.current.value;
    const address = addressRef.current.value;

    const fd = new FormData();
    if (imageUpload) {
      fd.append("name", name);
      fd.append("file", imageUpload.name);
      fd.append("company", company);
      fd.append("position", position);
      fd.append("phone", phone);
      fd.append("viber", viber);
      fd.append("image", imageUpload);
      fd.append("email", email);
      fd.append("website", website);
      fd.append("isPublic", isPublic);
      fd.append("address", address);
      fd.append("tags", JSON.stringify(todos.map((todo) => todo.id)));
    }

    console.log(imageUpload);

    const cookies = new Cookies();
    const cookieValue = cookies.get("token");
    console.log(cookieValue);

    const token = jwt_decode(cookieValue);

    const url = `http://10.103.0.228:3500/cards/user/${token.UserInfo.userId}`;

    const payload = {
      name: name,
      company: company,
      position: position,
      phone: phone,
      viber: viber,
      email: email,
      website: website,
      isPublic: isPublic,
      address: address,
      tags: [todos.map((todo) => todo.id)],
      image: fd,
    };

    console.log(payload);

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${cookieValue}`,
          "content-type": "multipart/form-data",
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleImage = (ev) => {
    setImageUpload(ev.target.files);
  };

  return (
    <>
      <div
        className={`min-w-4xl mx-5 h-screen  ${
          isDark ? "bg-[#2a2b32]" : "bg-white px-5"
        }`}
      >
        <h1 className="text-3xl font-poppinsBold  mb-8 text-center text-slate-600">
          Add A Business Card
        </h1>
        <form onSubmit={(ev) => handleSubmit(ev)} encType="multipart/form-data">
          <div className="flex flex-col w-full md:flex-row gap-2">
            <div className="w-full ">
              <div>
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="User Name"
                  className="w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  ref={nameRef}
                  defaultValue={valueData.name}
                />
              </div>

              <div className="mt-2">
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Company
                </label>
                <Combobox
                  aria-label="Cities"
                  onSelect={(item) => setCValue(item)}
                  className=""
                >
                  {/* onSelect={(item) => handleSelectP(item)} */}
                  <ComboboxInput
                    // ref={inputValue}
                    className="city-search-input w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    onChange={(e) => handleChangeC(e)}
                    value={cValue}
                    placeholder="Company Name"
                  />
                  {resultsC && (
                    <ComboboxPopover className="shadow-popup  bg-[#2a2b32] text-slate-200 rounded-lg mt-1 px-4 py-2">
                      {resultsC.length > 0 ? (
                        <ComboboxList>
                          {resultsC.map((result, index) => (
                            <ComboboxOption key={index} value={`${result}`} />
                          ))}
                        </ComboboxList>
                      ) : (
                        <span style={{ display: "block", margin: 8 }}>
                          {/* {(flag = false)} */}
                          No results found 😞
                        </span>
                      )}
                    </ComboboxPopover>
                  )}
                </Combobox>
              </div>

              <div className="mt-2">
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Position
                </label>
                <Combobox
                  aria-label="Cities"
                  onSelect={(item) => setPValue(item)}
                  className=""
                >
                  {/* onSelect={(item) => handleSelectP(item)} */}
                  <ComboboxInput
                    // ref={inputValue}
                    className="city-search-input w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                    onChange={(e) => handleChangeP(e)}
                    value={pValue}
                    placeholder="Position title"

                    // onKeyDown={handleKeyDown}
                  />
                  {resultsP && (
                    <ComboboxPopover className="shadow-popup bg-[#2a2b32] text-slate-200 rounded-lg mt-1 px-4 py-2">
                      {resultsP.length > 0 ? (
                        <ComboboxList>
                          {resultsP.map((result, index) => (
                            <ComboboxOption key={index} value={`${result}`} />
                          ))}
                        </ComboboxList>
                      ) : (
                        <span style={{ display: "block", margin: 8 }}>
                          {/* {(flag = false)} */}
                          No results found 😞
                        </span>
                      )}
                    </ComboboxPopover>
                  )}
                </Combobox>
              </div>

              <div className="mt-2">
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  ref={phoneRef}
                  defaultValue={valueData.phone}
                />
              </div>

              <div className="mt-2">
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Viber
                </label>
                <input
                  type="text"
                  placeholder="Viber Number"
                  className="w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  ref={viberRef}
                  defaultValue={valueData.viber}
                />
              </div>

              <div className="mt-2">
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Tags
                </label>

                <div className="flex items-center gap-1">
                  {todos.map((todo) => (
                    <div
                      className="Todo flex items-center bg-slate-500 p-1 rounded-md text-slate-100 gap-2"
                      key={todo.id}
                    >
                      <p>{todo.task}</p>
                      <RxCross1
                        size={15}
                        onClick={() => deleteTodo(todo.id, todo.task)}
                      />
                    </div>
                  ))}
                </div>
                <Combobox
                  aria-label="Cities"
                  onSelect={(item) => handleSelectTag(item)}
                  className=""
                >
                  <ComboboxInput
                    // ref={inputValue}
                    className="city-search-input w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    onChange={(e) => handleChangeTag(e)}
                    value={inputV}
                    placeholder="Tag Name"
                    ref={websiteRef}
                    // onKeyDown={handleKeyDown}
                  />
                  {tagResults && (
                    <ComboboxPopover className="shadow-popup bg-[#2a2b32] text-slate-200 rounded-lg mt-1 px-4 py-2">
                      {tagResults.length > 0 ? (
                        <ComboboxList>
                          {tagResults.map((result, index) => (
                            <ComboboxOption key={index} value={`${result}`} />
                          ))}
                        </ComboboxList>
                      ) : (
                        <span style={{ display: "block", margin: 8 }}>
                          {/* {(flag = false)} */}
                          No results found 😞
                          <p style={{ textAlign: "center", padding: 10 }}>
                            <button>Create a new tag : {inputV}</button>
                          </p>
                        </span>
                      )}
                    </ComboboxPopover>
                  )}
                </Combobox>
                {/* <button type="submit">Add</button>
      </form> */}
              </div>
            </div>

            <div className="w-full">
              <div>
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email Address"
                  className="w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  ref={emailRef}
                  defaultValue={valueData.email}
                />
              </div>
              <div className="mt-2">
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Website
                </label>
                <input
                  type="text"
                  placeholder="Website Address"
                  className="w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  ref={websiteRef}
                  defaultValue={valueData.website}
                />
              </div>
              <div className="mt-2">
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Public or Draft
                </label>
                <select
                  type="text"
                  placeholder="Name"
                  className="w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  ref={publicRef}
                >
                  <option value={true} className="bg-slate-500 text-slate-200">
                    Public
                  </option>
                  <option
                    value={false}
                    className="bg-slate-500 text-slate-200 "
                  >
                    Draft
                  </option>
                </select>
              </div>
              <div className="mt-2">
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Image
                </label>
                <input
                  type="file"
                  placeholder="Name"
                  className="w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none file:bg-slate-500 file:text-slate-200 file:rounded-md file:border-none"
                  onChange={(ev) => handleImage(ev)}
                />
              </div>

              <div className="mt-2">
                <label className="block text-gray-700 font-poppinsRegular text-sm">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full bg-gray-200 rounded-lg px-4 py-2 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  ref={addressRef}
                  defaultValue={valueData.address}
                />
              </div>
            </div>
          </div>
          <button className="bg-slate-800 mt-3 px-5 py-1 rounded-lg text-white hover:bg-slate-600">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateForm;
