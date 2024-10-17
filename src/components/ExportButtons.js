import React from 'react';

const ExportButtons = ({ esgData }) => {
    const handleExportCSV = () => {
        const csvData = [
            ['Metric', 'Value'],
            ['Environmental', esgData.environmental],
            ['Social', esgData.social],
            ['Governance', esgData.governance],
            ['ESG Score', esgData.esg_score],
        ];
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + csvData.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "esg_data.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
    };

    return (
        <div className="text-center">
            <button onClick={handleExportCSV} className="btn btn-primary">Export as CSV</button>
        </div>
    );
};

export default ExportButtons;
