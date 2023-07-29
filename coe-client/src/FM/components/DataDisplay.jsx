import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import './DataDisplay.css';
import Backendapi from '../../Backendapi'

const DataDisplay = () => {
  const runId = localStorage.getItem('viewId');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Backendapi.REACT_APP_BACKEND_API_URL}/fetch-data/${runId}`);
        // http://localhost:5000/fetch-data/${runId}
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, [runId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data || !data.collection1Data || !data.collection2Data) {
    return <div>No data available.</div>;
  }

  const excludeKeys = ['_id', 'runId', '__v'];

  const renderTableRows = (dataObject) => {
    return Object.entries(dataObject)
      .filter(([key]) => !excludeKeys.includes(key))
      .map(([key, value], index) => (
        <tr key={key}>
          <td>{index + 1}</td> {/* Serial number column */}
          <td>{key}</td>
          <td>{key === 'power_opt' ? value.toString() : value}</td>
        </tr>
      ));
  };

  const handleLaunchClick = (key) => {
    // Implement the logic to launch based on the key
    console.log(`Launching ${key}...`);
    setShowModal(true); // Show the modal on click
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="DDtable-container">
      <Table striped bordered style={{ width: '85%',marginTop:"20px"}}>
        <tbody>
          <tr>
            <th id='Disth'>#</th>
            <th id='Disth'>Design Path Data</th>
            <th id='Disth'>Value</th>
          </tr>
          {renderTableRows(data.collection1Data)}
          <tr>
            <th id='Disth'>#</th>
            <th id='Disth'>Design Variable Data</th>
            <th id='Disth'>Value</th>
          </tr>
          {renderTableRows(data.collection2Data)}
        </tbody>
      </Table>
      <Button
    variant="primary"
    style={{ backgroundColor: "#0A58FD", border: "none", marginTop: "15px" }}
    onClick={() => handleLaunchClick()}
  >
    Launch
  </Button>
   {/* Modal to show launch success */}
   <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Launch Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Congratulations! Your launch was successful.
          {/* You can add any success message or animation here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataDisplay;
