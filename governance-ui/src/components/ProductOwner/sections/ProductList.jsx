import React, { useState } from "react";
import ProductCard from "../cards/ProductCard";
import AddProductCard from "../cards/AddProductCard";
import Step0_AppId from "../steps/Step0_AppId";
import Step1_Jira from "../steps/Step1_Jira";
import Step2_RepoSelection from "../steps/Step2_RepoSelection";
import Step3_TargetEnvironments from "../steps/Step3_TargetEnvironments";
import Step4_Artifacts from "../steps/Step4_Artifacts";
import Step5_PrimaryContacts from "../steps/Step5_PrimaryContacts";
import Step6_DeliveryUnitName from "../steps/Step6_DeliveryUnitName";
import Step7_Review from "../steps/Step7_Review";

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
    "Git Repos",
    "Target Environments",
    "Artifacts",
    "Primary Contacts",
    "Delivery Unit Name",
    "Review",
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
        deliveryUnitName: "",
    });

    const [appMetadata, setAppMetadata] = useState(null);
    const [selectedJiraProject, setSelectedJiraProject] = useState(null);
    const [selectedRepos, setSelectedRepos] = useState([]); // ✅ stores { id, name }
    const [instanceMetadata, setInstanceMetadata] = useState([]); // ✅ fetched once in Step 3

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const handleBack = () => setStep((s) => Math.max(s - 1, 0));

    const isNextDisabled =
        (step === 0 && !appMetadata) ||
        (step === 1 && !selectedJiraProject) ||
        (step === 2 && formData.repos.length === 0) ||
        (step === 3 && formData.instances.length === 0) ||
        (step === 4 &&
            (!formData.roadmap ||
                !formData.architectureVision ||
                !formData.serviceVision)) ||
        (step === 5 && formData.contacts.length === 0) ||
        (step === 6 && !formData.deliveryUnitName);

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
                    <Step0_AppId
                        formData={formData}
                        updateField={updateField}
                        appMetadata={appMetadata}
                        setAppMetadata={setAppMetadata}
                    />
                )}
                {step === 1 && (
                    <Step1_Jira
                        formData={formData}
                        updateField={updateField}
                        selectedJiraProject={selectedJiraProject}
                        setSelectedJiraProject={setSelectedJiraProject}
                    />
                )}
                {step === 2 && (
                    <Step2_RepoSelection
                        formData={formData}
                        updateField={updateField}
                        setSelectedRepos={setSelectedRepos} // ✅ pass down
                    />
                )}
                {step === 3 && (
                    <Step3_TargetEnvironments
                        formData={formData}
                        updateField={updateField}
                        setInstanceMetadata={setInstanceMetadata}
                    />
                )}
                {step === 4 && (
                    <Step4_Artifacts
                        formData={formData}
                        updateField={updateField}
                    />
                )}
                {step === 5 && (
                    <Step5_PrimaryContacts
                        formData={formData}
                        updateField={updateField}
                    />
                )}
                {step === 6 && (
                    <Step6_DeliveryUnitName
                        formData={formData}
                        updateField={updateField}
                    />
                )}
                {step === 7 && (
                    <Step7_Review
                        formData={formData}
                        appMetadata={appMetadata}
                        instanceMetadata={instanceMetadata}
                        selectedJiraProject={selectedJiraProject}
                        selectedRepos={selectedRepos} // ✅ used to resolve repo names
                    />
                )}

                {/* Navigation */}
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
                            disabled={isNextDisabled}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                            {step === steps.length - 1 ? "Create" : "Next"}
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
