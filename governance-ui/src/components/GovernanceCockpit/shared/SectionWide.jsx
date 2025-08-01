import React, { useState } from 'react';
import InsightsToggle from './InsightsToggle.jsx';

const SectionWide = ({ title, insights, children }) => {
    const [showInsights, setShowInsights] = useState(false);

    return (
        <section className="mb-10">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
                {insights && (
                    <InsightsToggle
                        expanded={showInsights}
                        onToggle={() => setShowInsights(!showInsights)}
                    />
                )}
            </div>

            {showInsights && (
                <div className="mb-4 bg-slate-50 border border-slate-200 rounded p-3 text-sm text-slate-600">
                    {typeof insights === 'string' ? <p>{insights}</p> : insights}
                </div>
            )}

            {/* 2 Cards per row on medium+ screens, 1 per row on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children}
            </div>
        </section>
    );
};

export default SectionWide;
