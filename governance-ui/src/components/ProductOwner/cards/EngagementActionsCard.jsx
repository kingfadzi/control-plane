import React from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Overall Guild Engagement Score", value: "75",  status: "At Risk" },
    { label: "Low Engagement Violations",       value: "1",   status: "At Risk" },
    { label: "Open SME Action Items",          value: "3",   status: "At Risk" },
    { label: "SME Assignment Coverage",        value: "100%",status: "Healthy" },
    { label: "SME Response Time",              value: "12h", status: "Healthy" },
];

const statusColor = {
    Healthy: "text-green-600",
    "At Risk": "text-red-600",
};

const statusIcon = {
    Healthy: CheckCircleIcon,
    "At Risk": ExclamationTriangleIcon,
};

const EngagementActionsCard = () => (
    <GovernanceCard
        title="Engagement Actions"
        items={items}
        maxVisible={4}
        modalTitle="Full Engagement Actions Metrics"
        renderItem={(item) => {
            const Icon = statusIcon[item.status];
            const color = statusColor[item.status];
            return (
                <li
                    key={item.label}
                    className="flex flex-col gap-0.5 bg-slate-50 border border-slate-100 rounded px-2 py-1 min-w-0"
                >
                    <div className="flex justify-between items-center min-w-0">
                        <span className="text-slate-700 text-sm whitespace-nowrap truncate">
                            {item.label}
                        </span>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                            {item.value}
                        </span>
                    </div>
                    <div className={`flex items-center text-xs ${color}`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {item.status}
                    </div>
                </li>
            );
        }}
    />
);

export default EngagementActionsCard;
