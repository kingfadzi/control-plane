import React from 'react';

const StageDetails = ({ stage }) => (
    <div className="border rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-3">{stage}</h2>
        <p className="text-sm text-gray-600 mb-2">Assigned Actors: [placeholder]</p>
        <p className="text-sm text-gray-600 mb-2">Required Actions: [placeholder]</p>
        <p className="text-sm text-gray-600 mb-2">Evidence: [placeholder]</p>
        <p className="text-sm text-gray-600 mb-2">Attestation: [placeholder]</p>
        <p className="text-sm text-gray-600 mb-2">Status: ⏳ In Progress</p>
    </div>
);

export default StageDetails;
