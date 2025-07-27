import React from 'react';

const RisksAndBlockers = () => {
    const risks = [
        { id: 'RISK-1', title: 'Incomplete access policy', domain: 'Security', severity: 'High' },
        { id: 'RISK-2', title: 'Pending performance testing', domain: 'Performance', severity: 'Medium' },
    ];

    return (
        <div className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">⚠️ Risks & Blockers</h2>
            <ul className="space-y-2">
                {risks.map(risk => (
                    <li key={risk.id} className="border p-2 rounded">
                        <p><strong>{risk.title}</strong> ({risk.domain})</p>
                        <p className="text-sm text-red-600">Severity: {risk.severity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RisksAndBlockers;
