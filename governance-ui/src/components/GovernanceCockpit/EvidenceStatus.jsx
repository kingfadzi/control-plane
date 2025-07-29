import React from 'react';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import GovernanceCard from './shared/GovernanceCard';

const evidence = [
    {
        name: 'Architecture Review',
        status: 'Complete',
        stage: 'Product Onboarding',
    },
    {
        name: 'Security Scan',
        status: 'Missing',
        stage: 'Risk Mitigation & Validation',
    },
    {
        name: 'Test Report',
        status: 'Complete',
        stage: 'Policy Mobilization',
    },
    {
        name: 'DR Plan',
        status: 'Missing',
        stage: 'Audit & Traceability',
    },
];

const statusIcon = {
    Complete: CheckCircleIcon,
    Missing: XCircleIcon,
};

const statusColor = {
    Complete: 'text-green-600',
    Missing: 'text-red-600',
};

const EvidenceStatus = () => (
    <GovernanceCard
        title="Evidence Status"
        items={evidence}
        maxVisible={3}
        modalTitle="All Evidence"
        renderItem={(item) => {
            const Icon = statusIcon[item.status];
            const color = statusColor[item.status];
            return (
                <li
                    key={item.name}
                    className="flex flex-col gap-1 bg-slate-50 border border-slate-100 rounded px-3 py-2"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-slate-700 text-sm font-medium">{item.name}</span>
                        <span className="text-xs text-slate-500">{item.stage}</span>
                    </div>
                    <div className={`flex items-center text-sm ${color}`}>
                        <Icon className="w-4 h-4 mr-1" />
                        {item.status}
                    </div>
                </li>
            );
        }}
    />
);

export default EvidenceStatus;
