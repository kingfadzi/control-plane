// src/components/ProductOwner/cards/ArtifactTestingCard.jsx
import React from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Product Vision",    value: "85%",  status: "Healthy" },
    { label: "Product Roadmap",    value: "70%",  status: "At Risk" },
    { label: "Architecture Vision",value: "95%",  status: "Healthy" },
    { label: "Service Vision",     value: "90%",  status: "Healthy" },
    { label: "Security Vision",    value: "60%",  status: "At Risk" },
    { label: "Lean Test Vision",   value: "50%",  status: "At Risk" },
];

const statusColor = {
    Healthy: "text-green-600",
    "At Risk": "text-red-600",
};

const statusIcon = {
    Healthy: CheckCircleIcon,
    "At Risk": ExclamationTriangleIcon,
};

const ArtifactTestingCard = () => (
    <GovernanceCard
        title="Mandarory Artifact Completion"
        items={items}
        maxVisible={4}
        modalTitle="Mandarory Artifact Completion"
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

export default ArtifactTestingCard;
