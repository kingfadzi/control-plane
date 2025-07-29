import React from 'react';
import ApplicationOverview from './ApplicationOverview.tsx';
import CurrentRelease from './CurrentRelease.tsx';
import GovernanceTasks from './GovernanceTasks.tsx';
import RisksAndBlockers from './RisksAndBlockers.tsx';
import EvidenceSummary from './EvidenceSummary.tsx';
import GovernanceTimeline from './GovernanceTimeline.tsx';

const ProductOwnerView = ({ onSelect }) => {
    return (
        <div className="p-6 space-y-6 font-sans">
            <ApplicationOverview />
            <CurrentRelease />
            <GovernanceTasks />
            <RisksAndBlockers />
            <EvidenceSummary />
            <GovernanceTimeline />
        </div>
    );
};

export default ProductOwnerView;
