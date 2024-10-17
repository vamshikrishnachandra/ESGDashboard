import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import ExportButtons from './ExportButtons'; // Ensure this import is included
import '../styles.css'; // Assuming you have styles in this file
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/companies/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCompanies(data);
                if (data.length > 0) {
                    setSelectedCompanyId(data[0].id); // Set the first company as default
                }
            })
            .catch((error) => console.error('Error fetching companies:', error));
    }, []);

    useEffect(() => {
        if (selectedCompanyId) {
            fetch(`http://127.0.0.1:8000/api/fetch-esg-data/${selectedCompanyId}/`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('ESG Data:', data);
                    setData(data);
                })
                .catch((error) => console.error('Error fetching ESG data:', error));
        }
    }, [selectedCompanyId]);

    const chartData = data ? {
        labels: ['Environmental', 'Social', 'Governance'],
        datasets: [
            {
                label: `${companies.find(c => c.id === selectedCompanyId)?.name} ESG Metrics`,
                data: [data.environmental, data.social, data.governance],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    } : {};

    return (
        <div className="dashboard-container container mt-5">
            <h1 className="text-center mb-4">ESG Dashboard</h1>
            <div className="form-group">
                <label htmlFor="company-select">Select Company:</label>
                <select
                    id="company-select"
                    className="form-control"
                    value={selectedCompanyId || ''}
                    onChange={(e) => setSelectedCompanyId(Number(e.target.value))}
                >
                    {companies.map(company => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                </select>
            </div>
            <div className="chart-container mb-4">
                {data ? (
                    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                        <Line 
                            data={chartData} 
                            height={300}  // Reduced height
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }} 
                        />
                    </div>
                ) : <div>Loading...</div>}
            </div>
            {data && (
                <div className="esg-info mb-4 text-center">
                    <h3>{companies.find(c => c.id === selectedCompanyId)?.name} ESG Score: {data.esg_score}</h3>
                </div>
            )}
            {data && <ExportButtons esgData={data} />} {/* Pass data to ExportButtons */}
        </div>
    );
};

export default Dashboard;
