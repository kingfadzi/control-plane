import React from 'react';

const ApplicationOverview = () => {
    return (
        <div className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">📌 Application Overview</h2>
            <p><strong>App:</strong> jumpstart-app</p>
            <p><strong>Owner:</strong> Jane Doe</p>
            <p><strong>GitLab:</strong> <a href="#" className="text-blue-600 underline">repo-link</a></p>
            <p><strong>Jira:</strong> <a href="#" className="text-blue-600 underline">board-link</a></p>
            <p><strong>Governance:</strong> ✅ Onboarded</p>
            <p><strong>Last Audit:</strong> 2025-07-15 - All checks passed</p>
        </div>
    );
};

export default ApplicationOverview;
