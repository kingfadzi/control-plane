import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import GovernanceCard from './shared/GovernanceCard';

const metadata = [
    {
        label: 'App',
        value: 'jumpstart-app',
        status: 'ok',
        statusLabel: 'Registered',
    },
    {
        label: 'Owner',
        value: 'Jane Doe',
        status: 'ok',
        statusLabel: 'Confirmed',
    },
    {
        label: 'GitLab',
        value: 'repo-link',
        type: 'link',
        status: 'ok',
        statusLabel: 'Connected',
    },
    {
        label: 'Jira',
        value: 'board-link',
        type: 'link',
        status: 'ok',
        statusLabel: 'Connected',
    },
    {
        label: 'Governance',
        value: 'Onboarded',
        status: 'ok',
        statusLabel: '✅',
    },
    {
        label: 'Last Audit',
        value: '2025-07-15',
        status: 'ok',
        statusLabel: 'Recent',
    },
];

const statusColor = {
    ok: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
};

const ApplicationOverview = () => (
    <GovernanceCard
        title="Application Overview"
        items={metadata}
        maxVisible={3}
        renderItem={(item) => (
            <li key={item.label} className="flex flex-col bg-slate-50 border border-slate-100 rounded px-3 py-2">
                <div className="flex justify-between items-center text-sm font-medium text-slate-700">
                    <span>{item.label}</span>
                    {item.type === 'link' ? (
                        <a href="#" className="text-xs text-blue-600 underline">{item.value}</a>
                    ) : (
                        <span className="text-xs text-slate-500">{item.value}</span>
                    )}
                </div>
                <div className={`mt-1 flex items-center text-sm ${statusColor[item.status]}`}>
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    {item.statusLabel}
                </div>
            </li>
        )}
    />
);

export default ApplicationOverview;
