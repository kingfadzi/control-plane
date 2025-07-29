import React, { useState } from 'react';
import ReleaseList from './ProductOwner/ReleaseList.jsx';
import StageTabs from './StageTabs';
import StageDetails from './StageDetails';

const GovernanceUI = () => {
    const [selectedRelease, setSelectedRelease] = useState(null);
    const [activeStage, setActiveStage] = useState('Overview');

    const releases = [
        { id: 'v1.0', status: 'In Progress' },
        { id: 'v0.9', status: 'Released' }
    ];

    const stages = [
        'Overview',
        'Outcome',
        'Mobilization',
        'SME Review',
        'Mitigation',
        'Approval',
        'Audit'
    ];

    if (!selectedRelease) {
        return (
            <ReleaseList
                releases={releases}
                onSelect={setSelectedRelease}
            />
        );
    }

    return (
        <div className="p-6 font-sans">
            <button
                onClick={() => setSelectedRelease(null)}
                className="text-blue-600 underline mb-4"
            >
                ← Back to Application
            </button>

            <h1 className="text-2xl font-bold mb-4">Release Governance: {selectedRelease}</h1>

            <StageTabs
                stages={stages}
                activeStage={activeStage}
                onSelect={setActiveStage}
            />

            <StageDetails stage={activeStage} />
        </div>
    );
};

export default GovernanceUI;
