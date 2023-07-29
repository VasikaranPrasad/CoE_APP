import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Pagination,Button } from 'react-bootstrap';
import Backendapi from '../../Backendapi';
import "./DataDisplay.css"

const View = () => {
  const [designPaths, setDesignPaths] = useState([]);
  const [designVariables, setDesignVariables] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pathsResponse = await axios.get(`${Backendapi.REACT_APP_BACKEND_API_URL}/design-paths`);
      // "http://localhost:5000/design-paths"
      const variablesResponse = await axios.get(`${Backendapi.REACT_APP_BACKEND_API_URL}/design-variables`);
      // "http://localhost:5000/design-variables"
      setDesignPaths(pathsResponse.data);
      setDesignVariables(variablesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Calculate the index range of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the current items to display on the current page
  const currentDesignPaths = designPaths.slice(indexOfFirstItem, indexOfLastItem);
  const currentDesignVariables = designVariables.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClick = () => {
    navigate('/landing');
  };

  return (
    <div>
      <h2>Design Paths</h2>  
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{ background: "#F4770B", border: "none",marginBottom:"3px" }}
            onClick={handleClick}
          >
            Dashboard
          </Button>
        </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th id='Disth'>#</th>
              <th id='Disth'>defDirectory</th>
              <th id='Disth'>lefDirectory</th>
              <th id='Disth'>libDirectory</th>
              <th id='Disth'>techDirectory</th>
            </tr>
          </thead>
          <tbody>
            {currentDesignPaths.map((design, index) => (
              <tr key={design._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{design.defDirectory}</td>
                <td>{design.lefDirectory}</td>
                <td>{design.libDirectory}</td>
                <td>{design.techDirectory}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <h2>Design Variables</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th id='Disth'>#</th>
              <th id='Disth'>design</th>
              <th id='Disth'>num_cpu</th>
              <th id='Disth'>power_opt</th>
              <th id='Disth'>gen_eff</th>
            </tr>
          </thead>
          <tbody>
            {currentDesignVariables.map((variable, index) => (
              <tr key={variable._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{variable.design}</td>
                <td>{variable.num_cpu}</td>
                <td>{variable.power_opt.toString()}</td>
                <td>{variable.gen_eff}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <Pagination>
          {Array.from({ length: Math.ceil(designPaths.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default View;
