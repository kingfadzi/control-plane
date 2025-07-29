import React from 'react';

const CurrentRelease = () => {
    return (
        <div className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">🚦 Current Release Status</h2>
            <p><strong>ID:</strong> RLS-002</p>
            <p><strong>Target Date:</strong> 2025-08-05</p>
            <p><strong>Stage:</strong> SME Review</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p><strong>Countdown:</strong> 10 days</p>
            <p><strong>Status:</strong> 🟠 Risks Open</p>
        </div>
    );
};

export default CurrentRelease;
