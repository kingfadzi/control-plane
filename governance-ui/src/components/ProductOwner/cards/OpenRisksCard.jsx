import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Missing Privacy Assessment", value: "High" },
    { label: "Incomplete Threat Model", value: "Medium" },
    { label: "No Rollback Procedure", value: "High" },
    { label: "Unmitigated Dependency Vulnerability", value: "High" },
];

const OpenRisksCard = () => (
    <GovernanceCard
        title="Open Risks"
        items={items}
        maxVisible={4}
        modalTitle="All Open Risks"
        renderItem={item => (
            <li
                key={item.label}
                className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded px-3 py-2"
            >
                <span className="text-slate-700 text-sm">{item.label}</span>
                <span className="text-xs text-red-600">{item.value}</span>
            </li>
        )}
    />
);

export default OpenRisksCard;
