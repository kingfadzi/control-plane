import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import WideGovernanceCard from "../../GovernanceCockpit/shared/WideGovernanceCard.jsx";

const items = [
    {
        app: "onboarding-ui",
        control: "DC-05",
        issue: "Jira ticket blocked by control owner",
        status: "At Risk",
        updated: "5d ago",
        action: "Resolve"
    },
    {
        app: "reporting-service",
        control: "PC-07",
        issue: "Control task not started",
        status: "At Risk",
        updated: "3d ago",
        action: "Follow Up"
    },
    {
        app: "claims-analytics",
        control: "DC-02",
        issue: "Control blocker resolved",
        status: "Healthy",
        updated: "Today",
        action: "—"
    }
];

const statusColor = {
    "At Risk": "text-red-600",
    "Healthy": "text-green-600"
};

const statusIcon = {
    "At Risk": ExclamationTriangleIcon,
    "Healthy": CheckCircleIcon
};

const GovernanceBlockersCard = () => (
    <WideGovernanceCard
        title="Governance Blockers"
        items={items}
        maxVisible={3}
        modalTitle="Blocked Governance Tasks"
        renderItem={(item) => {
            const Icon = statusIcon[item.status] || CheckCircleIcon;
            const color = statusColor[item.status] || "text-gray-500";
            return (
                <li key={item.app + item.control} className="flex flex-col gap-0.5 bg-slate-50 border border-slate-100 rounded px-2 py-1">
                    <div className="flex justify-between text-sm text-slate-700">
                        <span>{item.app}</span>
                        <span className="text-xs text-slate-500">{item.updated}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span>{item.control}: {item.issue}</span>
                        <span className={color + " flex items-center"}>
                            <Icon className="w-4 h-4 mr-1" /> {item.status}
                        </span>
                    </div>
                </li>
            );
        }}
    />
);

export default GovernanceBlockersCard;