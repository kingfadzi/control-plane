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
        label: "CTL-1023 (Segregation of Duties)",
        value: "Skipped in 5 of last 6 releases (Team: Payments)",
        status: "High",
    },
    {
        label: "CTL-2231 (Change Approval Evidence)",
        value: "Auto-attested via GitLab without linked CRs",
        status: "High",
    },
    {
        label: "CTL-7810 (Data Encryption Review)",
        value: "Passed with identical evidence across 4 quarters",
        status: "Medium",
    },
    {
        label: "CTL-9912 (Incident Runbooks)",
        value: "No incident drill logged in 18 months",
        status: "Medium",
    },
    {
        label: "CTL-4501 (Access Control Review)",
        value: "Review overdue for 3 critical systems",
        status: "High",
    },
    {
        label: "CTL-6723 (Backup Validation)",
        value: "Backups not validated in the last 2 quarters",
        status: "Medium",
    },
    {
        label: "CTL-8902 (Third-Party Risk Assessment)",
        value: "Assessment skipped for 2 major vendors",
        status: "High",
    },
    {
        label: "CTL-3100 (Vulnerability Scanning)",
        value: "Scans show repeated unresolved issues",
        status: "Medium",
    },
];

const RepeatedBypassControlsCard = () => (
    <WideGovernanceCard
        title="Repeatedly Bypassed Controls"
        items={items}
        maxVisible={4}
        modalTitle="Controls Bypassed Across Releases"
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

export default RepeatedBypassControlsCard;
