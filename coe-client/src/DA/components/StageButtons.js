//Main code

// import React from 'react';
// import jsonData from '../../DA/components/output.json';
// import './DA.css'; // Make sure to import the CSS file for styling

// const MainStageButton = ({ stage, onClick, isSelected }) => {
//   return (
//     <button onClick={() => onClick(stage)} className={isSelected ? 'selected main-stage' : 'main-stage'}>
//       {stage}
//     </button>
//   );
// };

// const SubStageButton = ({ stage, onClick, isSelected }) => {
//   return (
//     <button onClick={() => onClick(stage)} className={isSelected ? 'selected sub-stage' : 'sub-stage'}>
//       {stage}
//     </button>
//   );
// };

// class StageButtons extends React.Component {
//   state = {
//     selectedMainStage: null,
//     selectedStages: [],
//   };

//   handleMainStageClick = (mainStage) => {
//     if (this.state.selectedMainStage === mainStage) {
//       this.setState({
//         selectedMainStage: null,
//         selectedStages: [],
//       });
//     } else {
//       this.setState({
//         selectedMainStage: mainStage,
//         selectedStages: [mainStage],
//       });
//     }
//   };

//   handleSubStageClick = (subStage) => {
//     this.setState((prevState) => ({
//       selectedStages: prevState.selectedStages.includes(subStage)
//         ? prevState.selectedStages.slice(0, prevState.selectedStages.indexOf(subStage) + 1)
//         : prevState.selectedStages.concat(subStage),
//     }));
//   };

//   renderSubStagesRecursive = (mainStageData) => {
//     if (!mainStageData || !mainStageData.steps || mainStageData.steps.length === 0) {
//       return null;
//     }

//     return mainStageData.steps.map((step, index) => {
//       const subStage = Object.keys(step)[0];
//       return (
//         <li key={index}>
//           <SubStageButton
//             stage={subStage}
//             onClick={() => this.handleSubStageClick(subStage)}
//             isSelected={this.state.selectedStages.includes(subStage)}
//           />
//           {this.state.selectedStages.includes(subStage) && (
//             <ul>{this.renderSubStagesRecursive(step[subStage])}</ul>
//           )}
//         </li>
//       );
//     });
//   };

//   renderMainStages = () => {
//     const { flows } = jsonData;
//     if (!flows) return null;

//     return Object.keys(flows).map((mainStage) => (
//       <MainStageButton
//         key={mainStage}
//         stage={mainStage}
//         onClick={() => this.handleMainStageClick(mainStage)}
//         isSelected={mainStage === this.state.selectedMainStage}
//       />
//     ));
//   };

//   render() {
//     return (
//       <div>
//         <h2>Main Stages:</h2>
//         <ul>{this.renderMainStages()}</ul>

//         <h2>Sub Stages:</h2>
//         {this.state.selectedMainStage ? (
//           <ul>{this.renderSubStagesRecursive(jsonData.flows[this.state.selectedMainStage])}</ul>
//         ) : (
//           <p>No sub-stages selected.</p>
//         )}
//       </div>
//     );
//   }
// }

// export default StageButtons;



// main stages data

// import React from 'react';
// import jsonData from '../../DA/components/output.json';
// import './DA.css'; // Make sure to import the CSS file for styling

// const MainStageButton = ({ stage, onClick, isSelected }) => {
//   return (
//     <button onClick={() => onClick(stage)} className={isSelected ? 'selected main-stage' : 'main-stage'}>
//       {stage}
//     </button>
//   );
// };

// const SubStageButton = ({ stage, onClick, isSelected }) => {
//   return (
//     <button onClick={() => onClick(stage)} className={isSelected ? 'selected sub-stage' : 'sub-stage'}>
//       {stage}
//     </button>
//   );
// };

// class StageButtons extends React.Component {
//   state = {
//     selectedMainStage: null,
//     selectedStages: [],
//   };

//   handleMainStageClick = (mainStage) => {
//     if (this.state.selectedMainStage === mainStage) {
//       this.setState({
//         selectedMainStage: null,
//         selectedStages: [],
//       });
//     } else {
//       this.setState({
//         selectedMainStage: mainStage,
//         selectedStages: [mainStage],
//       });
//     }
//   };

//   handleSubStageClick = (subStage) => {
//     this.setState((prevState) => ({
//       selectedStages: prevState.selectedStages.includes(subStage)
//         ? prevState.selectedStages.slice(0, prevState.selectedStages.indexOf(subStage) + 1)
//         : prevState.selectedStages.concat(subStage),
//     }));
//   };

//   renderSubStagesRecursive = (mainStageData) => {
//     if (!mainStageData || !mainStageData.steps || mainStageData.steps.length === 0) {
//       return null;
//     }

//     return mainStageData.steps.map((step, index) => {
//       const subStage = Object.keys(step)[0];
//       return (
//         <li key={index}>
//           <SubStageButton
//             stage={subStage}
//             onClick={() => this.handleSubStageClick(subStage)}
//             isSelected={this.state.selectedStages.includes(subStage)}
//           />
//           {this.state.selectedStages.includes(subStage) && (
//             <ul>{this.renderSubStagesRecursive(step[subStage])}</ul>
//           )}
//         </li>
//       );
//     });
//   };

//   renderMainStages = () => {
//     const { flows } = jsonData;
//     if (!flows) return null;

//     const mainStagesToDisplay = ['implementation', 'eco', 'implementation_si']; // Add the main stages you want to display here

//     return mainStagesToDisplay.map((mainStage) => (
//       <MainStageButton
//         key={mainStage}
//         stage={mainStage}
//         onClick={() => this.handleMainStageClick(mainStage)}
//         isSelected={mainStage === this.state.selectedMainStage}
//       />
//     ));
//   };

//   render() {
//     return (
//       <div>
//         <h2>Main Stages:</h2>
//         <ul>{this.renderMainStages()}</ul>

//         <h2>Sub Stages:</h2>
//         {this.state.selectedMainStage ? (
//           <ul>{this.renderSubStagesRecursive(jsonData.flows[this.state.selectedMainStage])}</ul>
//         ) : (
//           <p>No sub-stages selected.</p>
//         )}
//       </div>
//     );
//   }
// }

// export default StageButtons;


//tcl file data

// import React from 'react';
// import jsonData from '../../DA/components/output.json';
// import './DA.css'; // Make sure to import the CSS file for styling

// const MainStageButton = ({ stage, onClick, isSelected }) => {
//   return (
//     <button onClick={() => onClick(stage)} className={isSelected ? 'selected main-stage' : 'main-stage'}>
//       {stage}
//     </button>
//   );
// };

// const SubStageButton = ({ stage, onClick, isSelected }) => {
//   return (
//     <button onClick={() => onClick(stage)} className={isSelected ? 'selected sub-stage' : 'sub-stage'}>
//       {stage}
//     </button>
//   );
// };

// const TCLFileButton = ({ tclFile }) => {
//   return (
//     <button onClick={() => console.log('Open TCL file:', tclFile)} className="tcl-file-button">
//       View TCL File
//     </button>
//   );
// };

// class StageButtons extends React.Component {
//   state = {
//     selectedMainStage: null,
//     selectedStages: [],
//   };

//   handleMainStageClick = (mainStage) => {
//     if (this.state.selectedMainStage === mainStage) {
//       this.setState({
//         selectedMainStage: null,
//         selectedStages: [],
//       });
//     } else {
//       this.setState({
//         selectedMainStage: mainStage,
//         selectedStages: [mainStage],
//       });
//     }
//   };

//   handleSubStageClick = (subStage) => {
//     this.setState((prevState) => ({
//       selectedStages: prevState.selectedStages.includes(subStage)
//         ? prevState.selectedStages.slice(0, prevState.selectedStages.indexOf(subStage) + 1)
//         : prevState.selectedStages.concat(subStage),
//     }));
//   };

//   renderSubStagesRecursive = (mainStageData) => {
//     if (!mainStageData || !mainStageData.steps || mainStageData.steps.length === 0) {
//       return null;
//     }

//     return mainStageData.steps.map((step, index) => {
//       const stageName = Object.keys(step)[0];
//       const stageValue = step[stageName];

//       if (typeof stageValue === 'object') {
//         return (
//           <li key={index}>
//             <SubStageButton
//               stage={stageName}
//               onClick={() => this.handleSubStageClick(stageName)}
//               isSelected={this.state.selectedStages.includes(stageName)}
//             />
//             {this.state.selectedStages.includes(stageName) && (
//               <ul>{this.renderSubStagesRecursive(stageValue)}</ul>
//             )}
//           </li>
//         );
//       } else if (typeof stageValue === 'string' && stageValue.endsWith('.tcl')) {
//         return (
//           <li key={index}>
//             <TCLFileButton tclFile={stageValue} />
//           </li>
//         );
//       } else {
//         return null; // Ignore other non-object and non-.tcl values in the steps array
//       }
//     });
//   };

//   renderMainStages = () => {
//     const { flows } = jsonData;
//     if (!flows) return null;

//     const mainStagesToDisplay = ['implementation', 'eco', 'implementation_si']; // Add the main stages you want to display here

//     return mainStagesToDisplay.map((mainStage) => (
//       <MainStageButton
//         key={mainStage}
//         stage={mainStage}
//         onClick={() => this.handleMainStageClick(mainStage)}
//         isSelected={mainStage === this.state.selectedMainStage}
//       />
//     ));
//   };

//   render() {
//     return (
//       <div>
//         <h2>Main Stages:</h2>
//         <ul>{this.renderMainStages()}</ul>

//         <h2>Sub Stages:</h2>
//         {this.state.selectedMainStage ? (
//           <ul>{this.renderSubStagesRecursive(jsonData.flows[this.state.selectedMainStage])}</ul>
//         ) : (
//           <p>No sub-stages selected.</p>
//         )}
//       </div>
//     );
//   }
// }

// export default StageButtons;




//TCl main button 

import React from 'react';
import jsonData from '../../DA/components/output.json';
import './DA.css'; // Make sure to import the CSS file for styling

const MainStageButton = ({ stage, onClick, isSelected }) => {
  return (
    <button onClick={() => onClick(stage)} className={isSelected ? 'selected main-stage' : 'main-stage'}>
      {stage}
    </button>
  );
};

const SubStageButton = ({ stage, onClick, isSelected }) => {
  return (
    <button onClick={() => onClick(stage)} className={isSelected ? 'selected sub-stage' : 'sub-stage'}>
      {stage}
    </button>
  );
};

const TCLFileButton = ({ tclFile }) => {
  return (
    <button onClick={() => console.log('Open TCL file:', tclFile)} className="tcl-file-button">
      {tclFile}
    </button>
  );
};

class StageButtons extends React.Component {
  state = {
    selectedMainStage: null,
    selectedStages: [],
  };

  handleMainStageClick = (mainStage) => {
    if (this.state.selectedMainStage === mainStage) {
      this.setState({
        selectedMainStage: null,
        selectedStages: [],
      });
    } else {
      this.setState({
        selectedMainStage: mainStage,
        selectedStages: [mainStage],
      });
    }
  };

  handleSubStageClick = (subStage) => {
    this.setState((prevState) => ({
      selectedStages: prevState.selectedStages.includes(subStage)
        ? prevState.selectedStages.slice(0, prevState.selectedStages.indexOf(subStage) + 1)
        : prevState.selectedStages.concat(subStage),
    }));
  };

  renderSubStagesRecursive = (mainStageData) => {
    if (!mainStageData || !mainStageData.steps || mainStageData.steps.length === 0) {
      return null;
    }

    return mainStageData.steps.map((step, index) => {
      const stageName = Object.keys(step)[0];
      const stageValue = step[stageName];

      if (typeof stageValue === 'object') {
        return (
          <li key={index}>
            <SubStageButton
              stage={stageName}
              onClick={() => this.handleSubStageClick(stageName)}
              isSelected={this.state.selectedStages.includes(stageName)}
            />
            {this.state.selectedStages.includes(stageName) && (
              <ul>{this.renderSubStagesRecursive(stageValue)}</ul>
            )}
          </li>
        );
      } else if (typeof stageValue === 'string' && stageValue.endsWith('.tcl')) {
        const key = Object.keys(step)[0]; // Extract the key (e.g., CMD_preserve)
        const tclFileName = step[key]; // Get the TCL file name from the key value

        return (
          <li key={index}>
            <TCLFileButton tclFile={tclFileName} />
          </li>
        );
      } else {
        return null; // Ignore other non-object and non-.tcl values in the steps array
      }
    });
  };

  renderMainStages = () => {
    const { flows } = jsonData;
    if (!flows) return null;

    const mainStagesToDisplay = ['implementation', 'eco', 'implementation_si']; // Add the main stages you want to display here

    return mainStagesToDisplay.map((mainStage) => (
      <MainStageButton
        key={mainStage}
        stage={mainStage}
        onClick={() => this.handleMainStageClick(mainStage)}
        isSelected={mainStage === this.state.selectedMainStage}
      />
    ));
  };

  render() {
    return (
      <div>
        <h2>Main Stages:</h2>
        <ul>{this.renderMainStages()}</ul>

        <h2>Sub Stages:</h2>
        {this.state.selectedMainStage ? (
          <ul>{this.renderSubStagesRecursive(jsonData.flows[this.state.selectedMainStage])}</ul>
        ) : (
          <p>No sub-stages selected.</p>
        )}
      </div>
    );
  }
}

export default StageButtons;




