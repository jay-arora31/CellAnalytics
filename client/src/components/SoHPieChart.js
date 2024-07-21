import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { axiosPrivateInstance } from '../api/apiConfig';
import useAuth from '../hooks/useAuth';

const SoHPieChart = () => {
    const [sohData, setSohData] = useState([]);
    const { accessToken } = useAuth(); // Get the access token from the context

    useEffect(() => {
        const fetchSoHData = async () => {
            try {
                const response = await axiosPrivateInstance.get('api/soh/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}` // Include the token in the request headers
                    }
                });
                console.log(response.data); // Debugging log to ensure data is fetched correctly
                setSohData(response.data);
            } catch (error) {
                console.error('Error fetching SoH data:', error);
            }
        };

        fetchSoHData();
    }, [accessToken]); // Ensure accessToken is a dependency

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
            <h2 style={{ textAlign: 'center', margin: '20px 0', marginLeft: '100px' }}>State of Health</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '200px' }}>
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
