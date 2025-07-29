import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "CR Approvals", value: "2 pending" },
    { label: "Jira Sign-off", value: "3 pending" },
    { label: "PMO Gate", value: "1 pending" },
    { label: "Legal Review", value: "0 pending" },
];

const PendingApprovalsCard = () => (
    <GovernanceCard
        title="Pending Approvals"
        items={items}
        maxVisible={4}
        modalTitle="All Pending Approvals"
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

export default PendingApprovalsCard;
