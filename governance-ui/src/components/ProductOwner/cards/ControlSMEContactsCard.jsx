// src/components/ProductOwner/cards/ControlSMEContactsCard.jsx
import React from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const smes = [
    { name: "Emily Chen", type: "Security SME", health: "Healthy" },
    { name: "Frank Harris", type: "Compliance SME", health: "At Risk" },
    { name: "Grace Patel", type: "Risk SME", health: "Healthy" },
    { name: "Hector Lopez", type: "Audit SME", health: "At Risk" },
];

const healthColor = {
    Healthy: "text-green-600",
    "At Risk": "text-red-600",
};

const healthIcon = {
    Healthy: CheckCircleIcon,
    "At Risk": ExclamationTriangleIcon,
};

const ControlSMEContactsCard = () => (
    <GovernanceCard
        title="Control SMEs"
        items={smes}
        maxVisible={3}                      // show 3, then “View more”
        modalTitle="All Control SMEs"
        renderItem={(sme) => {
            const Icon = healthIcon[sme.health];
            const color = healthColor[sme.health];
            return (
                <li
                    key={sme.name}
                    className="flex flex-col gap-0.5 bg-slate-50 border border-slate-100 rounded px-2 py-1"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-slate-700 text-sm">{sme.name}</span>
                        <span className="text-xs text-slate-500">{sme.type}</span>
                    </div>
                    <div className={`flex items-center text-xs ${color}`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {sme.health}
                    </div>
                </li>
            );
        }}
    />
);

export default ControlSMEContactsCard;
