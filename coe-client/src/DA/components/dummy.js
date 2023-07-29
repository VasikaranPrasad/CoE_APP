// import React, { useState } from "react";

// import "./DA.css";

// import { useTable } from "react-table";

// import { toast, ToastContainer } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({
//     question1: false,

//     question2: false,

//     question3: false,

//     question4: false,

//     question5: false,

//     question6: false,

//     question7: false,

//     question8: false,

//     question9: false,

//     question10: false,
//   });

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;

//     if (name === "checkAll") {
//       setAnswers((prevAnswers) => {
//         const newAnswers = { ...prevAnswers };

//         Object.keys(newAnswers).forEach((question) => {
//           newAnswers[question] = checked;
//         });

//         return newAnswers;
//       });
//     } else {
//       setAnswers((prevAnswers) => ({
//         ...prevAnswers,

//         [name]: checked,
//       }));
//     }
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = Object.keys(answers).length;

//     const answeredQuestions = Object.values(answers).filter(
//       (value) => value
//     ).length;

//     return (answeredQuestions / totalQuestions) * 100;
//   };

//   const data = React.useMemo(
//     () => [
//       {
//         question: (
//           <label>
//             <input
//               type="checkbox"
//               name="question1"
//               checked={answers.question1}
//               onChange={handleCheckboxChange}
//             />
//             Are logical and physical libraries available for all the standard
//             cells and macros?
//           </label>
//         ),

//         status: answers.question1 ? "Yes" : "No",
//       },

//       {
//         question: (
//           <label>
//             <input
//               type="checkbox"
//               name="question2"
//               checked={answers.question2}
//               onChange={handleCheckboxChange}
//             />
//             Are latest version of libraries available?
//           </label>
//         ),

//         status: answers.question2 ? "Yes" : "No",
//       },

//       {
//         question: (
//           <label>
//             <input
//               type="checkbox"
//               name="question3"
//               checked={answers.question3}
//               onChange={handleCheckboxChange}
//             />
//             Are all the std cells and macros in the library DRC, LVS clean?
//           </label>
//         ),

//         status: answers.question3 ? "Yes" : "No",
//       },

//       {
//         question: (
//           <label>
//             <input
//               type="checkbox"
//               name="question4"
//               checked={answers.question4}
//               onChange={handleCheckboxChange}
//             />
//             Are Decap cell available?
//           </label>
//         ),

//         status: answers.question4 ? "Yes" : "No",
//       },

//       {
//         question: (
//           <label>
//             <input
//               type="checkbox"
//               name="question5"
//               checked={answers.question5}
//               onChange={handleCheckboxChange}
//             />
//             Are Tie high/low cells available?
//           </label>
//         ),

//         status: answers.question5 ? "Yes" : "No",
//       },

//       {
//         question: (
//           <label>
//             <input
//               type="checkbox"
//               name="question6"
//               checked={answers.question6}
//               onChange={handleCheckboxChange}
//             />
//             Are all tap cells and pitch available?
//           </label>
//         ),

//         status: answers.question6 ? "Yes" : "No",
//       },

//       {
//         question: (
//           <label>
//             <input
//               type="checkbox"
//               name="question7"
//               checked={answers.question7}
//               onChange={handleCheckboxChange}
//             />
//             Are endcap & corner cells available?
//           </label>
//         ),

//         status: answers.question7 ? "Yes" : "No",
//       },

//       {
//         question: (
//           <label>
//             <input
//               type="checkbox"
//               name="question8"
//               checked={answers.question8}
//               onChange={handleCheckboxChange}
//             />
//             Are power switches available?
//           </label>
//         ),

//         status: answers.question8 ? "Yes" : "No",
//       },

//       {
//         question: (
//           <label>
//             <input
//               type="checkbox"
//               name="question9"
//               checked={answers.question9}
//               onChange={handleCheckboxChange}
//             />
//             Are all the required and PVT corners for implementation available in
//             the library?
//           </label>
//         ),

//         status: answers.question9 ? "Yes" : "No",
//       },

//       {
//         question: (
//           <label>
//             <input
//               type="checkbox"
//               name="question10"
//               checked={answers.question10}
//               onChange={handleCheckboxChange}
//             />
//             Are multi VT cells like HVT,LVT, and SVT available?
//           </label>
//         ),

//         status: answers.question10 ? "Yes" : "No",
//       },

//       // Add more questions and their statuses here
//     ],

//     [answers]
//   );

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Question",

//         accessor: "question",
//       },

//       {
//         Header: "Status",

//         accessor: "status",

//         Cell: ({ value }) => (
//           <span style={{ color: value === "Yes" ? "green" : "red" }}>
//             {value}
//           </span>
//         ),
//       },
//     ],

//     []
//   );

//   const {
//     getTableProps,

//     getTableBodyProps,

//     headerGroups,

//     rows,

//     prepareRow,
//   } = useTable({ columns, data });

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const percentage = calculatePercentage();

//     toast.success(`Submitted! Percentage: ${percentage.toFixed(2)}%`, {
//       position: toast.POSITION.TOP_RIGHT,
//     });
//   };

//   return (
//     <div>
//       <ToastContainer />

//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST </h1>
//           <h2>    .</h2>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map((column) => (
//                       <th {...column.getHeaderProps()}>
//                         {column.render("Header")}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map((cell) => (
//                         <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                       ))}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <button className="CheckListButton" type="submit">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;

//second changes

// import React, { useState } from "react";
// import { useTable } from "react-table";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import questions from "./config";
// import "./DA.css";

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({
//     pdDev: {},
//     pdLead: {},
//   });

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;

//     if (name.startsWith("pdDev")) {
//       setAnswers((prevAnswers) => ({
//         ...prevAnswers,
//         pdDev: {
//           ...prevAnswers.pdDev,
//           [name]: checked ? "YES" : "",
//         },
//       }));
//     } else if (name.startsWith("pdLead")) {
//       setAnswers((prevAnswers) => ({
//         ...prevAnswers,
//         pdLead: {
//           ...prevAnswers.pdLead,
//           [name]: checked ? "YES" : "",
//         },
//       }));
//     } else if (name.endsWith("_NO")) {
//       const originalName = name.replace("_NO", "");
//       setAnswers((prevAnswers) => ({
//         ...prevAnswers,
//         pdDev: {
//           ...prevAnswers.pdDev,
//           [originalName]: checked ? "" : "YES",
//         },
//         pdLead: {
//           ...prevAnswers.pdLead,
//           [originalName]: checked ? "" : "YES",
//         },
//       }));
//     } else {
//       setAnswers((prevAnswers) => ({
//         ...prevAnswers,
//         [name]: checked,
//       }));
//     }
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = questions.length;

//     const answeredQuestions = Object.values(answers).reduce((count, value) => {
//       if (typeof value === "object") {
//         if (Object.values(value).includes("YES")) {
//           return count + 1;
//         }
//       } else if (value === true) {
//         return count + 1;
//       }
//       return count;
//     }, 0);

//     const percentage = (answeredQuestions / totalQuestions) * 100;

//     return percentage.toFixed(2);
//   };

//   const data = React.useMemo(
//     () =>
//       questions.map((question, index) => ({
//         question: question.text,
//         data: <button className="NAButton">NA</button>,
//         pdDev: (
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 name={`pdDev${index + 1}`}
//                 checked={answers.pdDev[`pdDev${index + 1}`] === "YES"}
//                 onChange={handleCheckboxChange}
//               />
//               YES
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name={`pdDev${index + 1}_NO`}
//                 onChange={handleCheckboxChange}
//               />
//               NO
//             </label>
//           </div>
//         ),
//         devComments: (
//           <input
//             type="text"
//             value={answers[`devComments${index + 1}`] || ""}
//             name={`devComments${index + 1}`}
//             onChange={(e) => {
//               const { name, value } = e.target;
//               setAnswers((prevAnswers) => ({
//                 ...prevAnswers,
//                 [name]: value,
//               }));
//             }}
//           />
//         ),
//         pdLead: (
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 name={`pdLead${index + 1}`}
//                 checked={answers.pdLead[`pdLead${index + 1}`] === "YES"}
//                 onChange={handleCheckboxChange}
//               />
//               YES
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name={`pdLead${index + 1}_NO`}
//                 onChange={handleCheckboxChange}
//               />
//               NO
//             </label>
//           </div>
//         ),
//         pdLeadComments: (
//           <input
//             type="text"
//             value={answers[`pdLeadComments${index + 1}`] || ""}
//             name={`pdLeadComments${index + 1}`}
//             onChange={(e) => {
//               const { name, value } = e.target;
//               setAnswers((prevAnswers) => ({
//                 ...prevAnswers,
//                 [name]: value,
//               }));
//             }}
//           />
//         ),
//       })),
//     [answers]
//   );

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Question",
//         accessor: "question",
//       },
//       {
//         Header: "Data",
//         accessor: "data",
//       },
//       {
//         Header: "PD-dev",
//         accessor: "pdDev",
//       },
//       {
//         Header: "Dev-Comments",
//         accessor: "devComments",
//       },
//       {
//         Header: "PD Lead",
//         accessor: "pdLead",
//       },
//       {
//         Header: "PD-Lead-Comments",
//         accessor: "pdLeadComments",
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({ columns, data });

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const percentage = calculatePercentage();

//     toast.success(`Submitted! Percentage: ${percentage}%`, {
//       position: toast.POSITION.TOP_RIGHT,
//     });
//   };

//   return (
//     <div>
//       {/* <ToastContainer /> */}

//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST</h1>
//           <h2>.</h2>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map((column) => (
//                       <th {...column.getHeaderProps()}>
//                         {column.render("Header")}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map((cell) => (
//                         <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                       ))}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <button className="CheckListButton" type="submit">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;

//Third code

// import React, { useState } from "react";
// import { useTable } from "react-table";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import questions from "./config";
// import "./DA.css";
// import { useLocation } from "react-router-dom";

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({
//     pdDev: {},
//     pdLead: {},
//   });

//   const location = useLocation(); // Use the useLocation hook to access the location object

//   const handleRadioChange = (e) => {
//     const { name, value } = e.target;

//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       pdDev: {
//         ...prevAnswers.pdDev,
//         [name]: value,
//       },
//       pdLead: {
//         ...prevAnswers.pdLead,
//         [name]: value,
//       },
//     }));
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = questions.length;
//     const percentagePerQuestion = 50 / totalQuestions;

//     const answeredQuestions = Object.values(answers).reduce((count, value) => {
//       if (typeof value === "object") {
//         const selectedCount = Object.values(value).filter(
//           (answer) => answer === "YES"
//         ).length;
//         return count + selectedCount;
//       } else if (value === "YES") {
//         return count + 1;
//       }
//       return count;
//     }, 0);

//     const percentage = answeredQuestions * percentagePerQuestion;

//     return percentage.toFixed(2);
//   };

//   const data = React.useMemo(
//     () =>
//       questions.map((question, index) => ({
//         question: question.text,
//         data: <button className="NAButton">NA</button>,
//         pdDev: (
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdDev${index + 1}`}
//                 value="YES"
//                 checked={answers.pdDev[`pdDev${index + 1}`] === "YES"}
//                 onChange={handleRadioChange}
//               />
//               YES
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdDev${index + 1}`}
//                 value="NO"
//                 checked={answers.pdDev[`pdDev${index + 1}`] === "NO"}
//                 onChange={handleRadioChange}
//               />
//               NO
//             </label>
//           </div>
//         ),
//         devComments: (
//           <input
//             type="text"
//             value={answers[`devComments${index + 1}`] || ""}
//             name={`devComments${index + 1}`}
//             onChange={(e) => {
//               const { name, value } = e.target;
//               setAnswers((prevAnswers) => ({
//                 ...prevAnswers,
//                 [name]: value,
//               }));
//             }}
//           />
//         ),
//         pdLead: (
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdLead${index + 1}`}
//                 value="YES"
//                 checked={answers.pdLead[`pdLead${index + 1}`] === "YES"}
//                 onChange={handleRadioChange}
//               />
//               YES
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdLead${index + 1}`}
//                 value="NO"
//                 checked={answers.pdLead[`pdLead${index + 1}`] === "NO"}
//                 onChange={handleRadioChange}
//               />
//               NO
//             </label>
//           </div>
//         ),
//         pdLeadComments: (
//           <input
//             type="text"
//             value={answers[`pdLeadComments${index + 1}`] || ""}
//             name={`pdLeadComments${index + 1}`}
//             onChange={(e) => {
//               const { name, value } = e.target;
//               setAnswers((prevAnswers) => ({
//                 ...prevAnswers,
//                 [name]: value,
//               }));
//             }}
//           />
//         ),
//       })),
//     [answers]
//   );

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Question",
//         accessor: "question",
//       },
//       {
//         Header: "Data",
//         accessor: "data",
//       },
//       {
//         Header: "PD-dev",
//         accessor: "pdDev",
//       },
//       {
//         Header: "Dev-Comments",
//         accessor: "devComments",
//       },
//       {
//         Header: "PD Lead",
//         accessor: "pdLead",
//       },
//       {
//         Header: "PD-Lead-Comments",
//         accessor: "pdLeadComments",
//       },
//     ],
//     []
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const percentage = calculatePercentage();

//     toast.success(`Submitted! Percentage: ${percentage}%`, {
//       position: toast.POSITION.TOP_RIGHT,
//     });
//   };

//   return (
//     <div>
//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST</h1>

//          {/* Display the user's role */}
//          <p className="user-role">{location.state?.role}</p>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map((column) => (
//                       <th {...column.getHeaderProps()}>
//                         {column.render("Header")}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map((cell) => (
//                         <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                       ))}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="button-container">
//               <button className="submit-button" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;

// import React, { useState, useEffect } from "react";
// import { useTable } from "react-table";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import questions from "./config";
// import "./DA.css";
// import { useLocation } from "react-router-dom";

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({
//     pdDev: {},
//     pdLead: {},
//   });

//   const location = useLocation(); // Use the useLocation hook to access the location object
//   const userRole = location.state?.role; // Access the user's role from location.state

//   const handleRadioChange = (e) => {
//     const { name, value } = e.target;

//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       pdDev: {
//         ...prevAnswers.pdDev,
//         [name]: value,
//       },
//       pdLead: {
//         ...prevAnswers.pdLead,
//         [name]: value,
//       },
//     }));
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = questions.length;
//     const percentagePerQuestion = 50 / totalQuestions;

//     const answeredQuestions = Object.values(answers).reduce((count, value) => {
//       if (typeof value === "object") {
//         const selectedCount = Object.values(value).filter(
//           (answer) => answer === "YES"
//         ).length;
//         return count + selectedCount;
//       } else if (value === "YES") {
//         return count + 1;
//       }
//       return count;
//     }, 0);

//     const percentage = answeredQuestions * percentagePerQuestion;

//     return percentage.toFixed(2);
//   };

//   const data = React.useMemo(
//     () =>
//       questions.map((question, index) => {
//         const row = {
//           question: question.text,
//           data: <button className="NAButton">NA</button>,
//           pdDev: (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="YES"
//                   checked={answers.pdDev[`pdDev${index + 1}`] === "YES"}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="NO"
//                   checked={answers.pdDev[`pdDev${index + 1}`] === "NO"}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ),
//           devComments: (
//             <input
//               type="text"
//               value={answers[`devComments${index + 1}`] || ""}
//               name={`devComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ),
//           pdLead: (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdLead${index + 1}`}
//                   value="YES"
//                   checked={answers.pdLead[`pdLead${index + 1}`] === "YES"}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdLead${index + 1}`}
//                   value="NO"
//                   checked={answers.pdLead[`pdLead${index + 1}`] === "NO"}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ),
//           pdLeadComments: (
//             <input
//               type="text"
//               value={answers[`pdLeadComments${index + 1}`] || ""}
//               name={`pdLeadComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ),
//         };

//         // Condition 1: PD Dev can access only certain columns
//         if (userRole === "PD Dev") {
//           row.pdLead = null;
//           row.pdLeadComments = null;
//         }

//         // Condition 2: PD Lead can access only certain columns
//         if (userRole === "PD Lead") {
//           row.pdDev = null;
//           row.devComments = null;
//         }

//         return row;
//       }),
//     [answers, userRole]
//   );

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Question",
//         accessor: "question",
//         // Condition 1: PD Dev can access Question and Data columns
//         // Condition 2: PD Lead can access Question and Data columns
//         show: userRole === "PD Dev" || userRole === "PD Lead",
//       },
//       {
//         Header: "Data",
//         accessor: "data",
//         // Condition 1: PD Dev can access Question and Data columns
//         // Condition 2: PD Lead can access Question and Data columns
//         show: userRole === "PD Dev" || userRole === "PD Lead",
//       },
//       {
//         Header: "PD-dev",
//         accessor: "pdDev",
//         // Condition 1: PD Dev can access PD-dev column
//         show: userRole === "PD Dev",
//       },
//       {
//         Header: "Dev-Comments",
//         accessor: "devComments",
//         // Condition 1: PD Dev can access Dev-Comments column
//         show: userRole === "PD Dev",
//       },
//       {
//         Header: "PD Lead",
//         accessor: "pdLead",
//         // Condition 2: PD Lead can access PD Lead column
//         show: userRole === "PD Lead",
//       },
//       {
//         Header: "PD-Lead-Comments",
//         accessor: "pdLeadComments",
//         // Condition 2: PD Lead can access PD-Lead-Comments column
//         show: userRole === "PD Lead",
//       },
//     ],
//     [userRole]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const percentage = calculatePercentage();

//     toast.success(`Submitted! Percentage: ${percentage}%`, {
//       position: toast.POSITION.TOP_RIGHT,
//     });
//   };

//   return (
//     <div>
//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST</h1>

//           {/* Display the user's role */}
//           <p className="user-role">{location.state?.role}</p>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map(
//                       (column) =>
//                         column.show && (
//                           <th {...column.getHeaderProps()}>
//                             {column.render("Header")}
//                           </th>
//                         )
//                     )}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map(
//                         (cell) =>
//                           cell.column.show && (
//                             <td {...cell.getCellProps()}>
//                               {cell.render("Cell")}
//                             </td>
//                           )
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="button-container">
//               <button className="submit-button" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;

//Hidding code

// import React, { useState, useEffect } from "react";
// import { useTable } from "react-table";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import questions from "./config";
// import "./DA.css";
// import { useLocation } from "react-router-dom";

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({
//     pdDev: {},
//     pdLead: {},
//   });

//   const location = useLocation(); // Use the useLocation hook to access the location object
//   const userRole = location.state?.role; // Access the user's role from location.state

//   const handleRadioChange = (e) => {
//     const { name, value } = e.target;

//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       pdDev: {
//         ...prevAnswers.pdDev,
//         [name]: value,
//       },
//       pdLead: {
//         ...prevAnswers.pdLead,
//         [name]: value,
//       },
//     }));
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = questions.length;
//     const percentagePerQuestion = 50 / totalQuestions;

//     const answeredQuestions = Object.values(answers).reduce((count, value) => {
//       if (typeof value === "object") {
//         const selectedCount = Object.values(value).filter(
//           (answer) => answer === "YES"
//         ).length;
//         return count + selectedCount;
//       } else if (value === "YES") {
//         return count + 1;
//       }
//       return count;
//     }, 0);

//     const percentage = answeredQuestions * percentagePerQuestion;

//     return percentage.toFixed(2);
//   };

//   const data = React.useMemo(
//     () =>
//       questions.map((question, index) => {
//         const row = {
//           question: question.text,
//           data: <button className="NAButton">NA</button>,
//           pdDev: (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="YES"
//                   checked={answers.pdDev[`pdDev${index + 1}`] === "YES"}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="NO"
//                   checked={answers.pdDev[`pdDev${index + 1}`] === "NO"}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ),
//           devComments: (
//             <input
//               type="text"
//               value={answers[`devComments${index + 1}`] || ""}
//               name={`devComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ),
//           pdLead: (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdLead${index + 1}`}
//                   value="YES"
//                   checked={answers.pdLead[`pdLead${index + 1}`] === "YES"}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdLead${index + 1}`}
//                   value="NO"
//                   checked={answers.pdLead[`pdLead${index + 1}`] === "NO"}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ),
//           pdLeadComments: (
//             <input
//               type="text"
//               value={answers[`pdLeadComments${index + 1}`] || ""}
//               name={`pdLeadComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ),
//         };

//         // Condition 1: PD Dev can access only certain columns
//         if (userRole === "PD Dev") {
//           row.pdLead = (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           );
//           row.pdLeadComments = (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           );
//         }

//         // Condition 2: PD Lead can access only certain columns
//         if (userRole === "PD Lead") {
//           row.pdDev = (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           );
//           row.devComments = (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           );
//         }

//         return row;
//       }),
//     [answers, userRole]
//   );

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Question",
//         accessor: "question",
//         // Condition 1: PD Dev can access Question and Data columns
//         // Condition 2: PD Lead can access Question and Data columns
//         show: userRole === "PD Dev" || userRole === "PD Lead",
//       },
//       {
//         Header: "Data",
//         accessor: "data",
//         // Condition 1: PD Dev can access Question and Data columns
//         // Condition 2: PD Lead can access Question and Data columns
//         show: userRole === "PD Dev" || userRole === "PD Lead",
//       },
//       {
//         Header: "PD-dev",
//         accessor: "pdDev",
//         // Condition 1: PD Dev can access PD-dev column
//         show: userRole === "PD Dev",
//       },
//       {
//         Header: "Dev-Comments",
//         accessor: "devComments",
//         // Condition 1: PD Dev can access Dev-Comments column
//         show: userRole === "PD Dev",
//       },
//       {
//         Header: "PD Lead",
//         accessor: "pdLead",
//         // Condition 2: PD Lead can access PD Lead column
//         show: userRole === "PD Lead",
//       },
//       {
//         Header: "PD-Lead-Comments",
//         accessor: "pdLeadComments",
//         // Condition 2: PD Lead can access PD-Lead-Comments column
//         show: userRole === "PD Lead",
//       },
//     ],
//     [userRole]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const percentage = calculatePercentage();

//     toast.success(`Submitted! Percentage: ${percentage}%`, {
//       position: toast.POSITION.TOP_RIGHT,
//     });
//   };

//   return (
//     <div>
//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST</h1>

//           {/* Display the user's role */}
//           <p className="user-role">{location.state?.role}</p>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map(
//                       (column) =>
//                         column.show && (
//                           <th {...column.getHeaderProps()}>
//                             {column.render("Header")}
//                           </th>
//                         )
//                     )}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map(
//                         (cell) =>
//                           cell.column.show && (
//                             <td {...cell.getCellProps()}>
//                               {cell.render("Cell")}
//                             </td>
//                           )
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="button-container">
//               <button className="submit-button" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;

import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import questions from "./config";
import "./DA.css";
import { useLocation } from "react-router-dom";

function ChecklistPage() {
  const [answers, setAnswers] = useState({
    pdDev: {},
    pdLead: {},
  });

  const location = useLocation(); // Use the useLocation hook to access the location object
  const userRole = location.state?.role; // Access the user's role from location.state

  const handleRadioChange = (e) => {
    const { name, value } = e.target;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      pdDev: {
        ...prevAnswers.pdDev,
        [name]: value,
      },
      pdLead: {
        ...prevAnswers.pdLead,
        [name]: value,
      },
    }));
  };

  const calculatePercentage = () => {
    const totalQuestions = questions.length;
    const percentagePerQuestion = 50 / totalQuestions;

    const answeredQuestions = Object.values(answers).reduce((count, value) => {
      if (typeof value === "object") {
        const selectedCount = Object.values(value).filter(
          (answer) => answer === "YES"
        ).length;
        return count + selectedCount;
      } else if (value === "YES") {
        return count + 1;
      }
      return count;
    }, 0);

    const percentage = answeredQuestions * percentagePerQuestion;

    return percentage.toFixed(2);
  };
  const data = React.useMemo(
    () =>
      questions.map((question, index) => {
        const row = {
          question: question.text,
          data: <button className="NAButton">NA</button>,
          pdDev: (
            <div>
              <label>
                <input
                  type="radio"
                  name={`pdDev${index + 1}`}
                  value="YES"
                  checked={answers.pdDev[`pdDev${index + 1}`] === "YES"}
                  onChange={handleRadioChange}
                />
                YES
              </label>
              <label>
                <input
                  type="radio"
                  name={`pdDev${index + 1}`}
                  value="NO"
                  checked={answers.pdDev[`pdDev${index + 1}`] === "NO"}
                  onChange={handleRadioChange}
                />
                NO
              </label>
            </div>
          ),
          devComments: (
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
          ),
          pdLead: (
            <div>
              <label>
                <input
                  type="radio"
                  name={`pdLead${index + 1}`}
                  value="YES"
                  checked={answers.pdLead[`pdLead${index + 1}`] === "YES"}
                  onChange={handleRadioChange}
                />
                YES
              </label>
              <label>
                <input
                  type="radio"
                  name={`pdLead${index + 1}`}
                  value="NO"
                  checked={answers.pdLead[`pdLead${index + 1}`] === "NO"}
                  onChange={handleRadioChange}
                />
                NO
              </label>
            </div>
          ),
          pdLeadComments: (
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

        // Condition 1: PD Dev can access only certain columns
        if (userRole === "PD Dev") {
          row.pdLead = (
            <div className="shaded-column">
              <span>Not Accessible</span>
            </div>
          );
          row.pdLeadComments = (
            <div className="shaded-column">
              <span>Not Accessible</span>
            </div>
          );
        } else if (userRole === "PD Lead") {
          row.pdDev = (
            <div className="shaded-column">
              <span>Not Accessible</span>
            </div>
          );
          row.devComments = (
            <div className="shaded-column">
              <span>Not Accessible</span>
            </div>
          );
        }

        return row;
      }),
    [answers, userRole]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Question",
        accessor: "question",
        show: true, // Show the Question column for all users
      },
      {
        Header: "Data",
        accessor: "data",
        show: true, // Show the Data column for all users
      },
      {
        Header: "PD-dev",
        accessor: "pdDev",
        show: userRole === "PD Dev" || userRole === "PD Lead", // Show the PD-dev column for PD Dev and PD Lead
      },
      {
        Header: "Dev-Comments",
        accessor: "devComments",
        show: userRole === "PD Dev" || userRole === "PD Lead", // Show the Dev-Comments column for PD Dev and PD Lead
      },
      {
        Header: "PD Lead",
        accessor: "pdLead",
        show: true, // Show the PD Lead column for all users
      },
      {
        Header: "PD-Lead-Comments",
        accessor: "pdLeadComments",
        show: true, // Show the PD-Lead-Comments column for all users
      },
    ],
    [userRole]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const percentage = calculatePercentage();

    toast.success(`Submitted! Percentage: ${percentage}%`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div>
      <div>
        <div className="checklist-left">
          <h1>PRE-SYNTHESIS CHECKLIST</h1>

          {/* Display the user's role */}
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

export default ChecklistPage;




// working code 

import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import questions from "./config";
import "./DA.css";
import { useLocation } from "react-router-dom";

function ChecklistPage() {
  const [answers, setAnswers] = useState({
    pdDev: {},
    pdLead: {},
    question:{}
  });

  const location = useLocation(); // Use the useLocation hook to access the location object
  const userRole = location.state?.role; // Access the user's role from location.state

  const handleRadioChange = (e) => {
    const { name, value } = e.target;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      pdDev: {
        ...prevAnswers.pdDev,
        [name]: value,
      },
      pdLead: {
        ...prevAnswers.pdLead,
        [name]: value,
      },
      question:{
        ...prevAnswers.question,
        [name]: value,
      }
    }));
  };

  const calculatePercentage = () => {
    const totalQuestions = questions.length;
    const percentagePerQuestion = 45 / totalQuestions;

    const answeredQuestions = Object.values(answers).reduce((count, value) => {
      if (typeof value === "object") {
        const selectedCount = Object.values(value).filter(
          (answer) => answer === "YES"
        ).length;
        return count + selectedCount;
      } else if (value === "YES") {
        return count + 1;
      }
      return count;
    }, 0);

    const percentage = answeredQuestions * percentagePerQuestion;

    return percentage.toFixed(2);
  };
  // const data = React.useMemo(
  //   () =>
  //     questions.map((question, index) => {
  //       const row = {
  //         question: question.text,
  //         data: <button className="NAButton">NA</button>,
  //         pdDev: (
  //           <div>
  //             <label>
  //               <input
  //                 type="radio"
  //                 name={`pdDev${index + 1}`}
  //                 value="YES"
  //                 checked={answers.pdDev[`pdDev${index + 1}`] === "YES"}
  //                 onChange={handleRadioChange}
  //               />
  //               YES
  //             </label>
  //             <label>
  //               <input
  //                 type="radio"
  //                 name={`pdDev${index + 1}`}
  //                 value="NO"
  //                 checked={answers.pdDev[`pdDev${index + 1}`] === "NO"}
  //                 onChange={handleRadioChange}
  //               />
  //               NO
  //             </label>
  //           </div>
  //         ),
  //         devComments: (
  //           <input
  //             type="text"
  //             value={answers[`devComments${index + 1}`] || ""}
  //             name={`devComments${index + 1}`}
  //             onChange={(e) => {
  //               const { name, value } = e.target;
  //               setAnswers((prevAnswers) => ({
  //                 ...prevAnswers,
  //                 [name]: value,
  //               }));
  //             }}
  //           />
  //         ),
  //         pdLead: (
  //           <div>
  //             <label>
  //               <input
  //                 type="radio"
  //                 name={`pdLead${index + 1}`}
  //                 value="YES"
  //                 checked={answers.pdLead[`pdLead${index + 1}`] === "YES"}
  //                 onChange={handleRadioChange}
  //               />
  //               YES
  //             </label>
  //             <label>
  //               <input
  //                 type="radio"
  //                 name={`pdLead${index + 1}`}
  //                 value="NO"
  //                 checked={answers.pdLead[`pdLead${index + 1}`] === "NO"}
  //                 onChange={handleRadioChange}
  //               />
  //               NO
  //             </label>
  //           </div>
  //         ),
  //         pdLeadComments: (
  //           <input
  //             type="text"
  //             value={answers[`pdLeadComments${index + 1}`] || ""}
  //             name={`pdLeadComments${index + 1}`}
  //             onChange={(e) => {
  //               const { name, value } = e.target;
  //               setAnswers((prevAnswers) => ({
  //                 ...prevAnswers,
  //                 [name]: value,
  //               }));
  //             }}
  //           />
  //         ),
  //       };

  //       // Condition 1: PD Dev can access only certain columns
  //       if (userRole === "PD Dev") {
  //         row.pdLead = (
  //           <div className="shaded-column">
  //             <span>Not Accessible</span>
  //           </div>
  //         );
  //         row.pdLeadComments = (
  //           <div className="shaded-column">
  //             <span>Not Accessible</span>
  //           </div>
  //         );
  //       } else if (userRole === "PD Lead") {
  //         row.pdDev = (
  //           <div className="shaded-column">
  //             <span>Not Accessible</span>
  //           </div>
  //         );
  //         row.devComments = (
  //           <div className="shaded-column">
  //             <span>Not Accessible</span>
  //           </div>
  //         );
  //       }

  //       return row;
  //     }),
  //   [answers, userRole]
  // );


  const data = React.useMemo(() => {
    return questions.map((question, index) => {
      const row = {
        question: question.text,
        data: <button className="NAButton">NA</button>,
        pdDev: (
          <div>
            <label>
              <input
                type="radio"
                name={`pdDev${index + 1}`}
                value="YES"
                checked={answers.pdDev[`pdDev${index + 1}`] === "YES"}
                onChange={handleRadioChange}
              />
              YES
            </label>
            <label>
              <input
                type="radio"
                name={`pdDev${index + 1}`}
                value="NO"
                checked={answers.pdDev[`pdDev${index + 1}`] === "NO"}
                onChange={handleRadioChange}
              />
              NO
            </label>
          </div>
        ),
        devComments: (
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
        ),
        pdLead: (
          <div>
            <label>
              <input
                type="radio"
                name={`pdLead${index + 1}`}
                value="YES"
                checked={answers.pdLead[`pdLead${index + 1}`] === "YES"}
                onChange={handleRadioChange}
              />
              YES
            </label>
            <label>
              <input
                type="radio"
                name={`pdLead${index + 1}`}
                value="NO"
                checked={answers.pdLead[`pdLead${index + 1}`] === "NO"}
                onChange={handleRadioChange}
              />
              NO
            </label>
          </div>
        ),
        pdLeadComments: (
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
  
      if (userRole === "PD Dev") {
        row.pdLead = (
          <div className="shaded-column">
            <span>Not Accessible</span>
          </div>
        );
        row.pdLeadComments = (
          <div className="shaded-column">
            <span>Not Accessible</span>
          </div>
        );
      } else if (userRole === "PD Lead") {
        row.pdDev = (
          <div className="shaded-column">
            <span>Not Accessible</span>
          </div>
        );
        row.devComments = (
          <div className="shaded-column">
            <span>Not Accessible</span>
          </div>
        );
      }
  
      return row;
    });
  }, [answers, userRole]);

  
  const columns = React.useMemo(
    () => [
      {
        Header: "Question",
        accessor: "question",
        show: true, // Show the Question column for all users
      },
      {
        Header: "Data",
        accessor: "data",
        show: true, // Show the Data column for all users
      },
      {
        Header: "PD-dev",
        accessor: "pdDev",
        show: userRole === "PD Dev" || userRole === "PD Lead", // Show the PD-dev column for PD Dev and PD Lead
      },
      {
        Header: "Dev-Comments",
        accessor: "devComments",
        show: userRole === "PD Dev" || userRole === "PD Lead", // Show the Dev-Comments column for PD Dev and PD Lead
      },
      {
        Header: "PD Lead",
        accessor: "pdLead",
        show: true, // Show the PD Lead column for all users
      },
      {
        Header: "PD-Lead-Comments",
        accessor: "pdLeadComments",
        show: true, // Show the PD-Lead-Comments column for all users
      },
    ],
    [userRole]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   const percentage = calculatePercentage();

  //   toast.success(`Submitted! Percentage: ${percentage}%`, {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const percentage = calculatePercentage();
    console.log(answers)
    try {
      const response = await fetch("http://localhost:5000/api/checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

  
      if (response.ok) {
        toast.success(`Submitted! Percentage: ${percentage}%`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Error submitting the checklist.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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

          {/* Display the user's role */}
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

export default ChecklistPage;


//  dynamic question getting code 

import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DA.css";
import { useLocation } from "react-router-dom";
import questions from "./config";

function ChecklistPage() {
  const [answers, setAnswers] = useState({});

  const location = useLocation(); // Use the useLocation hook to access the location object
  const userRole = location.state?.role; // Access the user's role from location.state

  const handleRadioChange = (e) => {
    const { name, value } = e.target;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const calculatePercentage = () => {
    const totalQuestions = Object.keys(answers).length;
    const answeredQuestions = Object.values(answers).filter(
      (value) => value !== undefined
    ).length;
    const percentage = (answeredQuestions / totalQuestions) * 100;

    return percentage.toFixed(2);
  };

  const data = React.useMemo(() => {
    return questions.map((question, index) => {
      const questionIndex = index + 1;
      const row = {
        question: question.text,
        data: <button className="NAButton">NA</button>,
        pdDev:
          userRole === "PD Dev" ? (
            <div>
              <label>
                <input
                  type="radio"
                  name={`pdDev${questionIndex}`}
                  value="YES"
                  checked={answers[`pdDev${questionIndex}`] === "YES"}
                  onChange={handleRadioChange}
                />
                YES
              </label>
              <label>
                <input
                  type="radio"
                  name={`pdDev${questionIndex}`}
                  value="NO"
                  checked={answers[`pdDev${questionIndex}`] === "NO"}
                  onChange={handleRadioChange}
                />
                NO
              </label>
            </div>
          ) : (
            <div className="shaded-column">
              <span>Not Accessible</span>
            </div>
          ),
        devComments:
          userRole === "PD Dev" ? (
            <input
              type="text"
              value={answers[`devComments${questionIndex}`] || ""}
              name={`devComments${questionIndex}`}
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
              <span>Not Accessible</span>
            </div>
          ),
        pdLead:
          userRole === "PD Lead" ? (
            <div>
              <label>
                <input
                  type="radio"
                  name={`pdLead${questionIndex}`}
                  value="YES"
                  checked={answers[`pdLead${questionIndex}`] === "YES"}
                  onChange={handleRadioChange}
                />
                YES
              </label>
              <label>
                <input
                  type="radio"
                  name={`pdLead${questionIndex}`}
                  value="NO"
                  checked={answers[`pdLead${questionIndex}`] === "NO"}
                  onChange={handleRadioChange}
                />
                NO
              </label>
            </div>
          ) : (
            <div className="shaded-column">
              <span>Not Accessible</span>
            </div>
          ),
        pdLeadComments:
          userRole === "PD Lead" ? (
            <input
              type="text"
              value={answers[`pdLeadComments${questionIndex}`] || ""}
              name={`pdLeadComments${questionIndex}`}
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
              <span>Not Accessible</span>
            </div>
          ),
      };

      return row;
    });
  }, [answers, userRole]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Question",
        accessor: "question",
        show: true, // Show the Question column for all users
      },
      {
        Header: "Data",
        accessor: "data",
        show: true, // Show the Data column for all users
      },
      {
        Header: "PD-dev",
        accessor: "pdDev",
        show: userRole === "PD Dev" || userRole === "PD Lead", // Show the PD-dev column for PD Dev and PD Lead
      },
      {
        Header: "Dev-Comments",
        accessor: "devComments",
        show: userRole === "PD Dev" || userRole === "PD Lead", // Show the Dev-Comments column for PD Dev and PD Lead
      },
      {
        Header: "PD Lead",
        accessor: "pdLead",
        show: true, // Show the PD Lead column for all users
      },
      {
        Header: "PD-Lead-Comments",
        accessor: "pdLeadComments",
        show: true, // Show the PD-Lead-Comments column for all users
      },
    ],
    [userRole]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   const percentage = calculatePercentage();

  //   try {
  //     const response = await fetch("http://localhost:5000/api/checklist", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userRole, answers }),
  //     });

  //     if (response.ok) {
  //       toast.success(`Submitted! Percentage: ${percentage}%`, {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     } else {
  //       toast.error("Error submitting the checklist.", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error submitting the checklist:", error);
  //     toast.error("Error submitting the checklist.", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };




  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const transformedAnswers = {};
    Object.entries(answers).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        transformedAnswers[key] = value.join(", "); // Convert array to comma-separated string
      } else {
        transformedAnswers[key] = value;
      }
    });
  
    const percentage = calculatePercentage();
  
    try {
      const response = await fetch("http://localhost:5000/api/checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userRole, answers: transformedAnswers }),
      });
  
      if (response.ok) {
        toast.success(`Submitted! Percentage: ${percentage}%`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Error submitting the checklist.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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

          {/* Display the user's role */}
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

export default ChecklistPage;






const question = JSON.stringify(req.body.questions);




















 // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(answers,questions)
  //   const percentage = calculatePercentage();
        
  //   try {
  //     if (userRole === 'PD Dev') {
  //       await axios.post('http://localhost:5000/api/checklist', {
  //         userRole,
  //         answers,
  //         questions:questions.map(question => question.text),
  //       });
  //     } else if (userRole === 'PD Lead') {
  //       await axios.post('http://localhost:5000/api/checklist/pdlead', {
  //         userRole,
  //         answers,
  //       });
  //     }

  //     toast.success(`Submitted! Percentage: ${percentage}%`, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   } catch (error) {
  //     console.error('Error submitting the checklist:', error);
  //     toast.error('Error submitting the checklist.', {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };












  // const data = React.useMemo(() => {
  //   return questions.map((question, index) => {
  //     const pdDevValue = pdDevData[index]?.pdDev;
  //     const pdDevCommentsValue = pdDevData[index]?.devComments;

  //     const pdDevValueArray = Array.from(pdDevValue || []);
  //     const pdDevValueString = pdDevValueArray.join(', ');

  //     const pdDevCommentsValueArray = Array.from(pdDevCommentsValue || []);
  //     const pdDevCommentsValueString = pdDevCommentsValueArray.join(', ');

  //     const row = {
  //       question: question.text,
  //       data: <button className="NAButton">NA</button>,
  //       pdDev:
  //         userRole === 'PD Dev' ? (
  //           <div>
  //             <label>
  //               <input
  //                 type="radio"
  //                 name={`pdDev${index + 1}`}
  //                 value="YES"
  //                 checked={answers[`pdDev${index + 1}`] === 'YES'}
  //                 onChange={handleRadioChange}
  //               />
  //               YES
  //             </label>
  //             <label>
  //               <input
  //                 type="radio"
  //                 name={`pdDev${index + 1}`}
  //                 value="NO"
  //                 checked={answers[`pdDev${index + 1}`] === 'NO'}
  //                 onChange={handleRadioChange}
  //               />
  //               NO
  //             </label>
  //           </div>
  //         ) : (
  //           <div className="shaded-column">
  //             <span>{pdDevValueString}</span>
  //           </div>
  //         ),
  //       devComments:
  //         userRole === 'PD Dev' ? (
  //           <input
  //             type="text"
  //             value={answers[`devComments${index + 1}`] || ''}
  //             name={`devComments${index + 1}`}
  //             onChange={(e) => {
  //               const { name, value } = e.target;
  //               setAnswers((prevAnswers) => ({
  //                 ...prevAnswers,
  //                 [name]: value,
  //               }));
  //             }}
  //           />
  //         ) : (
  //           <div className="shaded-column">
  //             <span>{pdDevCommentsValueString}</span>
  //           </div>
  //         ),
  //       pdLead:
  //         userRole === 'PD Lead' ? (
  //           <div>
  //             <label>
  //               <input
  //                 type="radio"
  //                 name={`pdLead${index + 1}`}
  //                 value="YES"
  //                 checked={answers[`pdLead${index + 1}`] === 'YES'}
  //                 onChange={handleRadioChange}
  //               />
  //               YES
  //             </label>
  //             <label>
  //               <input
  //                 type="radio"
  //                 name={`pdLead${index + 1}`}
  //                 value="NO"
  //                 checked={answers[`pdLead${index + 1}`] === 'NO'}
  //                 onChange={handleRadioChange}
  //               />
  //               NO
  //             </label>
  //           </div>
  //         ) : (
  //           <div className="shaded-column">
  //             <span>Not Accessible</span>
  //           </div>
  //         ),
  //       pdLeadComments:
  //         userRole === 'PD Lead' ? (
  //           <input
  //             type="text"
  //             value={answers[`pdLeadComments${index + 1}`] || ''}
  //             name={`pdLeadComments${index + 1}`}
  //             onChange={(e) => {
  //               const { name, value } = e.target;
  //               setAnswers((prevAnswers) => ({
  //                 ...prevAnswers,
  //                 [name]: value,
  //               }));
  //             }}
  //           />
  //         ) : (
  //           <div className="shaded-column">
  //             <span>Not Accessible</span>
  //           </div>
  //         ),
  //     };

  //     return row;
  //   });
  // }, [answers, userRole, pdDevData]);





  // import React, { useState, useEffect } from "react";
// import { useTable } from "react-table";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import questions from "./config";
// import "./DA.css";
// import { useLocation } from "react-router-dom";

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({
//     pdDev: {},
//     pdLead: {},
//     question:{}
//   });

//   const location = useLocation(); // Use the useLocation hook to access the location object
//   const userRole = location.state?.role; // Access the user's role from location.state

//   const handleRadioChange = (e) => {
//     const { name, value } = e.target;

//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       pdDev: {
//         ...prevAnswers.pdDev,
//         [name]: value,
//       },
//       pdLead: {
//         ...prevAnswers.pdLead,
//         [name]: value,
//       },
//       question:{
//         ...prevAnswers.question,
//         [name]: value,
//       }
//     }));
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = questions.length;
//     const percentagePerQuestion = 45 / totalQuestions;

//     const answeredQuestions = Object.values(answers).reduce((count, value) => {
//       if (typeof value === "object") {
//         const selectedCount = Object.values(value).filter(
//           (answer) => answer === "YES"
//         ).length;
//         return count + selectedCount;
//       } else if (value === "YES") {
//         return count + 1;
//       }
//       return count;
//     }, 0);

//     const percentage = answeredQuestions * percentagePerQuestion;

//     return percentage.toFixed(2);
//   };
//   // const data = React.useMemo(
//   //   () =>
//   //     questions.map((question, index) => {
//   //       const row = {
//   //         question: question.text,
//   //         data: <button className="NAButton">NA</button>,
//   //         pdDev: (
//   //           <div>
//   //             <label>
//   //               <input
//   //                 type="radio"
//   //                 name={`pdDev${index + 1}`}
//   //                 value="YES"
//   //                 checked={answers.pdDev[`pdDev${index + 1}`] === "YES"}
//   //                 onChange={handleRadioChange}
//   //               />
//   //               YES
//   //             </label>
//   //             <label>
//   //               <input
//   //                 type="radio"
//   //                 name={`pdDev${index + 1}`}
//   //                 value="NO"
//   //                 checked={answers.pdDev[`pdDev${index + 1}`] === "NO"}
//   //                 onChange={handleRadioChange}
//   //               />
//   //               NO
//   //             </label>
//   //           </div>
//   //         ),
//   //         devComments: (
//   //           <input
//   //             type="text"
//   //             value={answers[`devComments${index + 1}`] || ""}
//   //             name={`devComments${index + 1}`}
//   //             onChange={(e) => {
//   //               const { name, value } = e.target;
//   //               setAnswers((prevAnswers) => ({
//   //                 ...prevAnswers,
//   //                 [name]: value,
//   //               }));
//   //             }}
//   //           />
//   //         ),
//   //         pdLead: (
//   //           <div>
//   //             <label>
//   //               <input
//   //                 type="radio"
//   //                 name={`pdLead${index + 1}`}
//   //                 value="YES"
//   //                 checked={answers.pdLead[`pdLead${index + 1}`] === "YES"}
//   //                 onChange={handleRadioChange}
//   //               />
//   //               YES
//   //             </label>
//   //             <label>
//   //               <input
//   //                 type="radio"
//   //                 name={`pdLead${index + 1}`}
//   //                 value="NO"
//   //                 checked={answers.pdLead[`pdLead${index + 1}`] === "NO"}
//   //                 onChange={handleRadioChange}
//   //               />
//   //               NO
//   //             </label>
//   //           </div>
//   //         ),
//   //         pdLeadComments: (
//   //           <input
//   //             type="text"
//   //             value={answers[`pdLeadComments${index + 1}`] || ""}
//   //             name={`pdLeadComments${index + 1}`}
//   //             onChange={(e) => {
//   //               const { name, value } = e.target;
//   //               setAnswers((prevAnswers) => ({
//   //                 ...prevAnswers,
//   //                 [name]: value,
//   //               }));
//   //             }}
//   //           />
//   //         ),
//   //       };

//   //       // Condition 1: PD Dev can access only certain columns
//   //       if (userRole === "PD Dev") {
//   //         row.pdLead = (
//   //           <div className="shaded-column">
//   //             <span>Not Accessible</span>
//   //           </div>
//   //         );
//   //         row.pdLeadComments = (
//   //           <div className="shaded-column">
//   //             <span>Not Accessible</span>
//   //           </div>
//   //         );
//   //       } else if (userRole === "PD Lead") {
//   //         row.pdDev = (
//   //           <div className="shaded-column">
//   //             <span>Not Accessible</span>
//   //           </div>
//   //         );
//   //         row.devComments = (
//   //           <div className="shaded-column">
//   //             <span>Not Accessible</span>
//   //           </div>
//   //         );
//   //       }

//   //       return row;
//   //     }),
//   //   [answers, userRole]
//   // );


//   const data = React.useMemo(() => {
//     return questions.map((question, index) => {
//       const row = {
//         question: question.text,
//         data: <button className="NAButton">NA</button>,
//         pdDev: (
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdDev${index + 1}`}
//                 value="YES"
//                 checked={answers.pdDev[`pdDev${index + 1}`] === "YES"}
//                 onChange={handleRadioChange}
//               />
//               YES
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdDev${index + 1}`}
//                 value="NO"
//                 checked={answers.pdDev[`pdDev${index + 1}`] === "NO"}
//                 onChange={handleRadioChange}
//               />
//               NO
//             </label>
//           </div>
//         ),
//         devComments: (
//           <input
//             type="text"
//             value={answers[`devComments${index + 1}`] || ""}
//             name={`devComments${index + 1}`}
//             onChange={(e) => {
//               const { name, value } = e.target;
//               setAnswers((prevAnswers) => ({
//                 ...prevAnswers,
//                 [name]: value,
//               }));
//             }}
//           />
//         ),
//         pdLead: (
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdLead${index + 1}`}
//                 value="YES"
//                 checked={answers.pdLead[`pdLead${index + 1}`] === "YES"}
//                 onChange={handleRadioChange}
//               />
//               YES
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdLead${index + 1}`}
//                 value="NO"
//                 checked={answers.pdLead[`pdLead${index + 1}`] === "NO"}
//                 onChange={handleRadioChange}
//               />
//               NO
//             </label>
//           </div>
//         ),
//         pdLeadComments: (
//           <input
//             type="text"
//             value={answers[`pdLeadComments${index + 1}`] || ""}
//             name={`pdLeadComments${index + 1}`}
//             onChange={(e) => {
//               const { name, value } = e.target;
//               setAnswers((prevAnswers) => ({
//                 ...prevAnswers,
//                 [name]: value,
//               }));
//             }}
//           />
//         ),
//       };
  
//       if (userRole === "PD Dev") {
//         row.pdLead = (
//           <div className="shaded-column">
//             <span>Not Accessible</span>
//           </div>
//         );
//         row.pdLeadComments = (
//           <div className="shaded-column">
//             <span>Not Accessible</span>
//           </div>
//         );
//       } else if (userRole === "PD Lead") {
//         row.pdDev = (
//           <div className="shaded-column">
//             <span>Not Accessible</span>
//           </div>
//         );
//         row.devComments = (
//           <div className="shaded-column">
//             <span>Not Accessible</span>
//           </div>
//         );
//       }
  
//       return row;
//     });
//   }, [answers, userRole]);

  
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Question",
//         accessor: "question",
//         show: true, // Show the Question column for all users
//       },
//       {
//         Header: "Data",
//         accessor: "data",
//         show: true, // Show the Data column for all users
//       },
//       {
//         Header: "PD-dev",
//         accessor: "pdDev",
//         show: userRole === "PD Dev" || userRole === "PD Lead", // Show the PD-dev column for PD Dev and PD Lead
//       },
//       {
//         Header: "Dev-Comments",
//         accessor: "devComments",
//         show: userRole === "PD Dev" || userRole === "PD Lead", // Show the Dev-Comments column for PD Dev and PD Lead
//       },
//       {
//         Header: "PD Lead",
//         accessor: "pdLead",
//         show: true, // Show the PD Lead column for all users
//       },
//       {
//         Header: "PD-Lead-Comments",
//         accessor: "pdLeadComments",
//         show: true, // Show the PD-Lead-Comments column for all users
//       },
//     ],
//     [userRole]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   // const handleFormSubmit = (e) => {
//   //   e.preventDefault();

//   //   const percentage = calculatePercentage();

//   //   toast.success(`Submitted! Percentage: ${percentage}%`, {
//   //     position: toast.POSITION.TOP_RIGHT,
//   //   });
//   // };


//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
  
//     const percentage = calculatePercentage();
//     console.log(answers)
//     try {
//       const response = await fetch("http://localhost:5000/api/checklist", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(answers),
//       });

  
//       if (response.ok) {
//         toast.success(`Submitted! Percentage: ${percentage}%`, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       } else {
//         toast.error("Error submitting the checklist.", {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting the checklist:", error);
//       toast.error("Error submitting the checklist.", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   };
  




//   return (
//     <div>
//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST</h1>

//           {/* Display the user's role */}
//           <p className="user-role" style={{ textAlign: "left" }}>
//             You are: {location.state?.role}
//           </p>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map(
//                       (column) =>
//                         column.show && (
//                           <th {...column.getHeaderProps()}>
//                             {column.render("Header")}
//                           </th>
//                         )
//                     )}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map(
//                         (cell) =>
//                           cell.column.show && (
//                             <td {...cell.getCellProps()}>
//                               {cell.render("Cell")}
//                             </td>
//                           )
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="button-container">
//               <button className="submit-button" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;

//current working code

// import React, { useState, useEffect } from "react";
// import { useTable } from "react-table";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import questions from "./config";
// import "./DA.css";
// import { useLocation } from "react-router-dom";

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({});

//   const location = useLocation(); // Use the useLocation hook to access the location object
//   const userRole = location.state?.role; // Access the user's role from location.state

//   const handleRadioChange = (e) => {
//     const { name, value } = e.target;

//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [name]: value,
//     }));
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = questions.length;
//     const answeredQuestions = Object.keys(answers).length;
//     const percentage = (answeredQuestions / totalQuestions) * 100;

//     return percentage.toFixed(2);
//   };

//   const data = React.useMemo(() => {
//     return questions.map((question, index) => {
//       const row = {
//         question: question.text,
//         data: <button className="NAButton">NA</button>,
//         pdDev: userRole === "PD Dev" ? (
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdDev${index + 1}`}
//                 value="YES"
//                 checked={answers[`pdDev${index + 1}`] === "YES"}
//                 onChange={handleRadioChange}
//               />
//               YES
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdDev${index + 1}`}
//                 value="NO"
//                 checked={answers[`pdDev${index + 1}`] === "NO"}
//                 onChange={handleRadioChange}
//               />
//               NO
//             </label>
//           </div>
//         ) : (
//           <div className="shaded-column">
//             <span>Not Accessible</span>
//           </div>
//         ),
//         devComments: userRole === "PD Dev" ? (
//           <input
//             type="text"
//             value={answers[`devComments${index + 1}`] || ""}
//             name={`devComments${index + 1}`}
//             onChange={(e) => {
//               const { name, value } = e.target;
//               setAnswers((prevAnswers) => ({
//                 ...prevAnswers,
//                 [name]: value,
//               }));
//             }}
//           />
//         ) : (
//           <div className="shaded-column">
//             <span>Not Accessible</span>
//           </div>
//         ),
//         pdLead: userRole === "PD Lead" ? (
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdLead${index + 1}`}
//                 value="YES"
//                 checked={answers[`pdLead${index + 1}`] === "YES"}
//                 onChange={handleRadioChange}
//               />
//               YES
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name={`pdLead${index + 1}`}
//                 value="NO"
//                 checked={answers[`pdLead${index + 1}`] === "NO"}
//                 onChange={handleRadioChange}
//               />
//               NO
//             </label>
//           </div>
//         ) : (
//           <div className="shaded-column">
//             <span>Not Accessible</span>
//           </div>
//         ),
//         pdLeadComments: userRole === "PD Lead" ? (
//           <input
//             type="text"
//             value={answers[`pdLeadComments${index + 1}`] || ""}
//             name={`pdLeadComments${index + 1}`}
//             onChange={(e) => {
//               const { name, value } = e.target;
//               setAnswers((prevAnswers) => ({
//                 ...prevAnswers,
//                 [name]: value,
//               }));
//             }}
//           />
//         ) : (
//           <div className="shaded-column">
//             <span>Not Accessible</span>
//           </div>
//         ),
//       };

//       return row;
//     });
//   }, [answers, userRole]);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Question",
//         accessor: "question",
//         show: true, // Show the Question column for all users
//       },
//       {
//         Header: "Data",
//         accessor: "data",
//         show: true, // Show the Data column for all users
//       },
//       {
//         Header: "PD-dev",
//         accessor: "pdDev",
//         show: userRole === "PD Dev" || userRole === "PD Lead", // Show the PD-dev column for PD Dev and PD Lead
//       },
//       {
//         Header: "Dev-Comments",
//         accessor: "devComments",
//         show: userRole === "PD Dev" || userRole === "PD Lead", // Show the Dev-Comments column for PD Dev and PD Lead
//       },
//       {
//         Header: "PD Lead",
//         accessor: "pdLead",
//         show: true, // Show the PD Lead column for all users
//       },
//       {
//         Header: "PD-Lead-Comments",
//         accessor: "pdLeadComments",
//         show: true, // Show the PD-Lead-Comments column for all users
//       },
//     ],
//     [userRole]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const percentage = calculatePercentage();
//     console.log(answers)
//     try {
//       const response = await fetch("http://localhost:5000/api/checklist", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(answers),
//       });

//       if (response.ok) {
//         toast.success(`Submitted! Percentage: ${percentage}%`, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       } else {
//         toast.error("Error submitting the checklist.", {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting the checklist:", error);
//       toast.error("Error submitting the checklist.", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   };

//   return (
//     <div>
//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST</h1>

//           {/* Display the user's role */}
//           <p className="user-role" style={{ textAlign: "left" }}>
//             You are: {location.state?.role}
//           </p>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map(
//                       (column) =>
//                         column.show && (
//                           <th {...column.getHeaderProps()}>
//                             {column.render("Header")}
//                           </th>
//                         )
//                     )}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map(
//                         (cell) =>
//                           cell.column.show && (
//                             <td {...cell.getCellProps()}>
//                               {cell.render("Cell")}
//                             </td>
//                           )
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="button-container">
//               <button className="submit-button" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;



// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const ChecklistPage = () => {
//   const location = useLocation();
//   const { role } = location.state;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const data = new FormData(form);

//     const answers = {
//       data: data.get('data'),
//       pdDev: role === 'PD Dev' ? data.get('pdDev') : undefined,
//       devComments: role === 'PD Dev' ? data.get('devComments') : undefined,
//       pdLead: role === 'PD Lead' ? data.get('pdLead') : undefined,
//       pdLeadComments: role === 'PD Lead' ? data.get('pdLeadComments') : undefined,
//     };

//     try {
//       await axios.post('/api/checklist', { userRole: role, answers });
//       // Checklist item created successfully
//       // Add any necessary success handling or redirection logic here
//     } catch (error) {
//       console.error('Error creating checklist item:', error);
//       // Display error message to the user
//     }
//   };

//   return (
//     <div>
//       <h1>Checklist</h1>
//       <p>User Role: {role}</p>

//       <form onSubmit={handleSubmit}>
//         <label htmlFor="data">Data:</label>
//         <input type="text" id="data" name="data" required /><br />

//         {role === 'PD Dev' && (
//           <>
//             <label htmlFor="pdDev">PD Dev:</label>
//             <input type="text" id="pdDev" name="pdDev" /><br />

//             <label htmlFor="devComments">Dev Comments:</label>
//             <input type="text" id="devComments" name="devComments" /><br />
//           </>
//         )}

//         {role === 'PD Lead' && (
//           <>
//             <label htmlFor="pdLead">PD Lead:</label>
//             <input type="text" id="pdLead" name="pdLead" /><br />

//             <label htmlFor="pdLeadComments">PD Lead Comments:</label>
//             <input type="text" id="pdLeadComments" name="pdLeadComments" /><br />
//           </>
//         )}

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ChecklistPage; 


// old code 17-07-23 

// import React, { useState, useEffect } from 'react';
// import { useTable } from 'react-table';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import questions from './config';
// import './DA.css';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({});

//   const location = useLocation(); // Use the useLocation hook to access the location object
//   const userRole = location.state?.role; // Access the user's role from location.state

//   const handleRadioChange = (e) => {
//     const { name, value } = e.target;

//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [name]: value,
//     }));
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = questions.length;
//     const answeredQuestions = Object.keys(answers).length;
//     const percentage = (answeredQuestions / totalQuestions) * 100;

//     return percentage.toFixed(2);
//   };
  
//   const data = React.useMemo(() => {
//     return questions.map((question, index) => {
//       const row = {
//         question: question.text,
//         data: <button className="NAButton">NA</button>,
//         pdDev:
//           userRole === 'PD Dev' ? (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="YES"
//                   checked={answers[`pdDev${index + 1}`] === 'YES'}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="NO"
//                   checked={answers[`pdDev${index + 1}`] === 'NO'}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ) : (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           ),
//         devComments:
//           userRole === 'PD Dev' ? (
//             <input
//               type="text"
//               value={answers[`devComments${index + 1}`] || ''}
//               name={`devComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ) : (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           ),
//         pdLead:
//           userRole === 'PD Lead' ? (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdLead${index + 1}`}
//                   value="YES"
//                   checked={answers[`pdLead${index + 1}`] === 'YES'}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdLead${index + 1}`}
//                   value="NO"
//                   checked={answers[`pdLead${index + 1}`] === 'NO'}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ) : (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           ),
//         pdLeadComments:
//           userRole === 'PD Lead' ? (
//             <input
//               type="text"
//               value={answers[`pdLeadComments${index + 1}`] || ''}
//               name={`pdLeadComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ) : (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           ),
//       };

//       return row;
//     });
//   }, [answers, userRole]);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Question',
//         accessor: 'question',
//         show: true, // Show the Question column for all users
//       },
//       {
//         Header: 'Data',
//         accessor: 'data',
//         show: true, // Show the Data column for all users
//       },
//       {
//         Header: 'PD-dev',
//         accessor: 'pdDev',
//         show: userRole === 'PD Dev' || userRole === 'PD Lead', // Show the PD-dev column for PD Dev and PD Lead
//       },
//       {
//         Header: 'Dev-Comments',
//         accessor: 'devComments',
//         show: userRole === 'PD Dev' || userRole === 'PD Lead', // Show the Dev-Comments column for PD Dev and PD Lead
//       },
//       {
//         Header: 'PD Lead',
//         accessor: 'pdLead',
//         show: true, // Show the PD Lead column for all users
//       },
//       {
//         Header: 'PD-Lead-Comments',
//         accessor: 'pdLeadComments',
//         show: true, // Show the PD-Lead-Comments column for all users
//       },
//     ],
//     [userRole]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const percentage = calculatePercentage();
//       console.log(userRole,answers)
//       // console.log("==>", questions)
//     try {
//       await axios.post('http://localhost:5000/api/checklist', {
//         userRole,
//         answers,
//         questions
//       });

//       toast.success(`Submitted! Percentage: ${percentage}%`, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } catch (error) {
//       console.error('Error submitting the checklist:', error);
//       toast.error('Error submitting the checklist.', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   };

//   return (
//     <div>
//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST</h1>

//           {/* Display the user's role */}
//           <p className="user-role" style={{ textAlign: 'left' }}>
//             You are: {location.state?.role}
//           </p>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map(
//                       (column) =>
//                         column.show && (
//                           <th {...column.getHeaderProps()}>
//                             {column.render('Header')}
//                           </th>
//                         )
//                     )}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map(
//                         (cell) =>
//                           cell.column.show && (
//                             <td {...cell.getCellProps()}>
//                               {cell.render('Cell')}
//                             </td>
//                           )
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="button-container">
//               <button className="submit-button" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;


// import React, { useState, useEffect } from 'react';
// import { useTable } from 'react-table';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import questions from './config';
// import './DA.css';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({});
//   const [pdDevData, setPdDevData] = useState([]);

//   const location = useLocation();
//   const userRole = location.state?.role;

//   const handleRadioChange = (e) => {
//     const { name, value } = e.target;
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [name]: value,
//     }));
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = questions.length;
//     const answeredQuestions = Object.keys(answers).length;
//     const percentage = (answeredQuestions / totalQuestions) * 100;
//     return percentage.toFixed(2);
//   };

//   useEffect(() => {
//     if (userRole === 'PD Lead') {
//       axios
//         .get('http://localhost:5000/api/checklist/pddev')
//         .then((response) => {
//           setPdDevData(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching PD Dev data:', error);
//         });
//     }
//   }, [userRole]);

//   const data = React.useMemo(() => {
//     return questions.map((question, index) => {
//       const pdDevValue = pdDevData[index]?.pdDev;
//       const pdDevCommentsValue = pdDevData[index]?.devComments;

//       const row = {
//         question: question.text,
//         data: <button className="NAButton">NA</button>,
//         pdDev:
//           userRole === 'PD Dev' ? (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="YES"
//                   checked={answers[`pdDev${index + 1}`] === 'YES'}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="NO"
//                   checked={answers[`pdDev${index + 1}`] === 'NO'}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ) : (
//             <div className="shaded-column">
//               <span>{pdDevValue}</span>
//             </div>
//           ),
//         devComments:
//           userRole === 'PD Dev' ? (
//             <input
//               type="text"
//               value={answers[`devComments${index + 1}`] || ''}
//               name={`devComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ) : (
//             <div className="shaded-column">
//               <span>{pdDevCommentsValue}</span>
//             </div>
//           ),
//         pdLead:
//           userRole === 'PD Lead' ? (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdLead${index + 1}`}
//                   value="YES"
//                   checked={answers[`pdLead${index + 1}`] === 'YES'}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdLead${index + 1}`}
//                   value="NO"
//                   checked={answers[`pdLead${index + 1}`] === 'NO'}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ) : (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           ),
//         pdLeadComments:
//           userRole === 'PD Lead' ? (
//             <input
//               type="text"
//               value={answers[`pdLeadComments${index + 1}`] || ''}
//               name={`pdLeadComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ) : (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           ),
//       };

//       return row;
//     });
//   }, [answers, userRole, pdDevData]);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Question',
//         accessor: 'question',
//         show: true,
//       },
//       {
//         Header: 'Data',
//         accessor: 'data',
//         show: true,
//       },
//       {
//         Header: 'PD-dev',
//         accessor: 'pdDev',
//         show: userRole === 'PD Dev' || userRole === 'PD Lead',
//       },
//       {
//         Header: 'Dev-Comments',
//         accessor: 'devComments',
//         show: userRole === 'PD Dev' || userRole === 'PD Lead',
//       },
//       {
//         Header: 'PD Lead',
//         accessor: 'pdLead',
//         show: true,
//       },
//       {
//         Header: 'PD-Lead-Comments',
//         accessor: 'pdLeadComments',
//         show: true,
//       },
//     ],
//     [userRole]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

 
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
  
//     const percentage = calculatePercentage();
//   console.log(userRole)
//   console.log(answers)
//   console.log(questions)
//     try {
//       const pdDevAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('pdDev'))
//       );
  
//       const devCommentsAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('devComments'))
//       );
  
//       const pdLeadAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('pdLead'))
//       );
  
//       const pdLeadCommentsAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('pdLeadComments'))
//       );
  
//       const requestBody = {
//         userRole,
//         answers: {
//           pdDev: pdDevAnswers,
//           devComments: devCommentsAnswers,
//           pdLead: pdLeadAnswers,
//           pdLeadComments: pdLeadCommentsAnswers,
//         },
//         questions,
//       };


  
//       await axios.post('http://localhost:5000/api/checklist', requestBody);
  
//       toast.success(`Submitted! Percentage: ${percentage}%`, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } catch (error) {
//       console.error('Error submitting the checklist:', error);
//       toast.error('Error submitting the checklist.', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   };
  
//   return (
//     <div>
//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST</h1>

//           <p className="user-role" style={{ textAlign: 'left' }}>
//             You are: {location.state?.role}
//           </p>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map(
//                       (column) =>
//                         column.show && (
//                           <th {...column.getHeaderProps()}>
//                             {column.render('Header')}
//                           </th>
//                         )
//                     )}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map(
//                         (cell) =>
//                           cell.column.show && (
//                             <td {...cell.getCellProps()}>
//                               {cell.render('Cell')}
//                             </td>
//                           )
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="button-container">
//               <button className="submit-button" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;


// import React, { useState, useEffect } from 'react';
// import { useTable } from 'react-table';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import questions from './config';
// import './DA.css';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({});
//   const [pdDevData, setPdDevData] = useState([]);

//   const location = useLocation();
//   const userRole = location.state?.role;

//   const handleRadioChange = (e) => {
//     const { name, value } = e.target;
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [name]: value,
//     }));
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = questions.length;
//     const answeredQuestions = Object.keys(answers).length;
//     const percentage = (answeredQuestions / totalQuestions) * 100;
//     return percentage.toFixed(2);
//   };

//   useEffect(() => {
//     if (userRole === 'PD Lead') {
//       axios
//         .get('http://localhost:5000/api/checklist/pddev')
//         .then((response) => {
//           setPdDevData(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching PD Dev data:', error);
//         });
//     }
//   }, [userRole]);


//   const data = React.useMemo(() => {
//     return questions.map((question, index) => {
//       const pdDevValue = pdDevData[index]?.pdDev;
//       const pdDevCommentsValue = pdDevData[index]?.devComments;
  
//       const pdDevValueArray = Array.from(pdDevValue || []);
//       const pdDevValueString = pdDevValueArray.join(', ');
  
//       const pdDevCommentsValueArray = Array.from(pdDevCommentsValue || []);
//       const pdDevCommentsValueString = pdDevCommentsValueArray.join(', ');
  
//       const row = {
//         question: question.text,
//         data: <button className="NAButton">NA</button>,
//         pdDev:
//           userRole === 'PD Dev' ? (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="YES"
//                   checked={answers[`pdDev${index + 1}`] === 'YES'}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="NO"
//                   checked={answers[`pdDev${index + 1}`] === 'NO'}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ) : (
//             <div className="shaded-column">
//               <span>{pdDevValueString}</span>
//             </div>
//           ),
//         devComments:
//           userRole === 'PD Dev' ? (
//             <input
//               type="text"
//               value={answers[`devComments${index + 1}`] || ''}
//               name={`devComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ) : (
//             <div className="shaded-column">
//               <span>{pdDevCommentsValueString}</span>
//             </div>
//           ),
//         pdLead:
//           userRole === 'PD Lead' ? (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdLead${index + 1}`}
//                   value="YES"
//                   checked={answers[`pdLead${index + 1}`] === 'YES'}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdLead${index + 1}`}
//                   value="NO"
//                   checked={answers[`pdLead${index + 1}`] === 'NO'}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ) : (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           ),
//         pdLeadComments:
//           userRole === 'PD Lead' ? (
//             <input
//               type="text"
//               value={answers[`pdLeadComments${index + 1}`] || ''}
//               name={`pdLeadComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ) : null, // Set pdLeadComments to null if not in PD Lead role
//       };
  
//       return row;
//     });
//   }, [answers, userRole, pdDevData]);
  

  
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Question',
//         accessor: 'question',
//         show: true,
//       },
//       {
//         Header: 'Data',
//         accessor: 'data',
//         show: true,
//       },
//       {
//         Header: 'PD-dev',
//         accessor: 'pdDev',
//         show: userRole === 'PD Dev' || userRole === 'PD Lead',
//       },
//       {
//         Header: 'Dev-Comments',
//         accessor: 'devComments',
//         show: userRole === 'PD Dev' || userRole === 'PD Lead',
//       },
//       {
//         Header: 'PD Lead',
//         accessor: 'pdLead',
//         show: true,
//       },
//       {
//         Header: 'PD-Lead-Comments',
//         accessor: 'pdLeadComments',
//         show: true,
//       },
//     ],
//     [userRole]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const percentage = calculatePercentage();
//     console.log(userRole);
//     console.log(answers);
//     console.log(questions);

//     try {
//       const pdDevAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('pdDev'))
//       );

//       const devCommentsAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('devComments'))
//       );

//       const pdLeadAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('pdLead'))
//       );

//       const pdLeadCommentsAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('pdLeadComments'))
//       );

//       const requestBody = {
//         userRole,
//         answers: {
//           pdDev: pdDevAnswers,
//           devComments: devCommentsAnswers,
//           pdLead: pdLeadAnswers,
//           pdLeadComments: pdLeadCommentsAnswers,
//         },
//         questions,
//       };
//       console.log(requestBody);
//       await axios.post('http://localhost:5000/api/checklist', requestBody);

//       toast.success(`Submitted! Percentage: ${percentage}%`, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } catch (error) {
//       console.error('Error submitting the checklist:', error);
//       toast.error('Error submitting the checklist.', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   };

//   return (
//     <div>
//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST</h1>

//           <p className="user-role" style={{ textAlign: 'left' }}>
//             You are: {location.state?.role}
//           </p>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map(
//                       (column) =>
//                         column.show && (
//                           <th {...column.getHeaderProps()}>
//                             {column.render('Header')}
//                           </th>
//                         )
//                     )}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map(
//                         (cell) =>
//                           cell.column.show && (
//                             <td {...cell.getCellProps()}>
//                               {cell.render('Cell')}
//                             </td>
//                           )
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="button-container">
//               <button className="submit-button" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;



// import React, { useState, useEffect } from 'react';
// import { useTable } from 'react-table';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import questions from './config';
// import './DA.css';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// function ChecklistPage() {
//   const [answers, setAnswers] = useState({});
//   const [pdDevData, setPdDevData] = useState([]);
//   const [pdLeadData, setPdLeadData] = useState([]);

//   const location = useLocation();
//   const userRole = location.state?.role;

//   const handleRadioChange = (e) => {
//     const { name, value } = e.target;
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [name]: value,
//     }));
//   };

//   const calculatePercentage = () => {
//     const totalQuestions = questions.length;
//     const answeredQuestions = Object.keys(answers).length;
//     const percentage = (answeredQuestions / totalQuestions) * 100;
//     return percentage.toFixed(2);
//   };

//   useEffect(() => {
//     if (userRole === 'PD Lead') {
//       axios
//         .get('http://localhost:5000/api/checklist/pddev')
//         .then((response) => {
//           setPdDevData(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching PD Dev data:', error);
//         });
//     }
//   }, [userRole]);





  
//   const data = React.useMemo(() => {
//     return questions.map((question, index) => {
//       const pdDevValue = pdDevData[index]?.pdDev;
//       const pdDevCommentsValue = pdDevData[index]?.devComments;

//       const pdDevValueArray = Array.from(pdDevValue || []);
//       const pdDevValueString = pdDevValueArray.join(', ');

//       const pdDevCommentsValueArray = Array.from(pdDevCommentsValue || []);
//       const pdDevCommentsValueString = pdDevCommentsValueArray.join(', ');

//       const row = {
//         question: question.text,
//         data: <button className="NAButton">NA</button>,
//         pdDev:
//           userRole === 'PD Dev' ? (
//             <div>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="YES"
//                   checked={answers[`pdDev${index + 1}`] === 'YES'}
//                   onChange={handleRadioChange}
//                 />
//                 YES
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name={`pdDev${index + 1}`}
//                   value="NO"
//                   checked={answers[`pdDev${index + 1}`] === 'NO'}
//                   onChange={handleRadioChange}
//                 />
//                 NO
//               </label>
//             </div>
//           ) : (
//             <div className="shaded-column">
//               <span>{pdDevValueString}</span>
//             </div>
//           ),
//         devComments:
//           userRole === 'PD Dev' ? (
//             <input
//               type="text"
//               value={answers[`devComments${index + 1}`] || ''}
//               name={`devComments${index + 1}`}
//               onChange={(e) => {
//                 const { name, value } = e.target;
//                 setAnswers((prevAnswers) => ({
//                   ...prevAnswers,
//                   [name]: value,
//                 }));
//               }}
//             />
//           ) : (
//             <div className="shaded-column">
//               <span>{pdDevCommentsValueString}</span>
//             </div>
//           ),
//         pdLead:
//           userRole === 'PD Lead' ? (
//             <div className="shaded-column">
//               <span>{pdDevValueString}</span>
//             </div>
//           ) : (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           ),
//         pdLeadComments:
//           userRole === 'PD Lead' ? (
//             <div className="shaded-column">
//               <span>{pdDevCommentsValueString}</span>
//             </div>
//           ) : (
//             <div className="shaded-column">
//               <span>Not Accessible</span>
//             </div>
//           ),
//       };

//       return row;
//     });
//   }, [answers, userRole, pdDevData]);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Question',
//         accessor: 'question',
//         show: true,
//       },
//       {
//         Header: 'Data',
//         accessor: 'data',
//         show: true,
//       },
//       {
//         Header: 'PD-dev',
//         accessor: 'pdDev',
//         show: userRole === 'PD Dev' || userRole === 'PD Lead',
//       },
//       {
//         Header: 'Dev-Comments',
//         accessor: 'devComments',
//         show: userRole === 'PD Dev' || userRole === 'PD Lead',
//       },
//       {
//         Header: 'PD Lead',
//         accessor: 'pdLead',
//         show: true,
//       },
//       {
//         Header: 'PD-Lead-Comments',
//         accessor: 'pdLeadComments',
//         show: true,
//       },
//     ],
//     [userRole]
//   );


  


  
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const percentage = calculatePercentage();
//     console.log(userRole);
//     console.log(answers);
//     console.log(questions);

//     try {
//       const pdDevAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('pdDev'))
//       );

//       const devCommentsAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('devComments'))
//       );

//       const pdLeadAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('pdLead'))
//       );

//       const pdLeadCommentsAnswers = Object.fromEntries(
//         Object.entries(answers).filter(([key]) => key.startsWith('pdLeadComments'))
//       );

//       const requestBody = {
//         userRole,
//         answers: {
//           pdDev: pdDevAnswers,
//           devComments: devCommentsAnswers,
//           pdLead: pdLeadAnswers,
//           pdLeadComments: pdLeadCommentsAnswers,
//         },
//         questions,
//       };
//       console.log(requestBody);
//       await axios.post('http://localhost:5000/api/checklist', requestBody);

//       toast.success(`Submitted! Percentage: ${percentage}%`, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } catch (error) {
//       console.error('Error submitting the checklist:', error);
//       toast.error('Error submitting the checklist.', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   };

//   return (
//     <div>
//       <div>
//         <div className="checklist-left">
//           <h1>PRE-SYNTHESIS CHECKLIST</h1>

//           <p className="user-role" style={{ textAlign: 'left' }}>
//             You are: {location.state?.role}
//           </p>

//           <form className="checklistForm" onSubmit={handleFormSubmit}>
//             <table className="checklist-table" {...getTableProps()}>
//               <thead>
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map(
//                       (column) =>
//                         column.show && (
//                           <th {...column.getHeaderProps()}>
//                             {column.render('Header')}
//                           </th>
//                         )
//                     )}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);

//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map(
//                         (cell) =>
//                           cell.column.show && (
//                             <td {...cell.getCellProps()}>
//                               {cell.render('Cell')}
//                             </td>
//                           )
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div className="button-container">
//               <button className="submit-button" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChecklistPage;

