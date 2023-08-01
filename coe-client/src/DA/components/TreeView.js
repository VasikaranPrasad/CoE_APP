import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TreeView = () => {
  const svgRef = useRef(null);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Fetch the JSON data from the file
    fetch('../../output.json')
      .then(response => response.json())
      .then(data => setJsonData(data))
      .catch(error => console.error('Error loading JSON:', error));
  }, []);

  useEffect(() => {
    if (!jsonData) return;

    // D3.js code to display the hierarchy
    const width = 600;
    const height = 600;
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const root = d3.hierarchy(jsonData);

    const treeLayout = d3.tree().size([height, width - 100]);

    treeLayout(root);

    const link = svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
      );

    const node = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
      .attr('transform', d => `translate(${d.y}, ${d.x})`);

    node.append('circle')
      .attr('r', 10);

    node.append('text')
      .attr('dy', '.35em')
      .attr('x', d => d.children ? -13 : 13)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name);

  }, [jsonData]);

  return <svg ref={svgRef}></svg>;
};

export default TreeView;
