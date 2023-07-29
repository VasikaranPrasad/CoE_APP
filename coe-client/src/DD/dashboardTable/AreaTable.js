import React, { useEffect, useState} from "react";

import { Container } from "reactstrap";

import { useLocation } from "react-router-dom";

import TableContainer from "./TableContainer";

import axios from "axios";

import "../AppDD.css";
import Backendapi from "../../Backendapi";

export const AreaTable = () => {
  const location = useLocation();

  const [data, setData] = useState([]);

  const runsDashboard = location.state;

  const [selectedTab, setSelectedTab] = useState(runsDashboard[0]._id); // State to track the selected tab

  const handleTabClick = async (runNameId) => {
    try {
      const response = await axios.get(
        `${Backendapi.PYTHON_APP_BACKEND_API_URL}/api/read_file_byId/${runNameId}`
      );
      // http://127.0.0.1:5000/api/read_file_byId/${runNameId}
      
      console.log(response.data); // Assuming the API returns the data in the response's data property

      setData(response.data); // Update the data state with the fetched data

      setSelectedTab(runNameId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data for the initial selected tab when the component mounts

    handleTabClick(selectedTab);
  }, [selectedTab]);

  return (
    <Container style={{ marginTop: 10 }}>
      <div className="AreabuttonBody">
        {runsDashboard.map((fileEntry, index) => (
          <button
            key={fileEntry._id}
            onClick={() => handleTabClick(fileEntry._id)}
            className={
              selectedTab === fileEntry._id
                ? "selected-tab"
                : "non-selected-tab"
            }
          >
            run_{index + 1}
          </button>
        ))}
      </div>

      {/* <h3 className="text-center">Area Table For One Level</h3> */}

      <div>
        <TableContainer data={data} />
      </div>
    </Container>
  );
};
