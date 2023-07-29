import React from 'react';
import jsonData from '../../output.json';

const MainStageButton = ({ stage, onClick }) => {
  return (
    <button onClick={() => onClick(stage)}>
      {stage}
    </button>
  );
};

const SubStageButton = ({ stage, onClick }) => {
  return (
    <button onClick={() => onClick(stage)}>
      {stage}
    </button>
  );
};

class StageButtons extends React.Component {
  state = {
    selectedStage: null,
  };

  handleMainStageClick = (stage) => {
    this.setState({ selectedStage: stage });
  };

  handleSubStageClick = (stage) => {
    // Handle the sub-stage click here
    console.log('Sub-stage clicked:', stage);
  };

  renderMainStages = () => {
    const { flows } = jsonData;
    if (!flows) return null;

    return Object.keys(flows).map((mainStage) => (
      <MainStageButton
        key={mainStage}
        stage={mainStage}
        onClick={this.handleMainStageClick}
      />
    ));
  };

  renderSubStages = () => {
    const { selectedStage } = this.state;
    const { flows } = jsonData;
    if (!flows || !selectedStage || !flows[selectedStage]) return null;

    const mainStageData = flows[selectedStage];
    return mainStageData.steps.map((step, index) => {
      const subStage = Object.keys(step)[0];
      return (
        <SubStageButton
          key={index}
          stage={subStage}
          onClick={this.handleSubStageClick}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h2>Main Stages:</h2>
        {this.renderMainStages()}

        <h2>Sub Stages:</h2>
        {this.renderSubStages()}
      </div>
    );
  }
}

export default StageButtons;
