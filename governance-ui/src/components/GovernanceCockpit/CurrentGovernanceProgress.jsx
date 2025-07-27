// src/components/ProductOwnerView/CurrentGovernanceProgress.jsx
import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const getStatusIcon = (value, total) => {
    const percent = value / total;
    if (percent >= 0.9) {
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
    } else if (percent >= 0.5) {
        return <ExclamationCircleIcon className="w-4 h-4 text-yellow-500" />;
    } else {
        return <XCircleIcon className="w-4 h-4 text-red-500" />;
    }
};

const CurrentGovernanceProgress = () => {
    const controlsEngaged = { value: 8, total: 10 };
    const evidenceSubmitted = { value: 12, total: 15 };
    const pendingApprovals = { value: 2, total: 5 };

    const metrics = [
        {
            label: 'Controls Engaged',
            ...controlsEngaged,
        },
        {
            label: 'Evidence Submitted',
            ...evidenceSubmitted,
        },
        {
            label: 'Pending Approvals',
            ...pendingApprovals,
        },
    ];

    return (
        <div className="flex flex-col rounded-lg bg-white shadow-sm max-w-96 p-4 border border-slate-200">
            <div className="pb-3 mb-3 border-b border-slate-200">
                <h2 className="text-base font-semibold text-slate-800 text-center">Governance Progress</h2>
            </div>
            <ul className="flex flex-col gap-2">
                {metrics.map(({ label, value, total }) => (
                    <li key={label} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{label}</span>
                        <div className="flex items-center gap-1">
              <span className="text-slate-700 font-medium">
                {value} / {total}
              </span>
                            {getStatusIcon(value, total)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CurrentGovernanceProgress;
