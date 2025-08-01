import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const items = [
    { label: "platform-api", value: "🔴 Blocked: SME approval overdue", status: "High" },
    { label: "claims-analytics", value: "⚠️ Control review needed", status: "Medium" },
];

const statusColor = {
    High: "text-red-600",
    Medium: "text-yellow-600",
    Low: "text-green-600",
};

const statusIcon = {
    High: ExclamationTriangleIcon,
    Medium: ExclamationTriangleIcon,
    Low: CheckCircleIcon,
};

const BlockedTasksCard = () => (
    <GovernanceCard
        title="Controls With Blocked Governance Tasks"
        items={items}
        maxVisible={4}
        modalTitle="Controls With Blocked Governance Tasks"
        renderItem={(item) => {
            const Icon = statusIcon[item.status] || CheckCircleIcon;
            const color = statusColor[item.status] || "text-gray-500";
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

export default BlockedTasksCard;
