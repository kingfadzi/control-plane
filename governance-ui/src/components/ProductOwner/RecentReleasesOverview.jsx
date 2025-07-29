import React from 'react';

const RecentReleasesOverview = () => {
    const releases = [
        { id: 'RLS-001', date: '2025-07-01', status: 'Complete', issues: 2 },
        { id: 'RLS-000', date: '2025-06-10', status: 'Complete', issues: 0 },
        { id: 'RLS-099', date: '2025-05-01', status: 'Complete', issues: 1 }
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">📈 Recent Releases Overview</h2>
            <ul className="text-sm space-y-1">
                {releases.map(r => (
                    <li key={r.id}>
                        <strong>{r.id}</strong> – {r.date} – {r.status} – Issues: {r.issues}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentReleasesOverview;
