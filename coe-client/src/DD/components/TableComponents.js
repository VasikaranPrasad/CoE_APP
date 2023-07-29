import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import columns from "./Columns";
import "../AppDD.css";
import { FaAngleDoubleRight } from "react-icons/fa";
import Backendapi from "../../Backendapi";
export const TableComponents = () => {
  const navigate = useNavigate();

  const [colVal, setColVal] = useState([]);

  const maxRowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * maxRowsPerPage;

  const slicedData = colVal.slice(startIndex, startIndex + maxRowsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${Backendapi.REACT_APP_BACKEND_API_URL}/api/landingrun`
        );

        setColVal(res.data);
      } catch (error) {
        console.error(error);

        // Handle errors
      }
    };

    fetchData();
  }, []);

  const viewDashboard = async (runName) => {
    try {
      const runData = await axios.post(
        `${Backendapi.PYTHON_APP_BACKEND_API_URL}/api/get_data_by_id/${runName}`
      );
      // http://127.0.0.1:5000/api/get_data_by_id/${runName}
      navigate("/viewdashboard", { state: runData.data });
    } catch (error) {
      console.error("Error sending data to Python Flask server:", error);
    }
  };


  const DAlogin = async (runName) => {
    navigate('/login')
  }
  const AddRun = async (runName) => {
    navigate('/addrun')
  }

  const handleSetUpButtonClick = (id) => {
    localStorage.setItem("dataId", id);

    const dirFormUrl = "/dirform"; // Replace with the actual URL of the dirform page
    localStorage.setItem("dataId", id);
    // Pass any necessary data to the dirform page through query parameters or state

    const dataToPass = {
      // Define the data to pass here
    };

    // Construct the URL with query parameters or state data

    const urlWithParams = `${dirFormUrl}?param1=value1&param2=value2`; // Replace with the actual query parameters

    // Navigate to the dirform page

    window.location.href = urlWithParams;
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: slicedData });

  return (
    <React.Fragment>
      <div>
        <button onClick={() => AddRun()} >Addrun</button> 
      </div>
      <div className="TableContainer">
        <table {...getTableProps()} className="TableBody">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              return (
                
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.column.Header === "FM" ? (
                        <span className="buttonContainer">
                          <button
                            className={`TableCustomButtonFM ${
                              cell.value ? "active" : "disabled"
                            }`}
                          >
                            View
                          </button>

                          <button
                            className={`TableCustomButtonFM ${
                              cell.value ? "disabled" : "active"
                            }`}
                            onClick={() =>
                              handleSetUpButtonClick(row.original._id)
                            }
                          >
                            Set_up
                          </button>
                        </span>
                      ) : cell.column.Header === "DD" ? (
                        <button
                          className={`TableCustomButton ${
                            cell.value ? "active" : "disabled"
                          }`}
                          disabled={!cell.value}
                          onClick={() => viewDashboard(row.original.runName)}
                        >
                          Go <FaAngleDoubleRight />
                        </button>
                      ) : cell.column.Header === "DA" ? (
                        <button
                          className={`TableCustomButton ${
                            cell.value ? "active" : "disabled"
                          }`}
                          disabled={!cell.value}
                          onClick={() => DAlogin(row.original.runName)}
                          >
                        
                          Go <FaAngleDoubleRight />
                        </button>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="paginationContainer">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(colVal.length / maxRowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"TablePagination"}
          activeClassName={"active"}
        />
      </div>
    </React.Fragment>
  );
};


