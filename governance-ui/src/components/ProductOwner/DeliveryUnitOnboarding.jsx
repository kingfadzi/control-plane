import React, { useState } from "react";

const steps = [
    "App ID",
    "Jira Project",
    "GitLab Repos",
    "Service Instances",
    "Artifacts",
    "Policies",
    "Create Delivery Unit",
];

const DeliveryUnitOnboarding = ({ onCancel }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        appId: "APP123042",
        jiraProject: "DEVTOOLS",
        repos: ["devtools-fe", "devtools-api", "devtools-utils"],
        instances: ["UAT-001", "PROD-010"],
        roadmap: "https://confluence.example.com/devtools-roadmap",
        architectureVision: "https://confluence.example.com/devtools-architecture",
        serviceVision: "https://confluence.example.com/devtools-services",
        policyProfile: "default",
        duName: "devtools-q4-platform",
    });

    const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const handleBack = () => setStep((s) => Math.max(s - 1, 0));
    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-xl mx-auto font-sans">
            {/* Step Tracker */}
            <div className="mb-6">
                <div className="text-sm font-medium text-gray-700">
                    Step {step + 1} of {steps.length}: <span className="font-semibold">{steps[step]}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded mt-1">
                    <div
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <div className="space-y-4">
                {step === 0 && (
                    <input
                        type="text"
                        value={formData.appId}
                        onChange={(e) => updateField("appId", e.target.value)}
                        placeholder="App ID"
                        className="w-full p-2 border rounded"
                    />
                )}

                {step === 1 && (
                    <input
                        type="text"
                        value={formData.jiraProject}
                        onChange={(e) => updateField("jiraProject", e.target.value)}
                        placeholder="Jira Project Key"
                        className="w-full p-2 border rounded"
                    />
                )}

                {step === 2 && (
                    <textarea
                        value={formData.repos.join(", ")}
                        onChange={(e) => updateField("repos", e.target.value.split(",").map(r => r.trim()))}
                        placeholder="GitLab Repos (comma-separated)"
                        rows={3}
                        className="w-full p-2 border rounded"
                    />
                )}

                {step === 3 && (
                    <textarea
                        value={formData.instances.join(", ")}
                        onChange={(e) => updateField("instances", e.target.value.split(",").map(i => i.trim()))}
                        placeholder="Service Instances (comma-separated)"
                        rows={2}
                        className="w-full p-2 border rounded"
                    />
                )}

                {step === 4 && (
                    <>
                        <input
                            type="text"
                            value={formData.roadmap}
                            onChange={(e) => updateField("roadmap", e.target.value)}
                            placeholder="Roadmap URL"
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="text"
                            value={formData.architectureVision}
                            onChange={(e) => updateField("architectureVision", e.target.value)}
                            placeholder="Architecture Vision URL"
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="text"
                            value={formData.serviceVision}
                            onChange={(e) => updateField("serviceVision", e.target.value)}
                            placeholder="Service Vision URL"
                            className="w-full p-2 border rounded"
                        />
                    </>
                )}

                {step === 5 && (
                    <select
                        value={formData.policyProfile}
                        onChange={(e) => updateField("policyProfile", e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="default">Default Policy</option>
                        <option value="strict">Strict Policy</option>
                        <option value="custom">Custom Policy</option>
                    </select>
                )}

                {step === 6 && (
                    <>
                        <input
                            type="text"
                            value={formData.duName}
                            onChange={(e) => updateField("duName", e.target.value)}
                            placeholder="Delivery Unit Name"
                            className="w-full p-2 border rounded"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            The Delivery Unit links your App ID, Jira board, GitLab repos, artifacts, and service instances into a governed entity.
                        </p>
                    </>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={onCancel}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    Cancel
                </button>
                <div className="space-x-2">
                    <button
                        onClick={handleBack}
                        disabled={step === 0}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        {step === steps.length - 1 ? "Finish" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryUnitOnboarding;
