import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import WideGovernanceCard from "../../GovernanceCockpit/shared/WideGovernanceCard.jsx";

const items = [
    {
        app: "platform-api",
        control: "PC-05",
        issue: "No SME review in last 30d",
        status: "At Risk",
        updated: "7d ago",
        action: "Follow up"
    },
    {
        app: "claims-service",
        control: "DC-03",
        issue: "Approval overdue",
        status: "At Risk",
        updated: "3d ago",
        action: "Escalate"
    },
    {
        app: "onboarding-portal",
        control: "PC-08",
        issue: "Engagement below threshold",
        status: "At Risk",
        updated: "5d ago",
        action: "Remind"
    },
    {
        app: "fraud-detector",
        control: "DC-02",
        issue: "All SME actions done",
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

const EngagementAndApprovalGapsCard = () => (
    <WideGovernanceCard
        title="Engagement & Approval Gaps"
        items={items}
        maxVisible={3}
        modalTitle="Engagement and Attestation Gaps"
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

export default EngagementAndApprovalGapsCard;