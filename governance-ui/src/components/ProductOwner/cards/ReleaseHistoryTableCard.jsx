import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "RLS-001", value: "2025-07-01 | Complete" },
    { label: "RLS-002", value: "2025-08-05 | In Progress" },
    { label: "RLS-000", value: "2025-06-15 | Complete" },
    { label: "RLS-099", value: "2025-05-30 | Failed" },
];

const ReleaseHistoryTableCard = () => (
    <GovernanceCard
        title="Release History"
        items={items}
        maxVisible={4}
        modalTitle="Full Release History"
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

export default ReleaseHistoryTableCard;
