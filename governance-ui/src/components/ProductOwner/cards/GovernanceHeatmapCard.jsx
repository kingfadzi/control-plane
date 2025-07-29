import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Security vs Privacy", value: "80% | 60%" },
    { label: "Risk vs Compliance", value: "70% | 85%" },
    { label: "Ops vs Financial", value: "90% | 50%" },
    { label: "SME Distribution", value: "5 SMEs" },
];

const GovernanceHeatmapCard = () => (
    <GovernanceCard
        title="Governance Heatmap"
        items={items}
        maxVisible={4}
        modalTitle="Governance Heatmap Details"
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

export default GovernanceHeatmapCard;
