
import React from 'react';
import ReleaseCard from '../ReleaseCard.jsx';

const ReleaseList = ({ releases, onSelect }) => {
    return (
        <div className="p-6 font-sans">

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Current Release</h2>
                <ReleaseCard release={releases[0]} onSelect={onSelect} />
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Past Releases</h2>
                <div className="space-y-2">
                    {releases.slice(1).map(release => (
                        <ReleaseCard key={release.id} release={release} onSelect={onSelect} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReleaseList;
