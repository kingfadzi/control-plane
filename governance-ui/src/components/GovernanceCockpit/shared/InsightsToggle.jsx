import React from 'react';
import { InformationCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const InsightsToggle = ({ expanded, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="flex items-center text-sm text-blue-600 hover:underline focus:outline-none"
        >
            <InformationCircleIcon className="w-4 h-4 mr-1" />
            {expanded ? 'Hide Insights' : 'Show Insights'}
            {expanded ? (
                <ChevronUpIcon className="w-4 h-4 ml-1" />
            ) : (
                <ChevronDownIcon className="w-4 h-4 ml-1" />
            )}
        </button>
    );
};

export default InsightsToggle;
