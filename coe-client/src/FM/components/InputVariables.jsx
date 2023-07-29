import React, { useState } from "react";
import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, Link } from "react-router-dom";
import Backendapi from "../../Backendapi";

const MyForm = () => {
  const dataId = localStorage.getItem("dataId");
  const [design, setDesign] = useState("");
  const [numCpu, setNumCpu] = useState(8);
  const [powerOpt, setPowerOpt] = useState("");
  const [genEff, setGenEff] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const location = useLocation();

  console.log(dataId)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the form has already been submitted
      if (submittedData) {
        // Show the confirmation modal
        setShowConfirmationModal(true);
        return;
      }

      console.log(dataId)
      // "http://localhost:5000/save-design-variable"
      const response = await axios.post(
        `${Backendapi.REACT_APP_BACKEND_API_URL}/save-design-variable`,
        {
          design: design,
          num_cpu: numCpu,
          power_opt: powerOpt,
          gen_eff: genEff,
          data_Id:dataId
        }
      );
      toast.success("Variables added successfully!");
      console.log(response.data.message);

      setSubmittedData({
        design,
        numCpu,
        powerOpt,
        genEff,
      });
      localStorage.removeItem('dataId')
    } catch (err) {
      toast.error("Error adding variables");
      console.error(err.message);
    }
  };

  const handleNumCpuChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 8 && value <= 64) {
      setNumCpu(value);
    }
  };
  
  
  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
  };
  const handleConfirmationModalConfirm = () => {
    setShowConfirmationModal(false);
    // Proceed with form submission
    setSubmittedData(null);
    handleSubmit();
  };

  return (
    <Card
      className="col-7 mt-3"
      style={{ margin: "auto", background: "#dbd7d7" }}
    >
      <CardHeader>
        <Card.Title className="display-6">Design Variables</Card.Title>
      </CardHeader>
      <Card.Body
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 300px)" }}
      >
        {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{ background: "#649FCC", border: "none" }}
            onClick={() => {
              // Handle the click event for the home button
              // Add the necessary logic to redirect the user to the home page
              console.log("Home button clicked");
            }}
          >
            Home
          </Button>
        </div> */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/data-display">
            <button
              style={{
                background: "#F45B1C",

                border: "none",

                borderRadius: "10px",

                marginTop: "2px",

                height: "40px",
                width:"150px",
                color: "white",
              }}
            >
              View Design
            </button>
          </Link>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="design">
            <Form.Label>Design:</Form.Label>
            <Form.Control
              type="text"
              value={design}
              onChange={(e) => setDesign(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="numCpu">
      <Form.Label>Number of CPUs:</Form.Label>
      <Form.Control
        as="select"
        value={numCpu}
        onChange={handleNumCpuChange}
        required
      >
        {Array.from({ length: 57 }, (_, index) => (
          <option key={index} value={index + 8}>
            {index + 8}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
          <Form.Group controlId="powerOpt">
            <Form.Label>Power Optimization:</Form.Label>
            <Form.Control
              as="select"
              value={powerOpt}
              onChange={(e) => setPowerOpt(e.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="genEff">
            <Form.Label>Generation Efficiency:</Form.Label>
            <Form.Control
              as="select"
              value={genEff}
              onChange={(e) => setGenEff(e.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="low">Low</option>
              <option value="med">Medium</option>
              <option value="high">High</option>
            </Form.Control>
          </Form.Group>
          <Button
            className="mt-3"
            style={{ backgroundColor: "#06874A", border: "none" }}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
      {submittedData || location.state?.formData ? (
        <div className="mt-3 table-responsive">
          <h5>Submitted Data:</h5>
          <Table
            striped
            bordered
            hover
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 400px)" }}
          >
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {/* Display DirForm data */}
              <tr>
                <td>DEF File Directory:</td>
                <td>{location.state?.formData?.defDirectory}</td>
              </tr>
              <tr>
                <td>LEF File Directory:</td>
                <td>{location.state?.formData?.lefDirectory}</td>
              </tr>
              <tr>
                <td>LIB File Directory:</td>
                <td>{location.state?.formData?.libDirectory}</td>
              </tr>
              <tr>
                <td>Tech File Directory:</td>
                <td>{location.state?.formData?.techDirectory}</td>
              </tr>
              {/* Display InputVariables data */}
              <tr>
                <td>Design:</td>
                <td>
                  {submittedData?.design || location.state?.formData?.design}
                </td>
              </tr>
              <tr>
                <td>Number of CPUs:</td>
                <td>
                  {submittedData?.numCpu || location.state?.formData?.numCpu}
                </td>
              </tr>
              <tr>
                <td>Power Optimization:</td>
                <td>
                  {submittedData?.powerOpt ||
                    location.state?.formData?.powerOpt}
                </td>
              </tr>
              <tr>
                <td>Generation Efficiency:</td>
                <td>
                  {submittedData?.genEff || location.state?.formData?.genEff}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : null}
      {/* Confirmation modal */}
      <Modal show={showConfirmationModal} onHide={handleConfirmationModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Resubmission Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have already submitted the form. Are you sure you want to
          resubmit?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmationModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmationModalConfirm}>
            Resubmit
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default MyForm;
