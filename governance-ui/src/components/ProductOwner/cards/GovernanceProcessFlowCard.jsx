// src/components/ProductOwner/cards/GovernanceProcessFlowCard.jsx
import React from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Linked LCT Attestation Rate",           value: "90%",    status: "Healthy" },
    { label: "Change‑Control Lag",                     value: "4h",     status: "Healthy" },
    { label: "Jira Governance Issue Backlog",         value: "3 issues", status: "At Risk" },
    { label: "Orphan Merge Requests",                  value: "1 MR",    status: "At Risk" },
    { label: "Unmitigated Dependency Vulnerabilities", value: "2",      status: "At Risk" },
];

const statusColor = {
    Healthy: "text-green-600",
    "At Risk": "text-red-600",
};

const statusIcon = {
    Healthy: CheckCircleIcon,
    "At Risk": ExclamationTriangleIcon,
};

const GovernanceProcessFlowCard = () => (
    <GovernanceCard
        title="Governance Process Flow"
        items={items}
        maxVisible={4}
        modalTitle="Full Governance Process Flow Metrics"
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

export default GovernanceProcessFlowCard;
