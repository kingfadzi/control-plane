import React, { useState, useEffect } from "react";

const fetchRepos = async (appId) => {
    try {
        const res = await fetch(`/tools/repos/by-app/${appId}`);
        if (!res.ok) throw new Error("Failed to fetch repositories.");
        const data = await res.json();

        const grouped = data.reduce((acc, curr) => {
            const type = curr.toolType?.toLowerCase();
            const id = curr.identifier;

            if (!type || !id) return acc;

            if (!acc[type]) acc[type] = [];
            acc[type].push(id);
            return acc;
        }, {});

        return grouped;
    } catch (err) {
        console.error("Repo fetch failed:", err);
        return {};
    }
};

const Step2_RepoSelection = ({ formData, updateField }) => {
    const [availableRepos, setAvailableRepos] = useState({});
    const [source, setSource] = useState(""); // gitlab, bitbucket, github, etc.
    const [error, setError] = useState("");

    useEffect(() => {
        if (!formData.appId) return;

        const load = async () => {
            const repos = await fetchRepos(formData.appId);
            setAvailableRepos(repos);

            const matchingSource = Object.keys(repos).find(src =>
                formData.repos.every(r => repos[src].includes(r))
            );

            setSource(matchingSource || "");
        };

        load();
    }, [formData.appId]);

    useEffect(() => {
        if (!source || !availableRepos[source]) return;

        const isMismatched = formData.repos.some(
            (r) => !availableRepos[source].includes(r)
        );
        if (isMismatched) {
            updateField("repos", []);
        }
    }, [source]);

    const handleToggleRepo = (repo) => {
        const current = formData.repos;
        const updated = current.includes(repo)
            ? current.filter((r) => r !== repo)
            : [...current, repo];
        updateField("repos", updated);
    };

    const sources = Object.keys(availableRepos);

    return (
        <div className="space-y-6">
            <div>
                <label className="text-sm font-semibold text-slate-700">
                    Select Source System
                </label>
                <div className="flex space-x-4 mt-2">
                    {sources.map((src) => (
                        <button
                            key={src}
                            className={`px-4 py-2 rounded text-sm border ${
                                source === src
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-slate-700 border-slate-300"
                            }`}
                            onClick={() => setSource(src)}
                        >
                            {src.charAt(0).toUpperCase() + src.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {source && availableRepos[source] && (
                <>
                    <div>
                        <label className="text-sm font-semibold text-slate-700">
                            Select Repositories from {source.charAt(0).toUpperCase() + source.slice(1)}
                        </label>
                        <div className="space-y-2 mt-2">
                            {availableRepos[source].map((repo) => (
                                <label key={repo} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.repos.includes(repo)}
                                        onChange={() => handleToggleRepo(repo)}
                                        className="accent-blue-600"
                                    />
                                    <span className="text-sm text-slate-700">{repo}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs text-slate-500 pt-2">
                        You may only select repositories from a single source.
                    </p>
                </>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default Step2_RepoSelection;
