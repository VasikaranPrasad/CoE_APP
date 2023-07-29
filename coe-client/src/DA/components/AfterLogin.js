import React from 'react';
import ChecklistPage from './CheckList';


const AfterLogin = () => {
  // Any other logic or components to be displayed after login

  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      {/* <RunsForm /> */}
     <ChecklistPage />
    </div>
  );
};

export default AfterLogin;
