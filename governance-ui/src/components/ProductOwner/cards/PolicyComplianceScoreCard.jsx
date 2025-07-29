import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Overall RAG", value: "🟡 Amber" },
    { label: "Failed Policies", value: "2" },
    { label: "Last Eval", value: "2025-07-15" },
    { label: "Auto-Enforced %", value: "75%" },
];

const PolicyComplianceScoreCard = () => (
    <GovernanceCard
        title="Policy Compliance"
        items={items}
        maxVisible={4}
        modalTitle="Policy Compliance Details"
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

export default PolicyComplianceScoreCard;
