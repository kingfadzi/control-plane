import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Governance Review", value: "2025-08-10" },
    { label: "Security Audit", value: "2025-08-15" },
    { label: "Release Freeze", value: "2025-08-20" },
    { label: "Go/No-Go", value: "2025-08-25" },
];

const UpcomingMilestonesCard = () => (
    <GovernanceCard
        title="Upcoming Milestones"
        items={items}
        maxVisible={4}
        modalTitle="All Upcoming Milestones"
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

export default UpcomingMilestonesCard;
