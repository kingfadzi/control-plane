import React from 'react';

const SmeView = ({ app, releases }) => {
    return (
        <div className="font-sans">
            <h1 className="text-2xl font-bold mb-4">SME Dashboard</h1>
            <p className="text-gray-600">This view will display SME-relevant governance information, including open review items, pending risk assessments, and assigned control tasks.</p>
        </div>
    );
};

export default SmeView;
