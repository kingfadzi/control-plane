import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";
import { getSeverityDisplay } from "../../../utils/statusDisplay.jsx";

const items = [
    {
        label: "Sample Item 1",
        value: getSeverityDisplay("High", "Example High severity issue"),
    },
    {
        label: "Sample Item 2",
        value: getSeverityDisplay("Medium", "Example Medium severity issue"),
    },
];

const PendingApprovalsCard = () => (
    <GovernanceCard
        title="Controls Awaiting SME Approval"
        items={items}
        maxVisible={4}
        modalTitle="Controls Awaiting SME Approval"
        renderItem={(item) => (
            <li className="flex flex-col gap-0.5 bg-slate-50 border border-slate-100 rounded px-2 py-1">
                <div className="flex justify-between items-center">
                    <span className="text-slate-700 text-sm">{item.label}</span>
                    <span>{item.value}</span>
                </div>
            </li>
        )}
    />
);

export default PendingApprovalsCard;
