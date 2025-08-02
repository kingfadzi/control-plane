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
        label: "CTL-4561 (Jira Control Mapping)",
        value: "Missing link to any product/application",
        status: "High",
    },
    {
        label: "CTL-2210 (Release-Level Mapping)",
        value: "Mapped to 9 releases; only 2 are valid",
        status: "Medium",
    },
    {
        label: "CTL-6542 (Change Freeze Compliance)",
        value: "Conflict between LCT and ServiceNow state",
        status: "Medium",
    },
    {
        label: "CTL-8820 (Peer Review Control)",
        value: "Evidence exists, but no pipeline trigger found",
        status: "Medium",
    },
    {
        label: "CTL-9901 (Policy Exception Mapping)",
        value: "Policy exception expired but still active",
        status: "High",
    },
    {
        label: "CTL-7743 (Control Ownership)",
        value: "Control owner not assigned for 3 months",
        status: "Medium",
    },
    {
        label: "CTL-3321 (Audit Log Review)",
        value: "Audit logs missing for 2 critical releases",
        status: "High",
    },
    {
        label: "CTL-1280 (Control Effectiveness)",
        value: "Effectiveness not reviewed in the last year",
        status: "Low",
    },
];

const ControlMappingFailuresCard = () => (
    <WideGovernanceCard
        title="Control Mapping Failures"
        items={items}
        maxVisible={4}
        modalTitle="Controls with Broken or Incomplete Mappings"
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

export default ControlMappingFailuresCard;
