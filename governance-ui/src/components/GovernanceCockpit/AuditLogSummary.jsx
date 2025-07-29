import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import GovernanceCard from './shared/GovernanceCard';

const logs = [
    { action: 'Control Approved', actor: 'Security Lead', timestamp: '2025-07-20', status: 'Complete' },
    { action: 'Policy Updated', actor: 'Compliance Officer', timestamp: '2025-07-19', status: 'Complete' },
    { action: 'Risk Acknowledged', actor: 'Product Owner', timestamp: '2025-07-17', status: 'Complete' },
    { action: 'Change Request Rejected', actor: 'Release Manager', timestamp: '2025-07-14', status: 'Rejected' },
];

const statusColor = {
    Complete: 'text-green-600',
    Rejected: 'text-red-600',
};

const statusIcon = {
    Complete: CheckCircleIcon,
    Rejected: XCircleIcon,
};

const AuditLogSummary = () => (
    <GovernanceCard
        title="Audit Log Summary"
        items={logs}
        maxVisible={3}
        modalTitle="Full Audit Log"
        renderItem={(log) => {
            const Icon = statusIcon[log.status];
            const color = statusColor[log.status];
            return (
                <li key={log.timestamp + log.action} className="flex flex-col gap-1 bg-slate-50 border border-slate-100 rounded px-3 py-2">
                    <div className="flex justify-between">
                        <span className="text-slate-700">{log.action}</span>
                        <span className="text-xs text-slate-500">{log.actor}</span>
                    </div>
                    <div className={`flex items-center text-sm ${color}`}>
                        <Icon className="w-4 h-4 mr-1" />
                        {log.status}
                    </div>
                </li>
            );
        }}
    />
);

export default AuditLogSummary;
