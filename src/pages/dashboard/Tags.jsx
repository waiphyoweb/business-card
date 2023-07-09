import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import TableComponent from '../../components/TableComponent';
import { FaEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

const url = "http://localhost:3500";

const Tag = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const idColumns = {
      Header: "ID",
      Cell: () => (
        <di>
          <p>1</p>
        </di>
      )
    }

    const anotherColumns = {
      Header: 'Action',
      Cell: (row) => (
        <div className='flex flex-row jsutify-end items-center'>
          {console.log(row.row)}
          <button 
              className='hover:scale-110 transition ease-in-out delay-150 align-middle'
              onClick={() => navigate(`/tag/${row.row.original._id}/update`)}
          >
              <FaEdit className='w-8 h-8 ml-3' />
          </button>
          <button 
              className='hover:scale-110 transition ease-in-out delay-150 align-middle'
              onClick={() => navigate(`/tag/${row.row.original._id}/delete`)}
          >
              <FaTrashCan className='w-8 h-8 ml-3' />
          </button>

        </div>
      )
  };


    const getTags = async () => {
        const res = await axios(`${url}/tags`);
        const data = await res.data.data;
        const columns = await res.data.columns;
        setTimeout(() => {
            setData(data);
            setColumns(columns);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getTags();
    }, [])
    
    return (
        <div>
            { isLoading ? <Loading /> :
            <div>
                <TableComponent data={data}  columns={[idColumns, ...columns, anotherColumns]}/>
            </div>}
        </div>
    )
}

export default Tag;