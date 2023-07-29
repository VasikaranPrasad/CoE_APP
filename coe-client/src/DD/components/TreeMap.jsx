import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


const Treemap = ({ data }) => {

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Fetch the hierarchical JSON data from the backend API using Axios
    axios
      .get('/YOUR_BACKEND_API_ENDPOINT')
      .then((response) => setJsonData(response.data))
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  // Function to transform the hierarchical JSON data into the required format for Plotly treemap
  const transformData = (node, parent = '', hovertext = '') => {
    const treemapData = {
      labels: [],
      parents: [],
      values: [],
      hovertext: [],
    };

    const instanceName = node.Instance;
    const moduleName = node.Module;
    const cellCount = node.Cell_Count;
    const cellArea = node.Cell_Area;
    const netArea = node.Net_Area;
    const totalArea = node.Total_Area;

    const currentHoverText = `${moduleName}<br>
      Cell Count: ${cellCount}<br>
      Cell Area: ${cellArea}<br>
      Net Area: ${netArea}<br>
      Total Area: ${totalArea}`;

    hovertext += hovertext.length > 0 ? '<br>---<br>' : ''; // Add separator if needed
    hovertext += currentHoverText;

    treemapData.labels.push(instanceName);
    treemapData.parents.push(parent);
    treemapData.values.push(totalArea);
    treemapData.hovertext.push(hovertext);

    if (node.Sublevel && node.Sublevel.length > 0) {
      node.Sublevel.forEach((subNode) => {
        const subData = transformData(subNode, instanceName, hovertext);
        treemapData.labels.push(...subData.labels);
        treemapData.parents.push(...subData.parents);
        treemapData.values.push(...subData.values);
        treemapData.hovertext.push(...subData.hovertext);
      });
    }

    return treemapData;
  };

  // Transform the JSON data into the Plotly treemap format
  const treemapData = transformData(data);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Plot
    data={[
      {
        type: 'treemap',
        labels: treemapData.labels,
        parents: treemapData.parents,
        values: treemapData.values,
        hovertext: treemapData.hovertext, // Set the custom hover text
        hoverinfo: 'text', // Show hovertext on hover
      },
    ]}
    layout={{
  title: 'Treemap of Hierarchical Data',
  width: window.innerWidth * 0.8, // Set the width to 80% of the window width
  height: window.innerHeight * 1,
  margin: { l: 20, r: 20, t: 40, b: 20 }, // Adjust margins as needed
  displaylogo: false, // Set displaylogo to false to remove the Plotly logomark
  hoverlabel: {
    font: {
      size: 8, // Adjust the font size to your preferred smaller value
      color: 'white',
    },
    bgcolor: '#0E0806', // Customize the background color
    bordercolor: 'none', // Customize the border color (if needed)
    borderwidth: 0, // Customize the border width (if needed)
  },

    }}
    config={{
      displayModeBar: true, // Set displayModeBar to false to hide the mode bar (toolbar)
    }}
  />
  </div>
);
};

export default Treemap;
