import React from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const summaryBoxes = [
  { label: "Ready", count: 1, color: "text-green-600", icon: <CheckCircleIcon className="h-5 w-5 text-green-600" /> },
  { label: "Overdue", count: 1, color: "text-yellow-500", icon: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" /> },
  { label: "SME Wait", count: 1, color: "text-red-500", icon: <XCircleIcon className="h-5 w-5 text-red-500" /> },
  { label: "Risk Wait", count: 0, color: "text-gray-500", icon: <ClockIcon className="h-5 w-5 text-gray-500" /> },
];

const GovernanceSummaryCard = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {summaryBoxes.map((box) => (
        <div key={box.label} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 text-center">
          <div className="flex justify-center mb-1">{box.icon}</div>
          <div className={`text-2xl font-bold ${box.color}`}>{box.count}</div>
          <div className="text-sm text-slate-600">{box.label}</div>
        </div>
    ))}

  </div>
);

export default GovernanceSummaryCard;