import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Repeat Control Fails", value: "3" },
    { label: "Blockers", value: "2" },
    { label: "Top Violated Control", value: "Access Control" },
    { label: "Accountable SME", value: "Jane Doe" },
];

const ViolationSummaryCard = () => (
    <GovernanceCard
        title="Violations"
        items={items}
        maxVisible={4}
        modalTitle="Violation Details"
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

export default ViolationSummaryCard;
