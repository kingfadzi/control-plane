import React from 'react';
import GovernanceCard from '../../GovernanceCockpit/shared/GovernanceCard';

const items = [
    { label: 'Internal Dependencies', value: '8' },
    { label: 'External Dependencies', value: '3' },
    { label: 'Critical Dependencies', value: '2' },
    { label: 'CMDB Linked', value: 'Yes' },
];

const DependenciesCard = () => (
    <GovernanceCard
        title="Dependencies"
        items={items}
        maxVisible={4}
        modalTitle="Dependencies"
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

export default DependenciesCard;
