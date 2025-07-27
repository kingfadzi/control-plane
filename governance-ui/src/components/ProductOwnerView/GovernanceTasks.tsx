import React from 'react';

const GovernanceTasks = () => {
    const tasks = [
        { id: 1, desc: 'Submit architecture document', assignee: 'Alice', due: '2025-07-30' },
        { id: 2, desc: 'Respond to SME feedback', assignee: 'Bob', due: '2025-07-28' },
    ];

    return (
        <div className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">📋 Outstanding Governance Tasks</h2>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <li key={task.id} className="border p-2 rounded">
                        <p>{task.desc}</p>
                        <p className="text-sm text-gray-600">Assigned to: {task.assignee} | Due: {task.due}</p>
                        <button className="text-blue-600 underline text-sm mt-1">Take Action</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GovernanceTasks;
