import React from "react";

const Step4_Artifacts = ({ formData, updateField }) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-slate-700">Product Roadmap</label>
                <input
                    type="text"
                    placeholder="e.g. https://confluence.company.com/roadmap"
                    value={formData.roadmap}
                    onChange={(e) => updateField("roadmap", e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-slate-700">Architecture Vision</label>
                <input
                    type="text"
                    placeholder="e.g. https://confluence.company.com/architecture"
                    value={formData.architectureVision}
                    onChange={(e) => updateField("architectureVision", e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-slate-700">Service Vision</label>
                <input
                    type="text"
                    placeholder="e.g. https://confluence.company.com/service-vision"
                    value={formData.serviceVision}
                    onChange={(e) => updateField("serviceVision", e.target.value)}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                />
            </div>
        </div>
    );
};

export default Step4_Artifacts;
