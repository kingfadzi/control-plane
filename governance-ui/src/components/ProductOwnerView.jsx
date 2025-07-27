// src/components/ProductOwnerView.jsx
import React from 'react';
import ApplicationOverview from './ProductOwnerView/ApplicationOverview';
import CurrentRelease from './ProductOwnerView/CurrentRelease';
import GovernanceTasks from './ProductOwnerView/GovernanceTasks';
import RisksAndBlockers from './ProductOwnerView/RisksAndBlockers';
import EvidenceSummary from './ProductOwnerView/EvidenceSummary';
import GovernanceTimeline from './ProductOwnerView/GovernanceTimeline';
import ReleaseList from './ProductOwnerView/ReleaseList';
import RecentReleasesOverview from './ProductOwnerView/RecentReleasesOverview';
import GovernanceReadinessScore from './ProductOwnerView/GovernanceReadinessScore';
import OutstandingGovernanceDebt from './ProductOwnerView/OutstandingGovernanceDebt';
import ComplianceTrends from './ProductOwnerView/ComplianceTrends';
import NextReleaseCTA from './ProductOwnerView/NextReleaseCTA';

const ProductOwnerView = ({ onSelect }) => {
    const releases = [
        {
            id: 'RLS-002',
            date: '2025-08-05',
            status: 'In Progress',
        },
        {
            id: 'RLS-001',
            date: '2025-07-01',
            status: 'Complete',
        },
    ];

    return (
        <div className="p-6 space-y-8 font-sans">
            {/* Overview Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                <div className="bg-white rounded-lg shadow p-4 border">
                    <ApplicationOverview />
                </div>
                <div className="bg-white rounded-lg shadow p-4 border">
                    <CurrentRelease />
                </div>
            </section>

            {/* Execution Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-4 border">
                    <GovernanceTasks />
                </div>
                <div className="bg-white rounded-lg shadow p-4 border">
                    <RisksAndBlockers />
                </div>
                <div className="bg-white rounded-lg shadow p-4 border">
                    <EvidenceSummary />
                </div>
            </section>

            {/* Timeline Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                <div className="bg-white rounded-lg shadow p-4 border">
                    <GovernanceTimeline />
                </div>
            </section>

            {/* Release History */}
            <section className="grid grid-cols-1">
                <div className="bg-white rounded-lg shadow p-4 border">
                    <ReleaseList releases={releases} onSelect={onSelect} />
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                <div className="bg-white rounded-lg shadow p-4 border">
                    <RecentReleasesOverview />
                </div>
                <div className="bg-white rounded-lg shadow p-4 border">
                    <GovernanceReadinessScore />
                </div>
                <div className="bg-white rounded-lg shadow p-4 border">
                    <OutstandingGovernanceDebt />
                </div>
                <div className="bg-white rounded-lg shadow p-4 border">
                    <ComplianceTrends />
                </div>
                <div className="bg-white rounded-lg shadow p-4 border">
                    <NextReleaseCTA />
                </div>
            </section>
        </div>
    );
};



export default ProductOwnerView;
