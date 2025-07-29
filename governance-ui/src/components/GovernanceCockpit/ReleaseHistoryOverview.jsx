import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import GovernanceCard from './shared/GovernanceCard';

const releases = [
    { release: '2025.07.01', status: 'Complete', deployed: 'Yes' },
    { release: '2025.06.15', status: 'Complete', deployed: 'Yes' },
    { release: '2025.06.01', status: 'Failed', deployed: 'No' },
    { release: '2025.05.15', status: 'Complete', deployed: 'Yes' },
];

const statusColor = {
    Complete: 'text-green-600',
    Failed: 'text-red-600',
};

const statusIcon = {
    Complete: CheckCircleIcon,
    Failed: XCircleIcon,
};

const ReleaseHistoryOverview = () => (
    <GovernanceCard
        title="Release History Overview"
        items={releases}
        maxVisible={3}
        modalTitle="All Releases"
        renderItem={(r) => {
            const Icon = statusIcon[r.status];
            const color = statusColor[r.status];
            return (
                <li key={r.release} className="flex flex-col gap-1 bg-slate-50 border border-slate-100 rounded px-3 py-2">
                    <div className="flex justify-between">
                        <span className="text-slate-700">{r.release}</span>
                        <span className="text-xs text-slate-500">Deployed: {r.deployed}</span>
                    </div>
                    <div className={`flex items-center text-sm ${color}`}>
                        <Icon className="w-4 h-4 mr-1" />
                        {r.status}
                    </div>
                </li>
            );
        }}
    />
);

export default ReleaseHistoryOverview;
