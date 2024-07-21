import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useParams } from 'react-router-dom';
import './CellChart.css'; // Ensure you import the CSS file for grid layout

const CellChart = () => {
  const { cellId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (cellId) {
      fetch(`http://localhost:8000/api/cell-data/${cellId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched cell data:', data); // Log the data to check its structure
          setData(data);
        })
        .catch(error => console.error('Error fetching cell data:', error));
    }
  }, [cellId]);

  if (!data) return <p>Loading... {cellId}</p>;

  // Calculate SoH
  const { discharge_capacity, nominal_capacity, data: cellData } = data;
  const soh = (discharge_capacity / nominal_capacity) * 100;

  // Extract and format the data for charts
  const timeData = cellData.map(item => item.time_data);
  const currentData = cellData.map(item => item.current_data);
  const voltageData = cellData.map(item => item.voltage_data);
  const capacityData = cellData.map(item => item.capacity_data);
  const temperatureData = cellData.map(item => item.temperature_data);

  // Prepare data for charts
  const lineData = [
    { x: timeData, y: currentData, type: 'scatter', mode: 'lines', name: 'Current Data' },
    { x: timeData, y: voltageData, type: 'scatter', mode: 'lines', name: 'Voltage Data' },
    { x: timeData, y: capacityData, type: 'scatter', mode: 'lines', name: 'Capacity Data' },
    { x: timeData, y: temperatureData, type: 'scatter', mode: 'lines', name: 'Temperature Data' }
  ];

  return (
    <div>
      <h2>Cell Data for Cell ID: {cellId}</h2>
      <div className="chart-grid">
        <div className="chart-item">
          <Plot
            data={[lineData[0]]}
            layout={{ title: `Current Vs Time`, xaxis: { title: 'Time' }, yaxis: { title: 'Current' }, height: 400, width: 500 }}
          />
        </div>
        <div className="chart-item">
          <Plot
            data={[lineData[1]]}
            layout={{ title: `Voltage Vs Time`, xaxis: { title: 'Time' }, yaxis: { title: 'Voltage' }, height: 400, width: 500 }}
          />
        </div>
        <div className="chart-item">
          <Plot
            data={[lineData[2]]}
            layout={{ title: `Capacity Vs Time`, xaxis: { title: 'Time' }, yaxis: { title: 'Capacity' }, height: 400, width: 500 }}
          />
        </div>
        <div className="chart-item">
          <Plot
            data={[lineData[3]]}
            layout={{ title: `Temperature Vs Time`, xaxis: { title: 'Time' }, yaxis: { title: 'Temperature' }, height: 400, width: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default CellChart;
