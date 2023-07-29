import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/DA.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backendapi from "../../Backendapi";

const RunsForm = ({ addRun }) => {
  const navigate = useNavigate();
  const [designName, setDesignName] = useState("");
  const [runName, setRunName] = useState("");
  const [directory, setDirectory] = useState("");

  //

  const handleSubmit = async (e) => {
    e.preventDefault();  
    try {
      const pydata = await axios.post(`${Backendapi.PYTHON_APP_BACKEND_API_URL}/api/data`, {
        designName,
        runName,
        directory,
      });
      console.log(pydata, "Data sent to Python Flask server");
    } catch (error) {
      console.error("Error sending data to Python Flask server:", error);
    } 
    try {   
      const res = await axios.post(`${Backendapi.REACT_APP_BACKEND_API_URL}/api/CreateAddRun`, {
        designName,
        runName,
        directory,
      });

      // ******* passing data through navigater **********
      navigate("/landing");
      addRun({ designName, runName, directory });
      setDesignName("");
      setRunName("");
      setDirectory("");
      toast.success("Run created successfully");
    } catch (error) {
      console.error("Failed to create run:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to create run");
      }
    }
  };

  const handleCancel = () => {
    setDesignName("");

    setRunName("");

    setDirectory("");
  };

  return (
    <div className="runs-form">
      <h2 className="form-title">Create Run</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="designName">Design Name</label>

          <div className="input-container">
            <input
              type="text"
              id="designName"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="runName">Run Name</label>

          <input
            type="text"
            id="runName"
            required
            value={runName}
            onChange={(e) => setRunName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="directory">Run Directory</label>
          <input
            type="text"
            id="directory"
            required
            value={directory}
            onChange={(e) => setDirectory(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn-submit">
            Submit
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RunsForm;
