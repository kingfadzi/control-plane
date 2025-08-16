import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProductOwnerLanding from "./components/ProductOwnerLanding";
import ProductOwnerView from "./components/ProductOwnerView";
import SmeView from "./components/SmeView";
import InternalAuditorView from "./components/InternalAuditorView";
import GovernanceUI from "./components/GovernanceUI";
import GovernanceCockpit from "./components/GovernanceCockpit";

// NEW: URL-driven form page
import FormPage from "./components/Forms/FormPage.jsx";

// The original app shell kept as a component and mounted at "/"
function HomeShell() {
    const [view, setView] = useState<"landing" | "product" | "sme" | "audit" | "cockpit">("landing");
    const [selectedRelease, setSelectedRelease] = useState<string | null>(null);

    const handleSelectRelease = (releaseId: string) => setSelectedRelease(releaseId);
    const handleBack = () => setSelectedRelease(null);

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            {!selectedRelease && (
                <div className="mb-6 space-x-4">
                    <button onClick={() => setView("landing")} className="text-blue-600 underline">
                        Product Owner Landing
                    </button>
                    <button onClick={() => setView("product")} className="text-blue-600 underline">
                        Product Owner View
                    </button>
                    <button onClick={() => setView("sme")} className="text-blue-600 underline">
                        SME View
                    </button>
                    <button onClick={() => setView("audit")} className="text-blue-600 underline">
                        Auditor View
                    </button>
                    <button onClick={() => setView("cockpit")} className="text-blue-600 underline">
                        Governance Cockpit
                    </button>
                </div>
            )}

            {selectedRelease ? (
                <GovernanceUI releaseId={selectedRelease} onBack={handleBack} />
            ) : view === "product" ? (
                <ProductOwnerView onSelect={handleSelectRelease} />
            ) : view === "landing" ? (
                <ProductOwnerLanding onSelect={() => setView("product")} />
            ) : view === "sme" ? (
                <SmeView onSelect={handleSelectRelease} />
            ) : view === "audit" ? (
                <InternalAuditorView onSelect={handleSelectRelease} />
            ) : (
                <GovernanceCockpit />
            )}
        </div>
    );
}

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Your existing UI at the root */}
                <Route path="/" element={<HomeShell />} />

                {/* New URL-driven forms */}
                <Route path="/form" element={<FormPage mode="edit" />} />
                <Route path="/form/view" element={<FormPage mode="view" />} />
                <Route path="/form/print" element={<FormPage mode="print" />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
