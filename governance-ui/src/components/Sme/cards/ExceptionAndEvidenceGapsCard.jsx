import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import WideGovernanceCard from "../../GovernanceCockpit/shared/WideGovernanceCard.jsx";

const items = [
    {
        app: "claims-api",
        control: "PC-13",
        issue: "Exception pending review",
        status: "At Risk",
        updated: "3d ago",
        action: "Review"
    },
    {
        app: "payment-service",
        control: "DC-04",
        issue: "Expired Exception",
        status: "At Risk",
        updated: "1w ago",
        action: "Renew"
    },
    {
        app: "billing-engine",
        control: "DC-01",
        issue: "Evidence missing for test strategy",
        status: "At Risk",
        updated: "2d ago",
        action: "Request Evidence"
    },
    {
        app: "fraud-detector",
        control: "DC-03",
        issue: "Evidence valid",
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

const ExceptionAndEvidenceGapsCard = () => (
    <WideGovernanceCard
        title="Exception & Evidence Gaps"
        items={items}
        maxVisible={3}
        modalTitle="Control Evidence and Exception Gaps"
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

export default ExceptionAndEvidenceGapsCard;