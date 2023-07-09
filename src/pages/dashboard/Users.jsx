import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';
import { FaRegIdCard } from 'react-icons/fa6';
import Loading from '../../components/Loading';
import TableComponent from '../../components/TableComponent';
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:3500";

const Users = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const anotherColumns = {
        Header: 'Detail',
        Cell: (row) => (
            <button 
                className='hover:scale-110 transition ease-in-out delay-150 align-middle'
                onClick={() => navigate(`/users/${row.row.original.userId}`)}
            >
                <FaRegIdCard className='w-8 h-8 ml-3' />
            </button>
        )
    };

    const getUsers = async () => {
        const res = await axios(`${url}/users`);
        const data = await res.data.data;
        const columns = await res.data.columns;
        console.log(data);
        setTimeout(() => {
            setData(data);
            setColumns(columns);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getUsers();
    }, [])
    
    return (
        <div>
            { isLoading ? <Loading /> :
            <div>
                <TableComponent data={data}  columns={[...columns, anotherColumns]}/>
            </div>}
        </div>
    )
}

export default Users