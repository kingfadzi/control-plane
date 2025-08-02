import React from "react";
import GovernanceSummaryCard from "../cards/GovernanceSummaryCard";
import GovernanceActionTable from "../cards/GovernanceActionTable.jsx";

const issues = [
    {
        product: "Jumpstart",
        release: "RLS-002",
        issue: "Evidence overdue",
        status: "Overdue",
        date: "Aug 01",
    },
    {
        product: "Payments",
        release: "RLS-045",
        issue: "SME not assigned",
        status: "SME Wait",
        date: "Jul 30",
    },
];

const GovernanceSummarySection = () => (
    <div className="space-y-6">
        <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Governance Overview</h2>
            <GovernanceSummaryCard />
        </div>
        <div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">Attention Needed</h3>
            <GovernanceActionTable items={issues} />
        </div>
    </div>
);

export default GovernanceSummarySection;
