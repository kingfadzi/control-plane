import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Technical Risks", value: "40%" },
    { label: "Process Risks", value: "30%" },
    { label: "Third-Party Risks", value: "20%" },
    { label: "Residual Risk", value: "10%" },
];

const RiskBreakdownCard = () => (
    <GovernanceCard
        title="Risk Breakdown"
        items={items}
        maxVisible={4}
        modalTitle="Risk Breakdown Details"
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

export default RiskBreakdownCard;
