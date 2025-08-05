import React, { useState } from "react";

const fetchJiraProjects = async (query) => {
    const projects = [
        { key: "DEVTOOLS", name: "Developer Tooling" },
        { key: "JUMPSTART", name: "Jumpstart App" },
        { key: "RISKMGMT", name: "Risk Management Platform" },
    ];
    return new Promise((resolve) => {
        setTimeout(() => {
            const results = projects.filter(
                (p) =>
                    p.key.toLowerCase().includes(query.toLowerCase()) ||
                    p.name.toLowerCase().includes(query.toLowerCase())
            );
            resolve(results);
        }, 400);
    });
};

const Step1_Jira = ({
                        formData,
                        updateField,
                        selectedJiraProject,
                        setSelectedJiraProject,
                    }) => {
    const [jiraProjects, setJiraProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        const results = await fetchJiraProjects(formData.jiraProject);
        setJiraProjects(results);
        setLoading(false);
        setError(results.length === 0 ? "No matching Jira projects." : "");
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-slate-700">Search Jira Project</label>
            <input
                value={formData.jiraProject}
                onChange={(e) => {
                    updateField("jiraProject", e.target.value);
                    setSelectedJiraProject(null);
                    setError("");
                    setJiraProjects([]);
                }}
                placeholder="Enter project key or name"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
            <button
                onClick={handleSearch}
                disabled={!formData.jiraProject || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
            >
                {loading ? "Searching..." : "Search"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {jiraProjects.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm text-slate-600">Select a project:</p>
                    {jiraProjects.map((proj) => (
                        <label key={proj.key} className="block text-sm">
                            <input
                                type="radio"
                                name="jiraProject"
                                checked={selectedJiraProject?.key === proj.key}
                                onChange={() => {
                                    setSelectedJiraProject(proj);
                                    updateField("jiraProject", proj.key);
                                }}
                                className="mr-2"
                            />
                            <span className="font-medium text-slate-800">{proj.name}</span>{" "}
                            <span className="text-slate-500">({proj.key})</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Step1_Jira;
