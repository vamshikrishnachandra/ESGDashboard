// src/components/ESGChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import '../styles.css'; 
const ESGChart = ({ company }) => {
    const [esgData, setEsgData] = useState(null);

    useEffect(() => {
        if (company) {
            fetch(`http://127.0.0.1:8000/api/companies/`)
                .then((response) => response.json())
                .then((data) => setEsgData(data));
        }
    }, [company]);

    const chartData = esgData ? {
        labels: ['Environmental', 'Social', 'Governance'],
        datasets: [
            {
                label: `${company} ESG Score`,
                data: [esgData.environmental, esgData.social, esgData.governance],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    } : {};

    return esgData ? <Line data={chartData} /> : <div>Loading...</div>;
};

export default ESGChart;
