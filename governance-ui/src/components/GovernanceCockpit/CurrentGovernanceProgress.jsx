import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import GovernanceCard from './shared/GovernanceCard';

const progress = [
    { label: 'Controls Engaged', value: '8 / 10', status: 'warning', statusLabel: 'Partial' },
    { label: 'Evidence Submitted', value: '12 / 15', status: 'warning', statusLabel: 'In Progress' },
    { label: 'Pending Approvals', value: '2 / 5', status: 'error', statusLabel: 'Delayed' },
];

const statusColor = {
    ok: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
};

const CurrentGovernanceProgress = () => (
    <GovernanceCard
        title="Governance Progress"
        items={progress}
        maxVisible={3}
        renderItem={(item) => (
            <li key={item.label} className="flex flex-col bg-slate-50 border border-slate-100 rounded px-3 py-2">
                <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-500">{item.value}</span>
                </div>
                <div className={`mt-1 flex items-center text-sm ${statusColor[item.status]}`}>
                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                    {item.statusLabel}
                </div>
            </li>
        )}
    />
);

export default CurrentGovernanceProgress;
