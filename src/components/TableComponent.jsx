import React, { useState, useRef, useEffect } from "react";
import {motion} from 'framer-motion';
import { useTable, usePagination, useGlobalFilter, useSortBy, useExpanded } from "react-table";
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp, FaAnglesLeft, FaAnglesRight, FaMagnifyingGlass } from "react-icons/fa6";
// import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import {RxCrossCircled} from 'react-icons/rx';


// Our table component
function TableComponent({ columns, data }) {

  const [toggle, setToggle] = useState(false);

  const TableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    useExpanded,
    usePagination,
  );

  // console.log("This is table instance", TableInstance);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    // state,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    allColumns,
    getToggleHideAllColumnsProps,
    state: { pageIndex, pageSize, globalFilter },
    toggleAllRowsExpanded,
    toggleRowExpanded,
  } = TableInstance;

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return <input type="checkbox" ref={resolvedRef} {...rest} />
    }
  )
  
  return (
    <motion.div                 
    className={`p-3 container mx-auto font-poppinsLight text-[#2a2b32] + `}
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 0.5}}>
      <div className="flex justify-between items-center  ">
        {toggle ?  
          <div className="grid grid-rows-2 grid-flow-col gap-2 p-3">
            <div>
              <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
              All
            </div>
            {allColumns.map(column => (
              <div key={column.id}>
                <label>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                  {column.id}
                </label>
              </div>
            ))}
          <button onClick={() => setToggle(false)} className="ml-auto z-10"><RxCrossCircled /></button>
          </div> : 
          <button onClick={() => setToggle(true)} className="p-3 border border-[#2a2b32] rounded-lg hover:bg-[#2a2b32] hover:text-white">Visible Columns</button>
        }
        <div className='my-3 flex justify-end items-center gap-3 md:gap-6 ml-auto'>
            <div className="flex flex-row items-center gap-3">
                <h1 className="invisible md:visible text-lg lg:text-xl font-medium">Search</h1>
                <FaMagnifyingGlass className='w-5 h-5' />
            </div>
            <div>
              <input
                  className='p-2 w-full rounded-xl focus:outline-[#2a2b32] border border-[#2a2b32]'
                  type="text"
                  value={globalFilter || ""}
                  onChange={e => setGlobalFilter(e.target.value)}
              />
            </div>
        </div>
      </div>

      <table {...getTableProps()} className="text-left drop-shadow-lg border-separate border-spacing-y-2 w-full">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className='text-base lg:text-lg text-white bg-gradient-to-r from-gray-800 to-gray-900'>
              {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} {...column.getHeaderProps({style: {width: column.width && column.width}})} className="p-3">
                {column.render('Header')}
                {/* {if(){}} */}
                <span>
                 {column.isSorted ? (column.isSortedDesc ? <FaAngleDown /> : <FaAngleUp />) : ' '}
                </span>
              </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()} key={i} className='text-md bg-gray-100'>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} className='p-3 break-all'>{cell.render("Cell")}</td>
                      );
                    })}
                </tr>
                {
                  <tr>
                    <div>
                      <p>{row.original.name}</p>
                      <p>{row.original.company}</p>
                      <p>{row.original.position}</p>
                    </div>
                  </tr>
                }
              </>
            );
          })}
        </tbody>
      </table>

      {/* This is Pagination */}
      <div className="p-4 flex justify-between items-center flex-wrap ">
          <div>{rows.length} results</div>
          <div className="flex flex-row gap-2">
              <span className="flex items-center">
                Page{" "}
                <p>
                  {pageIndex + 1} of {pageOptions.length}
                </p>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  className="w-20 px-4 h-8 rounded-lg "
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                  }}
                />
              </span>{" "}
              <select
                className="rounded-lg px-4 h-8 bg-gray-100"
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
          </div>

          <div className="flex flex-row ">
              <button 
                className="px-4 py-2 transition-colors duration-150 focus:shadow-outline hover:bg-gradient-to-r from-gray-800 to-gray-900 hover:text-white rounded-l-lg" 
                onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <FaAnglesLeft />
              </button>{" "}
              <button 
                className="px-4 py-2 transition-colors duration-150 focus:shadow-outline hover:bg-gradient-to-r from-gray-800 to-gray-900 hover:text-white" 
                onClick={() => previousPage()} disabled={!canPreviousPage}>
                <FaAngleLeft />
              </button>{" "}
            
              <button 
                className="px-4 py-2 transition-colors duration-150 focus:shadow-outline hover:bg-gradient-to-r from-gray-800 to-gray-900 hover:text-white" 
                onClick={() => nextPage()} disabled={!canNextPage}>
                <FaAngleRight />
              </button>{" "}
              <button 
                className="px-4 py-2 transition-colors duration-150 focus:shadow-outline hover:bg-gradient-to-r from-gray-800 to-gray-900 hover:text-white rounded-r-lg" 
                onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                <FaAnglesRight />
              </button>{" "}
          </div>
      </div>
    </motion.div>
  );
}

export default TableComponent;
