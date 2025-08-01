import React from "react";
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";

const severityMap = {
    High: {
        icon: XCircleIcon,
        color: "text-red-600",
    },
    Medium: {
        icon: ExclamationTriangleIcon,
        color: "text-yellow-500",
    },
    Low: {
        icon: CheckCircleIcon,
        color: "text-green-600",
    },
};

export const getSeverityDisplay = (severity, label) => {
    const config = severityMap[severity] || severityMap["Low"];
    const Icon = config.icon;

    return (
        <div className="flex items-center space-x-2">
            <Icon className={`w-5 h-5 ${config.color}`} />
            <span className="text-sm text-slate-700">{label}</span>
        </div>
    );
};
