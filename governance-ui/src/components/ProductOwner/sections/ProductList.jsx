import React, { useState } from "react";
import ProductCard from "../cards/ProductCard";
import AddProductCard from "../cards/AddProductCard";

// Optional: existing product cards (can be replaced with live data)
const products = [
    {
        id: "APP001",
        name: "Jumpstart App",
        code: "APP123042",
        readiness: "At Risk",
        score: 78,
        latestRelease: "RLS-002",
        releaseStatus: "In Progress",
    },
    {
        id: "APP002",
        name: "Payments Portal",
        code: "APP923114",
        readiness: "Ready",
        score: 92,
        latestRelease: "RLS-045",
        releaseStatus: "Approved",
    },
];

const steps = [
    "App ID",
    "Jira Project",
    "GitLab Repos",
    "Target Environments",
    "Artifacts",
    "Primary Contacts",
    "Review"
];

// Simulated backend lookup
const fetchAppMetadata = async (appId) => {
    const mockDb = {
        APP123042: {
            parentName: "Digital Banking (APP100001)",
            businessAppName: "Jumpstart App",
            appId: "APP123042",
            transactionCycle: "CTO",
            applicationOwner: "Jane Doe",
            systemArchitect: "John Smith",
            operationalStatus: "Production",
            applicationType: "Homegrown",
            architectureType: "API",
            installType: "Containerized",
            applicationComponents: [
                { name: "Auth Service", appId: "APP321001" },
                { name: "Core Engine", appId: "APP321002" },
            ],
        },
    };
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockDb[appId] || null), 500);
    });
};

const ProductList = ({ onSelect }) => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        appId: "",
        jiraProject: "",
        repos: [],
        instances: [],
        roadmap: "",
        architectureVision: "",
        serviceVision: "",
        contacts: [],
    });

    const [newContact, setNewContact] = useState({ type: "", name: "" });
    const [appMetadata, setAppMetadata] = useState(null);
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [appError, setAppError] = useState("");

    const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const handleBack = () => setStep((s) => Math.max(s - 1, 0));
    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddContact = () => {
        if (!newContact.type || !newContact.name) return;
        setFormData((prev) => ({
            ...prev,
            contacts: [...prev.contacts, newContact],
        }));
        setNewContact({ type: "", name: "" });
    };

    const handleRemoveContact = (index) => {
        setFormData((prev) => ({
            ...prev,
            contacts: prev.contacts.filter((_, i) => i !== index),
        }));
    };

    if (showOnboarding) {
        return (
            <div className="max-w-xl mx-auto space-y-6 p-6 bg-white shadow rounded-xl border border-slate-200">
                {/* Progress Header */}
                <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                        Step {step + 1} of {steps.length}: {steps[step]}
                    </h2>
                    <div className="h-2 bg-slate-200 rounded mt-2">
                        <div
                            className="h-2 bg-blue-600 rounded"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Step 0 - App ID with metadata preview */}
                {step === 0 && (
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-slate-700">App ID</label>
                        <input
                            type="text"
                            value={formData.appId}
                            onChange={(e) => {
                                updateField("appId", e.target.value);
                                setAppMetadata(null);
                                setAppError("");
                            }}
                            placeholder="e.g. APP123042"
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                        />
                        <button
                            onClick={async () => {
                                setIsLoadingApp(true);
                                setAppError("");
                                const result = await fetchAppMetadata(formData.appId);
                                if (result) {
                                    setAppMetadata(result);
                                } else {
                                    setAppError("No record found for this App ID.");
                                }
                                setIsLoadingApp(false);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            disabled={!formData.appId || isLoadingApp}
                        >
                            {isLoadingApp ? "Loading..." : "Load App Details"}
                        </button>

                        {appError && <p className="text-red-500 text-sm">{appError}</p>}

                        {appMetadata && (
                            <div className="text-sm text-slate-700 border border-slate-200 rounded p-4 bg-slate-50 space-y-2">
                                <h3 className="text-base font-semibold mb-2">Application Details</h3>
                                <div><strong>Parent App:</strong> {appMetadata.parentName}</div>
                                <div><strong>Business App Name:</strong> {appMetadata.businessAppName}</div>
                                <div><strong>App ID:</strong> {appMetadata.appId}</div>
                                <div><strong>Transaction Cycle:</strong> {appMetadata.transactionCycle}</div>
                                <div><strong>Application Owner:</strong> {appMetadata.applicationOwner}</div>
                                <div><strong>System Architect:</strong> {appMetadata.systemArchitect}</div>
                                <div><strong>Operational Status:</strong> {appMetadata.operationalStatus}</div>
                                <div><strong>Application Type:</strong> {appMetadata.applicationType}</div>
                                <div><strong>Architecture Type:</strong> {appMetadata.architectureType}</div>
                                <div><strong>Install Type:</strong> {appMetadata.installType}</div>
                                <div>
                                    <strong>Application Components:</strong>
                                    <ul className="list-disc ml-6">
                                        {appMetadata.applicationComponents.map((comp, idx) => (
                                            <li key={idx}>{comp.name} ({comp.appId})</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Other steps remain unchanged... */}
                {step === 1 && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Jira Project</label>
                        <input
                            type="text"
                            value={formData.jiraProject}
                            onChange={(e) => updateField("jiraProject", e.target.value)}
                            placeholder="e.g. DEVTOOLS"
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Jira project linked to App ID. If auto-link fails, enter manually.
                        </p>
                    </div>
                )}

                {/* ... insert steps 2–6 here (unchanged from your original) */}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                    <button
                        onClick={() => setShowOnboarding(false)}
                        className="text-slate-600 hover:text-slate-800 text-sm"
                    >
                        ← Cancel
                    </button>
                    <div className="space-x-2">
                        <button
                            onClick={handleBack}
                            disabled={step === 0}
                            className="px-4 py-2 bg-slate-200 text-sm rounded hover:bg-slate-300"
                        >
                            Back
                        </button>
                        {step === 0 ? (
                            <button
                                onClick={handleNext}
                                disabled={!appMetadata}
                                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                                Next
                            </button>
                        ) : step < steps.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={() => { /* no-op for now */ }}
                                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                                Create
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4">
                <h1 className="text-xl font-medium text-slate-800">Welcome, Fadzi</h1>
                <p className="text-slate-600 text-sm">
                    You are responsible for {products.length} products.
                </p>
            </div>
            <div
                className="grid gap-6"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
            >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onSelect={onSelect} />
                ))}
                <div onClick={() => setShowOnboarding(true)}>
                    <AddProductCard />
                </div>
            </div>
        </div>
    );
};

export default ProductList;
