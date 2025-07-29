import React from 'react';

const ComplianceTrends = () => {
    const failedChecks = 3;
    const passRate = 92;

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">📉 Compliance Trends</h2>
            <p className="text-sm">Failed Checks: <strong>{failedChecks}</strong></p>
            <p className="text-sm">Policy Pass Rate: <strong>{passRate}%</strong></p>
            <p className="text-xs text-gray-600">Last 5 releases evaluated</p>
        </div>
    );
};

export default ComplianceTrends;
