import React from 'react';
import GovernanceCard from '../../GovernanceCockpit/shared/GovernanceCard';

const items = [
    { label: 'Product', value: 'jumpstart-app' },
    { label: 'Owner', value: 'Jane Doe' },
    { label: 'Business Unit', value: 'Digital Services' },
    { label: 'Criticality', value: 'High' },
];

const AppOwnershipCard = () => (
    <GovernanceCard
        title="Application Ownership"
        items={items}
        maxVisible={4}
        modalTitle="Application Ownership"
        renderItem={item => (
            <li
                key={item.label}
                className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded px-3 py-2"
            >
                <span className="text-slate-700 text-sm">{item.label}</span>
                <span className="text-xs text-slate-500">{item.value}</span>
            </li>
        )}
    />
);

export default AppOwnershipCard;
