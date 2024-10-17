// src/components/LLMInsights.js
import React, { useState } from 'react';
import '../styles.css'; 
const LLMInsights = () => {
    const [query, setQuery] = useState('');
    const [insights, setInsights] = useState(null);

    const handleSubmit = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/llm-insights/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        setInsights(data);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about ESG metrics..."
            />
            <button onClick={handleSubmit}>Get Insights</button>
            {insights && <div>{insights.choices[0].text}</div>}
        </div>
    );
};

export default LLMInsights;
