import React from "react";

const Step6_DeliveryUnitName = ({ formData, updateField }) => {
    return (
        <div className="space-y-4">
            <label htmlFor="du-name" className="text-sm font-medium text-slate-700">
                Delivery Unit Name
            </label>
            <input
                id="du-name"
                type="text"
                value={formData.deliveryUnitName || ""}
                onChange={(e) => updateField("deliveryUnitName", e.target.value)}
                placeholder="e.g. Jumpstart Delivery Unit"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />

            <p className="text-xs text-slate-500">
                Choose a name to identify this onboarding configuration. This will appear in governance dashboards.
            </p>
        </div>
    );
};

export default Step6_DeliveryUnitName;
