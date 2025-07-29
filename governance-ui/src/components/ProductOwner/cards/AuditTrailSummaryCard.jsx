import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Control Reviews", value: "10 recent" },
    { label: "Evidence Edits", value: "8 recent" },
    { label: "SME Sign‑offs", value: "5 recent" },
    { label: "Audit Completes", value: "2 recent" },
];

const AuditTrailSummaryCard = () => (
    <GovernanceCard
        title="Audit Trail"
        items={items}
        maxVisible={4}
        modalTitle="Full Audit Trail"
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

export default AuditTrailSummaryCard;
