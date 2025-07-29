import React from 'react';

const personas = [
    'All Cards',
    'Product Owner',
    'Engineering Lead',
    'DevOps',
    'GRC Officer',
    'Control SME',
    'Risk Champion',
    'Internal Auditor',
    'Regulator'
];

const PersonaSelector = ({ selected, onChange }) => {
    return (
        <div className="flex justify-end mb-4">
            <select
                className="border border-slate-300 rounded px-3 py-1 text-sm"
                value={selected}
                onChange={(e) => onChange(e.target.value)}
            >
                {personas.map((p) => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>
        </div>
    );
};

export default PersonaSelector;
