// src/components/SoHPieChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const SoHPieChart = () => {
    const [sohData, setSohData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/soh/')
            .then(response => {
                console.log(response.data); // Debugging log to ensure data is fetched correctly
                setSohData(response.data);
            })
            .catch(error => {
                console.error('Error fetching SoH data:', error);
            });
    }, []);

    const renderPieChart = (cell) => {
        const sizes = [cell.soh, 100 - cell.soh];
        const labels = ['SoH', 'Remaining'];

        return (
            <Plot
                data={[
                    {
                        values: sizes,
                        labels: labels,
                        type: 'pie',
                        textinfo: 'label+percent',
                        insidetextorientation: 'radial',
                        marker: {
                            colors: ['#1f77b4', '#ff7f0e'],
                        },
                    }
                ]}
                layout={{
                    title: {
                        text: `Cell ${cell.cell_id} SoH`,
                        font: {
                            size: 14,
                            family: 'Arial, sans-serif'
                        },
                        y: 0.0
                    },
                    width: 300,
                    height: 300,
                    margin: { t: 40, b: 20, l: 20, r: 20 },
                    showlegend: false,
                    annotations: [
                        {
                            font: {
                                size: 14,
                                family: 'Arial, sans-serif'
                            },
                            showarrow: false,
                            text: `${cell.soh.toFixed(1)}%`,
                            x: 0.5,
                            y: 0.5
                        }
                    ]
                }}
                config={{
                    responsive: true
                }}
            />
        );
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: '20px 0',marginLeft:'100px' }}>State of Health </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'  ,marginLeft:'200px'}}>
                {sohData.map(cell => (
                    <div key={cell.cell_id} style={{ flex: '1 0 45%', padding: '10px', maxWidth: '400px' }}>
                        {renderPieChart(cell)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoHPieChart;
