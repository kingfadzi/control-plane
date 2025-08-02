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
        label: "APP-8891 (Core Payments)",
        value: "Deployed with no control attestations or CR",
        status: "High",
    },
    {
        label: "APP-1223 (Risk API)",
        value: "Controls skipped due to 'hotfix' override",
        status: "High",
    },
    {
        label: "APP-9910 (AML Engine)",
        value: "Evidence uploaded post-deployment",
        status: "Medium",
    },
    {
        label: "APP-7715 (FX Gateway)",
        value: "No threat model or approval workflow triggered",
        status: "Medium",
    },
];

const ReleasesMissingGovernanceCard = () => (
    <WideGovernanceCard
        title="Releases Missing Governance"
        items={items}
        maxVisible={4}
        modalTitle="Releases Deployed Without Required Governance"
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

export default ReleasesMissingGovernanceCard;
