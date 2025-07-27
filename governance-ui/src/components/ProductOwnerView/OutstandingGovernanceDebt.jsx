import React from 'react';

const OutstandingGovernanceDebt = () => {
    const debts = [
        { item: 'Access Policy rejected twice', due: '2025-07-20' },
        { item: 'Security risk not mitigated', due: '2025-07-25' }
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">📌 Governance Debt</h2>
            <ul className="text-sm space-y-1">
                {debts.map((d, idx) => (
                    <li key={idx}>⚠️ {d.item} (Due: {d.due})</li>
                ))}
            </ul>
        </div>
    );
};

export default OutstandingGovernanceDebt;
