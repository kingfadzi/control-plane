// src/components/ProductOwner/sections/ReleaseListingsSection.jsx
import React from 'react';
import SectionWide from '../../GovernanceCockpit/shared/SectionWide';
import WideListCard from '../../GovernanceCockpit/shared/WideListCard';

const releases = {
    upcoming: [
        { id: 'RLS-003', date: '2025-09-01', crLink: '/servicenow/CR-1234', jiraLink: '/jira/RLS-003' },
        { id: 'RLS-004', date: '2025-10-15', crLink: '/servicenow/CR-1235', jiraLink: '/jira/RLS-004' },
    ],
    past: [
        { id: 'RLS-001', date: '2025-07-01', crLink: '/servicenow/CR-1222', jiraLink: '/jira/RLS-001' },
        { id: 'RLS-002', date: '2025-08-05', crLink: '/servicenow/CR-1223', jiraLink: '/jira/RLS-002' },
    ],
};

const renderRelease = (rel) => (
    <li
        key={rel.id}
        className="flex flex-col gap-0.5 bg-slate-50 border border-slate-100 rounded px-3 py-2 min-w-0"
    >
        <a
            href={rel.jiraLink}
            className="text-slate-800 font-medium hover:underline truncate"
        >
            {rel.id}
        </a>
        <div className="flex justify-between text-xs text-slate-500 whitespace-nowrap">
            <span>{rel.date}</span>
            <a href={rel.crLink} className="underline">
                View CR
            </a>
        </div>
    </li>
);

const ReleaseListingsSection = () => (
    <SectionWide
        title="Release Listings"
        insights="Quickly see upcoming and past fix‑releases, with links to Jira issues and ServiceNow change requests."
    >
        {/* Now each card will occupy one full column in a 2‑column grid */}
        <WideListCard
            title="Upcoming Releases"
            items={releases.upcoming}
            renderItem={renderRelease}
        />
        <WideListCard
            title="Past Releases"
            items={releases.past}
            renderItem={renderRelease}
        />
    </SectionWide>
);

export default ReleaseListingsSection;
