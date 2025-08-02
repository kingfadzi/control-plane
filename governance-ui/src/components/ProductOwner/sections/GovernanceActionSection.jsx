import React from "react";
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";

const getStatusIcon = (status) => {
    switch (status) {
        case "Completed":
            return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
        case "Warning":
            return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
        case "Critical":
            return <XCircleIcon className="h-5 w-5 text-red-500" />;
        default:
            return null;
    }
};

const items = [
    {
        product: "Jumpstart",
        release: "RLS-002",
        type: "Evidence Overdue",
        detail: "2 evidence items missing",
        actionLabel: "View Evidence",
        severity: "Critical",
    },
    {
        product: "Payments",
        release: "RLS-045",
        type: "SME Not Assigned",
        detail: "No SME added for CR Review",
        actionLabel: "Assign SME",
        severity: "Warning",
    },
    {
        product: "Onboard App",
        release: "RLS-009",
        type: "Risk Review Pending",
        detail: "Awaiting Risk signoff",
        actionLabel: "Follow up",
        severity: "Warning",
    },
    {
        product: "Payments",
        release: "RLS-044",
        type: "SME Assigned",
        detail: "Completed Aug 01",
        actionLabel: "",
        severity: "Completed",
    },
];

const GovernanceActionSection = () => (
    <div className="space-y-6">
        <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
                Action Items
            </h2>

        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm bg-white">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                <tr>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Release</th>
                    <th className="px-4 py-2">Issue</th>
                    <th className="px-4 py-2">Details</th>
                    <th className="px-4 py-2 text-right">Action</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, idx) => (
                    <tr key={idx} className="border-t hover:bg-slate-50">
                        <td className="px-4 py-3">{getStatusIcon(item.severity)}</td>
                        <td className="px-4 py-3">{item.product}</td>
                        <td className="px-4 py-3">{item.release}</td>
                        <td className="px-4 py-3">{item.type}</td>
                        <td className="px-4 py-3">{item.detail}</td>
                        <td className="px-4 py-3 text-right">
                            {item.severity === "Completed" ? (
                                <span className="text-slate-400 text-sm italic">Complete</span>
                            ) : (
                                <button className="inline-flex items-center text-blue-600 hover:underline font-medium">
                                    {item.actionLabel}
                                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default GovernanceActionSection;
