import React from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Pending CR Approvals",         value: "2",    status: "At Risk" },
    { label: "Avg CR Age",                   value: "36h",  status: "At Risk" },
    { label: "Late CR Closures",             value: "1",    status: "At Risk" },
    { label: "CR Deployment Success Rate",   value: "95%",  status: "Healthy" },
    { label: "Change‑Control Lag",            value: "4h",   status: "Healthy" },
];

const statusColor = {
    Healthy: "text-green-600",
    "At Risk": "text-red-600",
};

const statusIcon = {
    Healthy: CheckCircleIcon,
    "At Risk": ExclamationTriangleIcon,
};

const ChangeControlActionsCard = () => (
    <GovernanceCard
        title="Change Control Actions"
        items={items}
        maxVisible={4}
        modalTitle="Full Change Control Actions Metrics"
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

export default ChangeControlActionsCard;
