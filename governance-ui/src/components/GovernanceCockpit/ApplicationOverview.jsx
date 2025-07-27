// src/components/GovernanceCockpit/ApplicationOverview.jsx
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const ApplicationOverview = () => {
    return (
        <div className="flex flex-col rounded-lg bg-white shadow-sm max-w-96 p-4 border border-slate-200">
            <div className="pb-3 mb-3 border-b border-slate-200">
                <h2 className="text-base font-semibold text-slate-800 text-center">Application Overview</h2>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-slate-600">
                <li className="flex justify-between">
                    <span>App</span>
                    <span className="font-medium text-slate-700">jumpstart-app</span>
                </li>
                <li className="flex justify-between">
                    <span>Owner</span>
                    <span className="font-medium text-slate-700">Jane Doe</span>
                </li>
                <li className="flex justify-between">
                    <span>GitLab</span>
                    <a href="#" className="text-blue-600 underline">repo-link</a>
                </li>
                <li className="flex justify-between">
                    <span>Jira</span>
                    <a href="#" className="text-blue-600 underline">board-link</a>
                </li>
                <li className="flex justify-between">
                    <span>Governance</span>
                    <span className="flex items-center gap-1 text-green-600">
            Onboarded <CheckCircleIcon className="w-4 h-4" />
          </span>
                </li>
                <li className="flex justify-between">
                    <span>Last Audit</span>
                    <span className="text-slate-700">2025-07-15</span>
                </li>
            </ul>
        </div>
    );
};

export default ApplicationOverview;
