import React, { useEffect, useState } from "react";

// Simulated fetch from service registry
const fetchServiceInstances = async (appId) => {
    const allInstances = {
        APP123042: [
            { id: "svc-dev", name: "DEV - Jumpstart API" },
            { id: "svc-uat", name: "UAT - Jumpstart API" },
            { id: "svc-prod", name: "PROD - Jumpstart API" },
        ],
        APP923114: [
            { id: "svc-dev", name: "DEV - Payments Portal" },
            { id: "svc-test", name: "TEST - Payments Portal" },
        ],
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(allInstances[appId] || []);
        }, 400);
    });
};

const Step3_TargetEnvironments = ({ formData, updateField }) => {
    const [instances, setInstances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const toggleInstance = (id) => {
        const selected = new Set(formData.instances || []);
        selected.has(id) ? selected.delete(id) : selected.add(id);
        updateField("instances", Array.from(selected));
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError("");
            const result = await fetchServiceInstances(formData.appId);
            setInstances(result);
            if (result.length === 0) setError("No service instances found for this App ID.");
            setLoading(false);
        };

        if (formData.appId) {
            load();
        }
    }, [formData.appId]);

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-slate-700">
                Target Environments (ServiceNow Instances)
            </label>

            {loading ? (
                <p className="text-sm text-slate-500">Loading instances…</p>
            ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
            ) : (
                <div className="space-y-2">
                    {instances.map((inst) => (
                        <label key={inst.id} className="flex items-center space-x-2 text-sm">
                            <input
                                type="checkbox"
                                checked={formData.instances?.includes(inst.id)}
                                onChange={() => toggleInstance(inst.id)}
                                className="form-checkbox text-blue-600"
                            />
                            <span className="text-slate-800">{inst.name}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Step3_TargetEnvironments;
