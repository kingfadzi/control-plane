import React from 'react';

const StageTabs = ({ stages, activeStage, onSelect }) => (
    <div className="flex items-center gap-4 mb-4 overflow-x-auto">
        {stages.map(stage => (
            <button
                key={stage}
                onClick={() => onSelect(stage)}
                className={`text-sm px-3 py-1 border-b-2 ${
                    activeStage === stage
                        ? 'border-blue-600 text-blue-700 font-semibold'
                        : 'border-transparent text-gray-600'
                }`}
            >
                {stage}
            </button>
        ))}
    </div>
);

export default StageTabs;
