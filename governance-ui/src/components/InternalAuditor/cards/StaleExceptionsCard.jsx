import React from "react";
import WideGovernanceCard from "../../GovernanceCockpit/shared/WideGovernanceCard";
import { ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const statusIcon = {
    High: XCircleIcon,
    Medium: ExclamationTriangleIcon,
    Low: CheckCircleIcon,
};

const statusColor = {
    High: "text-red-600",
    Medium: "text-yellow-600",
    Low: "text-green-600",
};

const items = [
    {
        label: "RSK-9981 (Data Retention Risk)",
        value: "Open for 327 days, no updates logged",
        status: "High",
    },
    {
        label: "EXC-1234 (Crypto Library Override)",
        value: "Missed 3 deadlines, still open",
        status: "High",
    },
    {
        label: "RSK-4411 (Access Control Drift)",
        value: "Reopened twice, evidence unchanged",
        status: "Medium",
    },
    {
        label: "EXC-0082 (Unsupported DB Version)",
        value: "Accepted, but no migration activity",
        status: "Medium",
    },
];

const StaleExceptionsCard = () => (
    <WideGovernanceCard
        title="Stale Exceptions & Delayed Remediation"
        items={items}
        maxVisible={4}
        modalTitle="Exceptions and Risks Lacking Timely Resolution"
        renderItem={(item) => {
            const Icon = statusIcon[item.status] || CheckCircleIcon;
            const color = statusColor[item.status] || "text-gray-500";
            return (
                <li
                    key={item.label}
                    className="flex flex-col gap-0.5 bg-slate-50 border border-slate-100 rounded px-2 py-1"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-slate-700 text-sm truncate">{item.label}</span>
                        <span className="text-xs text-slate-500">{item.value}</span>
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

export default StaleExceptionsCard;
