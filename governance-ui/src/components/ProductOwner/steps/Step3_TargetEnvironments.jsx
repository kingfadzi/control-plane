import React, { useEffect, useState } from "react";

const fetchServiceInstances = async (appId) => {
    try {
        const res = await fetch(`/applications/${appId}/environments`, {
            headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch instances");

        const data = await res.json();

        return data.map((inst) => ({
            id: inst.instanceCorrelationId,
            name: inst.instanceName,
            environment: inst.environment.toLowerCase(), // normalize
        }));
    } catch (err) {
        console.error("Error fetching service instances:", err);
        throw err;
    }
};

const Step3_TargetEnvironments = ({ formData, updateField }) => {
    const [instances, setInstances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [envError, setEnvError] = useState("");

    // Determine current selected environment (if any)
    const currentEnv = (() => {
        const firstId = formData.instances?.[0];
        const match = instances.find((i) => i.id === firstId);
        return match?.environment || null;
    })();

    const toggleInstance = (instance) => {
        const selected = new Set(formData.instances || []);

        if (selected.has(instance.id)) {
            selected.delete(instance.id);
            updateField("instances", Array.from(selected));
            setEnvError("");
            return;
        }

        if (selected.size > 0 && instance.environment !== currentEnv) {
            setEnvError(
                `You may only select instances from the same environment type (${currentEnv.toUpperCase()}).`
            );
            return;
        }

        selected.add(instance.id);
        updateField("instances", Array.from(selected));
        setEnvError("");
    };

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError("");
            try {
                const result = await fetchServiceInstances(formData.appId);
                setInstances(result);
                if (result.length === 0) {
                    setError("No service instances found for this App ID.");
                }
            } catch {
                setError("Failed to load service instances.");
            }
            setLoading(false);
        };

        if (formData.appId) {
            load();
        }
    }, [formData.appId]);

    // Group instances by environment type
    const groupedByEnv = instances.reduce((acc, inst) => {
        if (!acc[inst.environment]) acc[inst.environment] = [];
        acc[inst.environment].push(inst);
        return acc;
    }, {});

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-slate-700">
                Target Environments (Grouped by Type)
            </label>

            {loading ? (
                <p className="text-sm text-slate-500">Loading instances…</p>
            ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
            ) : (
                <>
                    {envError && (
                        <div className="text-sm text-red-600 font-medium">{envError}</div>
                    )}
                    <div className="space-y-4">
                        {Object.entries(groupedByEnv).map(([env, envInstances]) => {
                            const selectedIds = new Set(formData.instances || []);
                            return (
                                <div key={env}>
                                    <div className="text-slate-500 font-semibold uppercase text-xs mb-1">
                                        {env}
                                    </div>
                                    <div className="space-y-2 ml-4">
                                        {envInstances.map((inst) => (
                                            <label
                                                key={inst.id}
                                                className="flex items-center space-x-2 text-sm"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.has(inst.id)}
                                                    onChange={() => toggleInstance(inst)}
                                                    className="form-checkbox text-blue-600"
                                                />
                                                <span className="text-slate-800">
                                                    {inst.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default Step3_TargetEnvironments;
