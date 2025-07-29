import React from 'react';
import {{ CheckCircleIcon, XCircleIcon }} from '@heroicons/react/24/solid';
import GovernanceCard from './shared/GovernanceCard';

const items = [{'action': 'Control Approved', 'actor': 'Security Lead', 'timestamp': '2025-07-20', 'status': 'Complete'}, {'action': 'Policy Updated', 'actor': 'Compliance Officer', 'timestamp': '2025-07-19', 'status': 'Complete'}, {'action': 'Change Request Rejected', 'actor': 'Release Manager', 'timestamp': '2025-07-14', 'status': 'Rejected'}];

const statusColor = {{
    Complete: 'text-green-600',
    Rejected: 'text-red-600',
    Pending: 'text-yellow-600'
}};

const statusIcon = {{
    Complete: CheckCircleIcon,
    Rejected: XCircleIcon,
    Pending: XCircleIcon
}};

const AuditLogSummary = () => (
    <GovernanceCard
        title="Audit Log Summary"
        items=[{'action': 'Control Approved', 'actor': 'Security Lead', 'timestamp': '2025-07-20', 'status': 'Complete'}, {'action': 'Policy Updated', 'actor': 'Compliance Officer', 'timestamp': '2025-07-19', 'status': 'Complete'}, {'action': 'Change Request Rejected', 'actor': 'Release Manager', 'timestamp': '2025-07-14', 'status': 'Rejected'}]
        maxVisible={3}
        modalTitle="Full Audit Log Summary"
        renderItem={{(item) => {{
            const Icon = statusIcon[item.status];
            const color = statusColor[item.status];
            return (
                <li key={{item.title || item.timestamp}} className="flex flex-col gap-1 bg-slate-50 border border-slate-100 rounded px-3 py-2">
                    <div className="flex justify-between">
                        <span className="text-slate-700">{{item.title || item.action}}</span>
                        <span className="text-xs text-slate-500">{{item.owner || item.actor}}</span>
                    </div>
                    <div className={{`flex items-center text-sm ${{color}`}}>
                        <Icon className="w-4 h-4 mr-1" />
                        {{item.status}}
                    </div>
                </li>
            );
        }}}
    />
);

export default AuditLogSummary;
