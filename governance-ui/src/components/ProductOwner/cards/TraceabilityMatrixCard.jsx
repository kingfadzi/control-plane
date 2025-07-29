import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Code→Jira Links", value: "12/15" },
    { label: "Jira→Evidence", value: "10/12" },
    { label: "CR→Controls", value: "8/10" },
    { label: "Release→Audit", value: "5/5" },
];

const TraceabilityMatrixCard = () => (
    <GovernanceCard
        title="Traceability Matrix"
        items={items}
        maxVisible={4}
        modalTitle="Full Traceability Matrix"
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

export default TraceabilityMatrixCard;
