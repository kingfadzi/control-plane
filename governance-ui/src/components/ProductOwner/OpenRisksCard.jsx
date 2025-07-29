import React from 'react';
import {{ CheckCircleIcon, XCircleIcon }} from '@heroicons/react/24/solid';
import GovernanceCard from './shared/GovernanceCard';

const items = [{'title': 'Missing privacy assessment', 'owner': 'Security', 'status': 'Pending'}, {'title': 'Outdated threat model', 'owner': 'Architecture', 'status': 'Pending'}, {'title': 'No rollback procedure', 'owner': 'DevOps', 'status': 'Pending'}];

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

const OpenRisksCard = () => (
    <GovernanceCard
        title="Open Risks"
        items=[{'title': 'Missing privacy assessment', 'owner': 'Security', 'status': 'Pending'}, {'title': 'Outdated threat model', 'owner': 'Architecture', 'status': 'Pending'}, {'title': 'No rollback procedure', 'owner': 'DevOps', 'status': 'Pending'}]
        maxVisible={3}
        modalTitle="Full Open Risks"
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

export default OpenRisksCard;
