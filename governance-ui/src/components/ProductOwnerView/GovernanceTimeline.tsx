import React from 'react';

const GovernanceTimeline = () => {
    const stages = ['Overview', 'Outcome', 'Mobilization', 'SME Review', 'Mitigation', 'Approval', 'Audit'];
    const currentStage = 'SME Review';

    return (
        <div className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">✅ Governance Timeline</h2>
            <div className="flex gap-4 overflow-x-auto">
                {stages.map(stage => (
                    <div key={stage} className="flex flex-col items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 ${
                                stage === currentStage ? 'bg-blue-600 text-white' : 'bg-gray-300'
                            }`}
                        >
                            {stage[0]}
                        </div>
                        <span className="text-xs text-center w-16">{stage}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GovernanceTimeline;
