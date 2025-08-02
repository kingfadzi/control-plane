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
        label: "CTL-3341 (Production Access Reviews)",
        value: "82% of releases show empty evidence file",
        status: "High",
    },
    {
        label: "CTL-6732 (Risk Acceptance Justification)",
        value: "Copied text across 6 different releases",
        status: "Medium",
    },
    {
        label: "CTL-2190 (Threat Model Approval)",
        value: "Document uploaded, not referenced in CR",
        status: "Medium",
    },
    {
        label: "CTL-8021 (SME Signoff)",
        value: "Signed by same person across multiple domains",
        status: "Medium",
    },
];

const WeakEvidenceSignalsCard = () => (
    <WideGovernanceCard
        title="Weak Evidence Signals"
        items={items}
        maxVisible={4}
        modalTitle="Controls with Low-Quality or Missing Evidence"
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

export default WeakEvidenceSignalsCard;
