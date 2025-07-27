// components/ReleaseCard.jsx
import React from 'react';

const ReleaseCard = ({ release, onSelect }) => {
    const handleClick = (e) => {
        e.preventDefault(); // prevent any default behavior
        if (onSelect && typeof onSelect === 'function') {
            onSelect(release.id);
        }
    };

    return (
        <div className="border p-4 rounded shadow">
            <p className="font-semibold">Version: {release.id}</p>
            <p>Status: {release.status}</p>
            {release.date && <p>Deployed: {release.date}</p>}
            <button
                className="mt-2 text-blue-600 underline"
                onClick={handleClick}
            >
                View Governance
            </button>
        </div>
    );
};

export default ReleaseCard;
