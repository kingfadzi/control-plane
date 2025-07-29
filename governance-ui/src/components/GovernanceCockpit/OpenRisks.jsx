import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import GovernanceCard from './shared/GovernanceCard';

const risks = [
    { title: 'Missing privacy impact assessment', severity: 'High', owner: 'Security' },
    { title: 'Incomplete threat model', severity: 'Medium', owner: 'Architecture' },
    { title: 'Lack of rollback procedure', severity: 'High', owner: 'Release Manager' },
    { title: 'Unmitigated dependency vulnerability', severity: 'High', owner: 'DevOps' },
    { title: 'No business continuity plan', severity: 'Medium', owner: 'Product Owner' },
];

const severityColor = {
    High: 'text-red-600',
    Medium: 'text-yellow-600',
    Low: 'text-gray-500',
};

const OpenRisks = () => {
    return (
        <GovernanceCard
            title="Open Risks"
            items={risks}
            maxVisible={3}
            modalTitle="All Open Risks"
            renderItem={(risk) => (
                <li key={risk.title} className="flex flex-col gap-1 bg-slate-50 border border-slate-100 rounded px-3 py-2">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-700">{risk.title}</span>
                        <span className="text-xs text-slate-500">{risk.owner}</span>
                    </div>
                    <div className={`flex items-center text-sm ${severityColor[risk.severity]}`}>
                        <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                        {risk.severity} Severity
                    </div>
                </li>
            )}
        />
    );
};

export default OpenRisks;
