import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarDays,
  FaEnvelope,
  FaHouse,
  FaNetworkWired,
  FaPhone,
  FaTag,
  FaUser,
  FaViber,
} from "react-icons/fa6";
import Loading from "../components/Loading";

const url = "http://10.103.0.228:3500";

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getCard = async () => {
    const res = await axios(`${url}/cards/${id}`);
    const card = await res.data;
    console.log(card);
    setTimeout(() => {
      setCard(card);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    getCard();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-xl mx-auto flex flex-row rounded-lg shadow-lg p-6 items-center mt-3 bg-gradient-to-r from-[#f9f8f9] to-[#f2f3f2]">
          <img
            src={card.image}
            alt={card.name}
            className="mx-auto rounded-lg border-2 border-[#0043d8] w-48 h-48"
          />
          <div className="mt-6 text-xl text-gray-700">
            <div className="flex flex-row justify-center items-center">
              <FaUser />
              <p className="p-2">{card.name}</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <FaBuilding />
              <p className="p-2">{card.company}</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <FaBriefcase />
              <p className="p-2">{card.position}</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <FaPhone />
              <p className="p-2">{card.phone}</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <FaViber />
              <p className="p-2">{card.viber}</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <FaEnvelope />
              <p className="p-2">{card.email}</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <FaTag />
              <p className="p-2">{card.tag}</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <FaCalendarDays />
              <p className="p-2">{card.createdDate}</p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <FaNetworkWired />
              <p className="p-2">{card.website}</p>
            </div>
            {/* <div className='flex flex-row justify-center items-center'>
                        <FaHouse />
                        <p className='p-2'>{card.address.address}</p>
                    </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default CardDetails;
