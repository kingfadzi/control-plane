import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import GovernanceCard from './shared/GovernanceCard';

const metrics = [
    { label: 'Response SLA Breaches', value: '2', status: 'warning' },
    { label: 'Missed Standups', value: '3', status: 'warning' },
    { label: 'Blocking Comments', value: '1', status: 'error' },
];

const statusColor = {
    warning: 'text-yellow-600',
    error: 'text-red-600',
    ok: 'text-green-600',
};

const CollaborationHealth = () => (
    <GovernanceCard
        title="Collaboration Health"
        items={metrics}
        maxVisible={3}
        modalTitle="All Metrics"
        renderItem={(item) => (
            <li
                key={item.label}
                className="flex flex-col bg-slate-50 border border-slate-100 rounded px-3 py-2"
            >
                <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-500">{item.value}</span>
                </div>
                <div className={`mt-1 flex items-center text-sm ${statusColor[item.status]}`}>
                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
            </li>
        )}
    />
);

export default CollaborationHealth;
