// src/components/ProductOwner/cards/TechnicalCodeQualityCard.jsx
import React from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "CI Pipeline Success Rate",        value: "95%",          status: "Healthy" },
    { label: "Merge Request Approval Rate",     value: "3/3 approvals", status: "Healthy" },
    { label: "Security Vulnerability Count",    value: "2 High, 5 Medium", status: "At Risk" },
    { label: "Unreviewed Merge Requests",       value: "1",            status: "At Risk" },
];

const statusColor = {
    Healthy: "text-green-600",
    "At Risk": "text-red-600",
};

const statusIcon = {
    Healthy: CheckCircleIcon,
    "At Risk": ExclamationTriangleIcon,
};

const TechnicalCodeQualityCard = () => (
    <GovernanceCard
        title="Technical & Code Quality"
        items={items}
        maxVisible={4}
        modalTitle="Full Technical & Code Quality Metrics"
        renderItem={(item) => {
            const Icon = statusIcon[item.status];
            const color = statusColor[item.status];
            return (
                <li
                    key={item.label}
                    className="flex flex-col gap-0.5 bg-slate-50 border border-slate-100 rounded px-2 py-1 min-w-0"
                >
                    {/* top row: label + value, no wrap */}
                    <div className="flex justify-between items-center min-w-0">
            <span className="text-slate-700 text-sm whitespace-nowrap truncate">
              {item.label}
            </span>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
              {item.value}
            </span>
                    </div>
                    {/* bottom row: RAG */}
                    <div className={`flex items-center text-xs ${color}`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {item.status}
                    </div>
                </li>
            );
        }}
    />
);

export default TechnicalCodeQualityCard;
