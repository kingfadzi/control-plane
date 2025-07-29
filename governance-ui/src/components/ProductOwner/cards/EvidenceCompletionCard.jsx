import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Submitted / Expected", value: "15/20" },
    { label: "Overdue Items", value: "5" },
    { label: "Avg. Age", value: "12 days" },
    { label: "Missing Types", value: "DR Plan" },
];

const EvidenceCompletionCard = () => (
    <GovernanceCard
        title="Evidence Completion"
        items={items}
        maxVisible={4}
        modalTitle="Evidence Completion Details"
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

export default EvidenceCompletionCard;
