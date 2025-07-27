import React from 'react';

const GovernanceReadinessScore = () => {
    const score = 78;

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">📊 Governance Readiness</h2>
            <p className="text-sm mb-1">Score: <strong>{score}%</strong></p>
            <p className="text-xs text-gray-600">Based on available artifacts, risk items, and SME feedback.</p>
        </div>
    );
};

export default GovernanceReadinessScore;
