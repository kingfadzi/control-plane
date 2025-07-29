import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "RLS-001", value: "85%" },
    { label: "RLS-002", value: "70%" },
    { label: "RLS-000", value: "90%" },
    { label: "RLS-099", value: "60%" },
];

const GovernanceScoreHistoryCard = () => (
    <GovernanceCard
        title="Governance Score Trend"
        items={items}
        maxVisible={4}
        modalTitle="Governance Score History"
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

export default GovernanceScoreHistoryCard;
