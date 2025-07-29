import React from 'react';

const EvidenceSummary = () => {
    const artifacts = [
        { type: 'Architecture Doc', status: '✅' },
        { type: 'Access Policy', status: '⏳' },
        { type: 'Test Results', status: '❌' },
    ];

    return (
        <div className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">📂 Evidence Summary</h2>
            <ul className="space-y-2">
                {artifacts.map((a, i) => (
                    <li key={i} className="border p-2 rounded flex justify-between">
                        <span>{a.type}</span>
                        <span>{a.status}</span>
                        <a href="#" className="text-blue-600 underline text-sm">Upload/Update</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EvidenceSummary;
