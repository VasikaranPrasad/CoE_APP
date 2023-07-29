// Parent component (e.g., LandingPage.js)
import React, { useState } from 'react';
import RunsForm from './RunsForm';

const AddRunDetails = () => {
  const [designName, setDesignName] = useState('');
  const [runName, setRunName] = useState('');


 const addRun = ({ designName, runName }) => {
    setDesignName(designName);
    setRunName(runName);
  };

  return (
    <div>
    <h1></h1>
    <RunsForm addRun={addRun} />
  </div>
  
  );
};

export default AddRunDetails;
