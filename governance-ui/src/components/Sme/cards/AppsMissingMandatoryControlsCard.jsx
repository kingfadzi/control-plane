import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const items = [
    {
        label: "jumpstart-app",
        value: "Missing PC-10 (LCT attestation not linked)",
        status: "At Risk",
    },
    {
        label: "claims-service",
        value: "Incomplete DC-09 (No SonarQube integration)",
        status: "At Risk",
    },
    {
        label: "fraud-detection",
        value: "Healthy – All required controls present",
        status: "Healthy",
    },
    {
        label: "onboarding-portal",
        value: "Missing DC-06 (Guild control not assigned)",
        status: "At Risk",
    },
];

const statusColor = {
    "At Risk": "text-red-600",
    Healthy: "text-green-600",
};

const statusIcon = {
    "At Risk": ExclamationTriangleIcon,
    Healthy: CheckCircleIcon,
};

const AppsMissingMandatoryControlsCard = () => (
    <GovernanceCard
        title="Apps Missing Mandatory Controls"
        items={items}
        maxVisible={3}
        modalTitle="All Apps Missing Mandatory Controls"
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

export default AppsMissingMandatoryControlsCard;
