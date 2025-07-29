import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Mapped Controls", value: "24/30" },
    { label: "Engaged %", value: "80%" },
    { label: "Unmapped Controls", value: "6" },
    { label: "By Domain", value: "Security:10, Privacy:8" },
];

const ControlCoverageCard = () => (
    <GovernanceCard
        title="Control Coverage"
        items={items}
        maxVisible={4}
        modalTitle="Control Coverage Details"
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

export default ControlCoverageCard;
