// src/components/ProductOwner/cards/ExceptionsCard.jsx
import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "PIA Delay", value: "Expires 2025-08-10" },
    { label: "Security Scan Exception", value: "Expires 2025-08-05" },
    { label: "Policy Update Waiver", value: "Expires 2025-09-01" },
    { label: "Audit Relief", value: "Expires 2025-07-30" },
];

const ExceptionsCard = () => (
    <GovernanceCard
        title="Exceptions"
        items={items}
        maxVisible={4}
        modalTitle="All Exceptions"
        renderItem={(item) => (
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

export default ExceptionsCard;
