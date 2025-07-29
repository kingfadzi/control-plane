import React from 'react';
import GovernanceCard from '../../GovernanceCockpit/shared/GovernanceCard';

const items = [
    { label: 'Lifecycle Stage', value: 'Active' },
    { label: 'Onboarding', value: 'Complete' },
    { label: 'Classification', value: 'Confidential' },
    { label: 'Audit Scope', value: 'In-Scope' },
];

const ProductStatusCard = () => (
    <GovernanceCard
        title="Product Status"
        items={items}
        maxVisible={4}
        modalTitle="Product Status"
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

export default ProductStatusCard;
