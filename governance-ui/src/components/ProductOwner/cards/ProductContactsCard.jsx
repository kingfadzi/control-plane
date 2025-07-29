import React from "react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const contacts = [
    { name: "Alice Smith", role: "Product Manager", status: "Complete" },
    { name: "Bob Johnson", role: "UX Designer", status: "Pending" },
    { name: "Carol Nguyen", role: "Tech Lead", status: "Complete" },
    { name: "David Lee", role: "QA Lead", status: "Pending" },
];

const statusColor = {
    Complete: "text-green-600",
    Pending: "text-red-600",
};

const statusIcon = {
    Complete: CheckCircleIcon,
    Pending: ExclamationCircleIcon,
};

const ProductContactsCard = () => (
    <GovernanceCard
        title="Product Contacts"
        items={contacts}
        maxVisible={3}                      // show only 3, then "View more"
        modalTitle="All Product Contacts"
        renderItem={(contact) => {
            const Icon = statusIcon[contact.status];
            const color = statusColor[contact.status];
            return (
                <li
                    key={contact.name}
                    className="flex flex-col gap-0.5 bg-slate-50 border border-slate-100 rounded px-2 py-1"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-slate-700 text-sm">{contact.name}</span>
                        <span className="text-xs text-slate-500">{contact.role}</span>
                    </div>
                    <div className={`flex items-center text-xs ${color}`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {contact.status}
                    </div>
                </li>
            );
        }}
    />
);

export default ProductContactsCard;
