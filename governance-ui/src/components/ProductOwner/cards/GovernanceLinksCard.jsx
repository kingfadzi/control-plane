import React from "react";
import GovernanceCard from "../../GovernanceCockpit/shared/GovernanceCard";

const items = [
    { label: "GitLab Repo", value: "repo-link" },
    { label: "Jira Board", value: "board-link" },
    { label: "ServiceNow CI", value: "ci-link" },
    { label: "Confluence Page", value: "confluence-link" },
];

const GovernanceLinksCard = () => (
    <GovernanceCard
        title="Governance Links"
        items={items}
        maxVisible={4}                 // show 3, then "View more"
        modalTitle="All Governance Links"
        renderItem={(item) => (
            <li
                key={item.label}
                className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded px-2 py-1"
            >
                <span className="text-slate-700 text-sm">{item.label}</span>
                <a href="#" className="text-xs text-blue-600 underline">
                    {item.value}
                </a>
            </li>
        )}
    />
);

export default GovernanceLinksCard;
