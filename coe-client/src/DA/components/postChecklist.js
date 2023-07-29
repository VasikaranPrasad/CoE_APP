import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import questions from "./config";
import "./DA.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Backendapi from "../../Backendapi";

function PostChecklistPage() {
  const [answers, setAnswers] = useState({});
  const [pdDevData, setPdDevData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const userRole = location.state?.role;

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };


  const calculatePercentage = () => {
    const totalQuestions = data.length;
    const answeredQuestions = Object.keys(answers).filter(
      (key) => answers[key] === "YES"
    ).length;
    const percentage = (answeredQuestions / totalQuestions) * 100;
    return percentage.toFixed(2);
  };

  useEffect(() => {
    if (userRole === "PD Lead") {
      axios
        .get(`${Backendapi.REACT_APP_BACKEND_API_URL}/api/postchecklist/pddev`)
        .then((response) => {
          setPdDevData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching PD Dev data:", error);
        });
    }
  }, [userRole]);

  const data = React.useMemo(() => {
    return questions.map((question, index) => {
      const pdDevValue = pdDevData?.pdDev?.[`pdDev${index + 1}`];
      const pdDevCommentsValue =
        pdDevData?.devComments?.[`devComments${index + 1}`];

      const pdDevValueArray = Array.from(pdDevValue || []);
      const pdDevValueString = pdDevValueArray.join("");

      const pdDevCommentsValueArray = Array.from(pdDevCommentsValue || []);
      const pdDevCommentsValueString = pdDevCommentsValueArray.join("");

      const row = {
        question: question.text,
        data: <button className="NAButton">NA</button>,
        pdDev:
          userRole === "PD Dev" ? (
            <div>
              <label>
                <input
                  type="radio"
                  name={`pdDev${index + 1}`}
                  value="YES"
                  checked={answers[`pdDev${index + 1}`] === "YES"}
                  onChange={handleRadioChange}
                />
                YES
              </label>
              <label>
                <input
                  type="radio"
                  name={`pdDev${index + 1}`}
                  value="NO"
                  checked={answers[`pdDev${index + 1}`] === "NO"}
                  onChange={handleRadioChange}
                />
                NO
              </label>
            </div>
          ) : (
            <div className="shaded-column">
              <span>{pdDevValueString || "NA"}</span>{" "}
              {/* Report is Not Available => NA */}
            </div>
          ),
        devComments:
          userRole === "PD Dev" ? (
            <input
              type="text"
              value={answers[`devComments${index + 1}`] || ""}
              name={`devComments${index + 1}`}
              onChange={(e) => {
                const { name, value } = e.target;
                setAnswers((prevAnswers) => ({
                  ...prevAnswers,
                  [name]: value,
                }));
              }}
            />
          ) : (
            <div className="shaded-column">
              <span>{pdDevCommentsValueString || "NA"}</span>
            </div>
          ),
        pdLead:
          userRole === "PD Dev" ? (
            <div className="shaded-column">
              <span>Not Accessible</span>
            </div>
          ) : (
            <div>
              <label>
                <input
                  type="radio"
                  name={`pdLead${index + 1}`}
                  value="YES"
                  checked={answers[`pdLead${index + 1}`] === "YES"}
                  onChange={handleRadioChange}
                />
                YES
              </label>
              <label>
                <input
                  type="radio"
                  name={`pdLead${index + 1}`}
                  value="NO"
                  checked={answers[`pdLead${index + 1}`] === "NO"}
                  onChange={handleRadioChange}
                />
                NO
              </label>
            </div>
          ),
        pdLeadComments:
          userRole === "PD Dev" ? (
            <div className="shaded-column">
              <span>Not Accessible</span>
            </div>
          ) : (
            <input
              type="text"
              value={answers[`pdLeadComments${index + 1}`] || ""}
              name={`pdLeadComments${index + 1}`}
              onChange={(e) => {
                const { name, value } = e.target;
                setAnswers((prevAnswers) => ({
                  ...prevAnswers,
                  [name]: value,
                }));
              }}
            />
          ),
      };

      return row;
    });
  }, [answers, userRole, pdDevData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Question",
        accessor: "question",
        show: true,
      },
      {
        Header: "Data",
        accessor: "data",
        show: true,
      },
      {
        Header: "PD-dev",
        accessor: "pdDev",
        show: userRole === "PD Dev" || userRole === "PD Lead",
      },
      {
        Header: "Dev-Comments",
        accessor: "devComments",
        show: userRole === "PD Dev" || userRole === "PD Lead",
      },
      {
        Header: "PD Lead",
        accessor: "pdLead",
        show: true,
      },
      {
        Header: "PD-Lead-Comments",
        accessor: "pdLeadComments",
        show: true,
      },
    ],
    [userRole]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    
    const percentage = calculatePercentage();

    try {
      const pdDevAnswers = Object.fromEntries(
        Object.entries(answers).filter(([key]) => key.startsWith("pdDev"))
      );

      const devCommentsAnswers = Object.fromEntries(
        Object.entries(answers).filter(([key]) => key.startsWith("devComments"))
      );

      const pdLeadAnswers = Object.fromEntries(
        Object.entries(answers).filter(([key]) => key.startsWith("pdLead"))
      );

      const pdLeadCommentsAnswers = Object.fromEntries(
        Object.entries(answers).filter(([key]) =>
          key.startsWith("pdLeadComments")
        )
      );

      const requestBody = {
        userRole,
        answers: {
          pdDev: pdDevAnswers,
          devComments: devCommentsAnswers,
          pdLead: pdLeadAnswers,
          pdLeadComments: pdLeadCommentsAnswers,
        },
        questions,
      };

      await axios.post(
        `${Backendapi.REACT_APP_BACKEND_API_URL}/api/postchecklist`,
        requestBody
      );

      // If the form submission is successful, navigate to the "preSynthesisReport" page
      navigate('/postSynthesisReport', { state: { percentage } });

      toast.success(`Submitted! Percentage: ${percentage}%`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      
    } catch (error) {
      console.error("Error submitting the checklist:", error);
      toast.error("Error submitting the checklist.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
   
  };

  return (
    <div>
      <div>
        <div className="checklist-left">
          <h1>PRE-SYNTHESIS CHECKLIST</h1>

          <p className="user-role" style={{ textAlign: "left" }}>
            You are: {location.state?.role}
          </p>

          <form className="checklistForm" onSubmit={handleFormSubmit}>
            <table className="checklist-table" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(
                      (column) =>
                        column.show && (
                          <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        )
                    )}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);

                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(
                        (cell) =>
                          cell.column.show && (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          )
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="button-container">
              <button className="submit-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostChecklistPage;
