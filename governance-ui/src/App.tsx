// src/App.tsx
import React, { useState } from 'react';
import ProductOwnerView from './components/ProductOwnerView';
import SmeView from './components/SmeView';
import AuditorView from './components/AuditorView';
import GovernanceUI from './components/GovernanceUI';
import GovernanceCockpit from './components/GovernanceCockpit';

const App = () => {
    const [view, setView] = useState<'product' | 'sme' | 'audit' | 'cockpit'>('product');
    const [selectedRelease, setSelectedRelease] = useState<string | null>(null);

    const handleSelectRelease = (releaseId: string) => {
        setSelectedRelease(releaseId);
    };

    const handleBack = () => {
        setSelectedRelease(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            {!selectedRelease && (
                <div className="mb-6 space-x-4">
                    <button onClick={() => setView('product')} className="text-blue-600 underline">Product Owner View</button>
                    <button onClick={() => setView('sme')} className="text-blue-600 underline">SME View</button>
                    <button onClick={() => setView('audit')} className="text-blue-600 underline">Auditor View</button>
                    <button onClick={() => setView('cockpit')} className="text-blue-600 underline">Governance Cockpit</button>
                </div>
            )}

            {selectedRelease ? (
                <GovernanceUI releaseId={selectedRelease} onBack={handleBack} />
            ) : view === 'product' ? (
                <ProductOwnerView onSelect={handleSelectRelease} />
            ) : view === 'sme' ? (
                <SmeView onSelect={handleSelectRelease} />
            ) : view === 'audit' ? (
                <AuditorView onSelect={handleSelectRelease} />
            ) : (
                <GovernanceCockpit />
            )}
        </div>
    );
};

export default App;
