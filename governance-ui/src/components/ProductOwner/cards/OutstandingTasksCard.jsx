import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Submit Review", value: "Due 2025-08-01" },
    { label: "Attach Docs", value: "Due 2025-08-03" },
    { label: "Final Approval", value: "Due 2025-08-05" },
    { label: "Scope Sign-off", value: "Due 2025-08-07" },
];

const OutstandingTasksCard = () => (
    <GovernanceCard
        title="Outstanding Tasks"
        items={items}
        maxVisible={4}
        modalTitle="All Outstanding Tasks"
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

export default OutstandingTasksCard;
