import React, { useState, useEffect } from "react";

// Mocked source-specific repo lists
const REPO_SOURCES = {
    gitlab: [
        "devtools-fe",
        "devtools-api",
        "infra-scripts",
        "auth-service",
        "ci-templates",
    ],
    bitbucket: [
        "bb-frontend",
        "bb-backend",
        "bb-utils",
        "bb-data-pipeline",
    ],
};

const Step2_RepoSelection = ({ formData, updateField }) => {
    const [source, setSource] = useState(""); // gitlab or bitbucket
    const [availableRepos, setAvailableRepos] = useState([]);

    useEffect(() => {
        if (!source) {
            setAvailableRepos([]);
            return;
        }

        // Only reset repos if previously selected repos belong to a different source
        const isMismatched = formData.repos.some(
            (r) => !REPO_SOURCES[source].includes(r)
        );

        if (isMismatched) {
            updateField("repos", []);
        }

        setAvailableRepos(REPO_SOURCES[source]);
    }, [source]);


    const handleToggleRepo = (repo) => {
        const current = formData.repos;
        const updated = current.includes(repo)
            ? current.filter((r) => r !== repo)
            : [...current, repo];
        updateField("repos", updated);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="text-sm font-semibold text-slate-700">
                    Select Source System
                </label>
                <div className="flex space-x-4 mt-2">
                    {["gitlab", "bitbucket"].map((src) => (
                        <button
                            key={src}
                            className={`px-4 py-2 rounded text-sm border ${
                                source === src
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-slate-700 border-slate-300"
                            }`}
                            onClick={() => setSource(src)}
                        >
                            {src === "gitlab" ? "GitLab" : "Bitbucket"}
                        </button>
                    ))}
                </div>
            </div>

            {source && (
                <>
                    <div>
                        <label className="text-sm font-semibold text-slate-700">
                            Select Repositories from {source.charAt(0).toUpperCase() + source.slice(1)}
                        </label>
                        <div className="space-y-2 mt-2">
                            {availableRepos.map((repo) => (
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
        </div>
    );
};

export default Step2_RepoSelection;
