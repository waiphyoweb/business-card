import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import TableComponent from "../../components/TableComponent";
import { FaRegIdCard } from "react-icons/fa6";
import axiosClient from "../../axios-client";
import CardDetails from "../CardDetail";

// const url = "http://10.103.0.228:3500";
const url = "http://localhost:3500";

const Cards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [cardId, setCardId] = useState();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const idColumns = {
    Header: "ID",
    width: 10,
    isVisible: false,
    Cell: (row) => (
      <div>
        <p>{row.row.index + 1}</p>
      </div>
    ),
  }

  const anotherColumns = [
    {
      Header: 'Website',
      accessor: 'website',
      sortType: 'basic',
      Cell: (row) => (
        <a href={`https://${row.row.original.website}`} target="_blank" className="hover:text-blue-500">{row.row.original.website}</a>
      )
    },
    {
      Header: 'Created Date',
      accessor: 'createdDate',
      sortType: 'basic',
      Cell: (row) => (
        <p>{new Date(row.row.original.createdDate).toLocaleDateString('en-GB')}</p>
      )
    },
    {
      Header: "Detail",
      Cell: (row) => (
        <button
          className="hover:scale-110 hover:text-blue-500 transition ease-in-out delay-150 align-middle"
          onClick={() => {
            // navigate(`/cards/${row.row.original._id}`);
            setCardId(row.row.original._id);
            setIsVisible(true);
          }}
        >
          <FaRegIdCard className="w-8 h-8 ml-3" />
        </button>
      ),
    }
  ];

  const getCards = async () => {
    const res = await axiosClient(`${url}/cards`, {
      withCredentials: true,
    });
    const data = await res.data.data;
    const columns = await res.data.columns;
    setTimeout(() => {
      setData(data);
      setColumns(columns);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    try {
      getCards();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // const now = new Date();

  return (
    <>
      {isVisible && <CardDetails id={cardId} setIsVisible={setIsVisible}/>}
      {isLoading ? (
        <Loading />
        ) : (
        <div className={isVisible? "blur-sm" : " "}>
          <TableComponent data={data} columns={[idColumns, ...columns.concat(anotherColumns)]} />
        </div>
      )}
    </>
  );
};

export default Cards;
