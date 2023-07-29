import React, { useEffect, useState } from "react";
import axios from "axios";
import Backendapi from "../../Backendapi";
import { useNavigate, useLocation } from "react-router-dom";
import "./DA.css"; // Import the CSS file for styling
import { Doughnut } from "react-chartjs-2";

function PostSynthesisReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const percentage = location.state?.percentage;
  const [checklistItems, setChecklistItems] = useState({
    pdDev: null,
    pdLead: null,
  });

  useEffect(() => {
    axios
      .get(`${Backendapi.REACT_APP_BACKEND_API_URL}/api/postchecklist`)
      .then((response) => {
        setChecklistItems(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving checklist items:", error);
      });
  }, []);


  const chartData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#36A2EB", "#E3E3E3"],
        hoverBackgroundColor: ["#36A2EB", "#E3E3E3"],
      },
    ],
  };

  console.log(checklistItems); // Check the values of checklistItems
  const pdDevItem = checklistItems.pdDev;
  const pdLeadItem = checklistItems.pdLead;
  const pdDevQuestionKeys = Object.keys(pdDevItem?.questions || {});
  const pdLeadQuestionKeys = Object.keys(pdLeadItem?.questions || {});
  const data = pdDevItem?.data || pdLeadItem?.data;
  const pdDevData = pdDevItem?.pdDev || {};
  const devCommentsData = pdDevItem?.devComments || {};
  const pdLeadData = pdLeadItem?.pdLead || {};
  const pdLeadComments = pdLeadItem?.pdLeadComments || {};
  const questionKeys =
    pdDevQuestionKeys.length > 0 ? pdDevQuestionKeys : pdLeadQuestionKeys;
  return (
    <div className="container">
      <h1>Post-Synthesis Report</h1>

      <div>
        {/* Display the percentage value here */}
        <p>Percentage: {percentage}%</p>
      </div>

      <div className="buttons-container">
        <div className="left-buttons">
          <button className="back-button" onClick={() => navigate("/")}>
            Add Run
          </button>
        </div>

        <div className="right-buttons">
          <button className="back-button" onClick={() => navigate("/login")}>
            Synthesis Login
          </button>
        </div>
      </div>

      {questionKeys.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Data</th>
              <th>PD Dev</th>
              <th>Dev Comments</th>
              <th>PD Lead</th>
              <th>Lead Comments</th>
            </tr>
          </thead>
          <tbody>
            {questionKeys.map((questionKey) => (
              <tr key={questionKey}>
                <td>
                  {pdDevItem?.questions[questionKey] ||
                    pdLeadItem?.questions[questionKey]}
                </td>
                <td>{data || "Report is not available"}</td>
                <td>
                  {pdDevData[`${questionKey}`.replace("question", "pdDev")] ||
                    "Report is not available"}
                </td>
                <td>
                  {devCommentsData[
                    `${questionKey}`.replace("question", "devComments")
                  ] || "Report is not available"}
                </td>
                <td>
                  {pdLeadData[`${questionKey}`.replace("question", "pdLead")] ||
                    "Report is not available"}
                </td>
                <td>
                  {pdLeadComments[
                    `${questionKey}`.replace("question", "pdLeadComments")
                  ] || "Report is not available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No checklist items found.</p>
      )}
    </div>
  );
}

export default PostSynthesisReport;


