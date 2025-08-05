import React, { useState } from "react";
import ProductCard from "../cards/ProductCard";
import AddProductCard from "../cards/AddProductCard";

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
    "Service Instances",
    "Artifacts",
    "Primary Contacts",
    "Review",
    "Create Delivery Unit",
];

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

                {/* Step Content */}
                {step === 0 && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">App ID</label>
                        <input
                            type="text"
                            value={formData.appId}
                            onChange={(e) => updateField("appId", e.target.value)}
                            placeholder="e.g. APP123042"
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                        />
                    </div>
                )}

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

                {step === 2 && (
                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-slate-700">
                            Select GitLab Repositories
                        </label>
                        <div className="space-y-2">
                            {["devtools-fe", "devtools-api", "devtools-utils", "devtools-auth", "infra-scripts"].map((repo) => {
                                const isChecked = formData.repos.includes(repo);
                                return (
                                    <label key={repo} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {
                                                const updatedRepos = isChecked
                                                    ? formData.repos.filter((r) => r !== repo)
                                                    : [...formData.repos, repo];
                                                updateField("repos", updatedRepos);
                                            }}
                                        />
                                        <span className="text-slate-700 text-sm">{repo}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <p className="text-xs text-slate-500">
                            Only selected repositories will be included in the governance scope of this Delivery Unit.
                        </p>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-slate-700">
                            Select Target Service Instances
                        </label>
                        <div className="space-y-2">
                            {["UAT-SI-001", "DR-SI-002", "PROD-SI-003", "PROD-SI-004", "PERF-SI-005"].map((instance) => {
                                const isChecked = formData.instances.includes(instance);
                                return (
                                    <label key={instance} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {
                                                const updatedInstances = isChecked
                                                    ? formData.instances.filter((i) => i !== instance)
                                                    : [...formData.instances, instance];
                                                updateField("instances", updatedInstances);
                                            }}
                                        />
                                        <span className="text-slate-700 text-sm">{instance}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <p className="text-xs text-slate-500">
                            A Change Request (CR) will be created for each selected instance during release.
                        </p>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-slate-700">
                            Link Governance Artifacts
                        </label>
                        <input
                            type="text"
                            value={formData.roadmap}
                            onChange={(e) => updateField("roadmap", e.target.value)}
                            placeholder="Roadmap URL"
                            className="w-full p-2 border border-slate-300 rounded"
                        />
                        <input
                            type="text"
                            value={formData.architectureVision}
                            onChange={(e) => updateField("architectureVision", e.target.value)}
                            placeholder="Architecture Vision URL"
                            className="w-full p-2 border border-slate-300 rounded"
                        />
                        <input
                            type="text"
                            value={formData.serviceVision}
                            onChange={(e) => updateField("serviceVision", e.target.value)}
                            placeholder="Service Vision URL"
                            className="w-full p-2 border border-slate-300 rounded"
                        />
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-slate-700">
                            Add Primary Contacts
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <select
                                value={newContact.type}
                                onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
                                className="p-2 border border-slate-300 rounded w-full sm:w-1/2"
                            >
                                <option value="">Select Contact Type</option>
                                <option>Product Owner</option>
                                <option>Architecture Owner</option>
                                <option>Agile Team Lead</option>
                                <option>Service Owner</option>
                                <option>Accessibility SME</option>
                                <option>Data Architecture SME</option>
                                <option>Enterprise Architecture SME</option>
                                <option>Security SME</option>
                                <option>Service Transition SME</option>
                            </select>
                            <input
                                type="text"
                                value={newContact.name}
                                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                                placeholder="Contact Name or Email"
                                className="p-2 border border-slate-300 rounded w-full sm:w-1/2"
                            />
                            <button
                                onClick={handleAddContact}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                disabled={!newContact.type || !newContact.name}
                            >
                                Add
                            </button>
                        </div>
                        {formData.contacts.length > 0 && (
                            <ul className="divide-y border border-slate-200 rounded">
                                {formData.contacts.map((c, idx) => (
                                    <li key={idx} className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-slate-800">
                      <strong>{c.type}:</strong> {c.name}
                    </span>
                                        <button
                                            onClick={() => handleRemoveContact(idx)}
                                            className="text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {step === 6 && (
                    <div className="space-y-4 text-sm text-slate-700">
                        <h3 className="text-base font-semibold">Review Delivery Unit Details</h3>

                        <div><strong>App ID:</strong> {formData.appId}</div>
                        <div><strong>Jira Project:</strong> {formData.jiraProject}</div>

                        <div>
                            <strong>Repositories:</strong>
                            <ul className="list-disc ml-6">
                                {formData.repos.map((repo) => (
                                    <li key={repo}>{repo}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <strong>Service Instances:</strong>
                            <ul className="list-disc ml-6">
                                {formData.instances.map((si) => (
                                    <li key={si}>{si}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <strong>Artifacts:</strong>
                            <ul className="list-disc ml-6">
                                <li><strong>Roadmap:</strong> {formData.roadmap}</li>
                                <li><strong>Architecture Vision:</strong> {formData.architectureVision}</li>
                                <li><strong>Service Vision:</strong> {formData.serviceVision}</li>
                            </ul>
                        </div>

                        <div>
                            <strong>Primary Contacts:</strong>
                            <ul className="list-disc ml-6">
                                {formData.contacts.map((c, i) => (
                                    <li key={i}>{c.type}: {c.name}</li>
                                ))}
                            </ul>
                        </div>

                        <p className="text-xs text-slate-500 pt-2">
                            Confirm all information is accurate. You can go back to make edits.
                        </p>
                    </div>
                )}

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
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                            {step === steps.length - 1 ? "Finish" : "Next"}
                        </button>
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
