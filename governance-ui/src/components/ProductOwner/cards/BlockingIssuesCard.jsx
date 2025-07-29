import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Failed Tests", value: "5" },
    { label: "Unlinked Docs", value: "3" },
    { label: "No Rollback", value: "1" },
    { label: "SLA Breach", value: "2" },
];

const BlockingIssuesCard = () => (
    <GovernanceCard
        title="Blocking Issues"
        items={items}
        maxVisible={4}
        modalTitle="All Blocking Issues"
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

export default BlockingIssuesCard;
