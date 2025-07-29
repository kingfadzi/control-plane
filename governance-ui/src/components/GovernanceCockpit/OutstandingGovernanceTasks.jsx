import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import GovernanceCard from './shared/GovernanceCard';

const tasks = [
    { title: 'Submit security evidence', due: '2025-07-30', status: 'Pending' },
    { title: 'Review CR approvals', due: '2025-08-01', status: 'In Progress' },
    { title: 'Attach audit summary', due: '2025-08-03', status: 'Pending' },
    { title: 'Confirm SOX scope', due: '2025-08-06', status: 'Pending' },
];

const OutstandingGovernanceTasks = () => (
    <GovernanceCard
        title="Outstanding Tasks"
        items={tasks}
        maxVisible={3}
        modalTitle="All Tasks"
        renderItem={(task) => (
            <li key={task.title} className="flex flex-col gap-1 bg-slate-50 border border-slate-100 rounded px-3 py-2">
                <div className="flex justify-between items-center">
                    <span className="text-slate-700">{task.title}</span>
                    <span className="text-xs text-slate-500">Due: {task.due}</span>
                </div>
                <div className="flex items-center text-sm text-red-600">
                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                    {task.status}
                </div>
            </li>
        )}
    />
);

export default OutstandingGovernanceTasks;
