import React, { useState } from "react";

const fetchAppMetadata = async (appId) => {
    const db = {
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
    return new Promise((resolve) =>
        setTimeout(() => resolve(db[appId] || null), 500)
    );
};

const Step0_AppId = ({ formData, updateField, appMetadata, setAppMetadata }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLookup = async () => {
        setLoading(true);
        setError("");
        const result = await fetchAppMetadata(formData.appId);
        if (result) {
            setAppMetadata(result);
        } else {
            setAppMetadata(null);
            setError("App not found.");
        }
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-slate-700">App ID</label>
            <input
                type="text"
                value={formData.appId}
                onChange={(e) => {
                    updateField("appId", e.target.value);
                    setAppMetadata(null);
                    setError("");
                }}
                placeholder="e.g. APP123042"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
            <button
                onClick={handleLookup}
                disabled={!formData.appId || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
            >
                {loading ? "Loading..." : "Load App Details"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
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
    );
};

export default Step0_AppId;
