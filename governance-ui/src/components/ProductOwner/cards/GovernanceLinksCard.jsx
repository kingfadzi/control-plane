import React from 'react';
import GovernanceCard from '../../GovernanceCockpit/shared/GovernanceCard';

const items = [
    { label: 'GitLab Repo', value: 'repo-link' },
    { label: 'Jira Board', value: 'board-link' },
    { label: 'ServiceNow CR', value: 'cr-link' },
    { label: 'Backstage Catalog', value: 'backstage-link' },
];

const GovernanceLinksCard = () => (
    <GovernanceCard
        title="Governance Links"
        items={items}
        maxVisible={4}
        modalTitle="Governance Links"
        renderItem={item => (
            <li
                key={item.label}
                className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded px-3 py-2"
            >
                <span className="text-slate-700 text-sm">{item.label}</span>
                <a href="#" className="text-xs text-blue-600 underline">
                    {item.value}
                </a>
            </li>
        )}
    />
);

export default GovernanceLinksCard;
