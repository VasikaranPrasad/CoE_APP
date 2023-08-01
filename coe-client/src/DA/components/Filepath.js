import React, { useState } from 'react';
import axios from 'axios';
import Backendapi from "../../Backendapi";

const FilePath = () => {
  const [filePath, setFilePath] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the file path to the backend server
      const response = await axios.post(`${Backendapi.REACT_APP_BACKEND_API_URL}/process-file`, { filePath });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error occurred while processing the file.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>YAML to JSON Conversion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          File Path:
          <input type="text" value={filePath} onChange={(e) => setFilePath(e.target.value)} />
        </label>
        <button type="submit">Convert to JSON</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FilePath;
