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
        label: "jumpstart-app (APP-5670)",
        value: "5 unresolved audit actions, 3 stale exceptions",
        status: "High",
    },
    {
        label: "Team Velocity-X",
        value: "4 controls bypassed, no corrective plans filed",
        status: "High",
    },
    {
        label: "payments-core (APP-7781)",
        value: "3 recurring violations across quarters",
        status: "Medium",
    },
    {
        label: "Team Nova",
        value: "2 CRs failed review, approved post-deploy",
        status: "Medium",
    },
];

const HighRiskTeamsAppsCard = () => (
    <WideGovernanceCard
        title="High-Risk Teams & Apps"
        items={items}
        maxVisible={4}
        modalTitle="Entities with Persistent Governance Gaps"
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

export default HighRiskTeamsAppsCard;
