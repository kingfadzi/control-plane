// src/components/ProductOwner/cards/AppOwnershipCard.jsx
import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "Business App",           value: "jumpstart-app (APP123042)" },
    { label: "LCT Name",               value: "jumpstart" },
    { label: "Transaction Cycle",      value: "CTO" },
    { label: "Application Type",       value: "Homegrown" },
    { label: "House Position",         value: "Maintain" },
    { label: "Architecture Type",      value: "API" },
    { label: "App Instances",          value: "APP*PROD, APP*DR" },
];

const AppOwnershipCard = () => (
    <GovernanceCard
        title="Application Ownership"
        items={items}
        maxVisible={4}                 // show 4, then "View more"
        modalTitle="Full Application Ownership"
        renderItem={(item) => (
            <li
                key={item.label}
                className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded px-2 py-1 min-w-0"
            >
        <span className="text-slate-700 text-sm whitespace-nowrap truncate">
          {item.label}
        </span>
                <span className="text-xs text-slate-500 whitespace-nowrap truncate">
          {item.value}
        </span>
            </li>
        )}
    />
);

export default AppOwnershipCard;
