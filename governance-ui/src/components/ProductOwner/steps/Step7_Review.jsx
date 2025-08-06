import React from "react";

const labelClass = "inline-block w-44 text-slate-600";

const Step7_Review = ({
                          formData,
                          appMetadata,
                          instanceMetadata = [],
                          selectedJiraProject = null,
                          selectedRepos = [],
                      }) => {
    const getLabelForInstance = (id) => {
        const match = instanceMetadata.find(
            (inst) => inst.id === id || inst.instanceCorrelationId === id
        );
        return match ? `${match.name} (${match.environment})` : id;
    };

    const getLabelForRepo = (id) => {
        const match = selectedRepos.find((r) => r.id === id);
        return match ? match.name : id;
    };

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-800">
                Review Onboarding Summary
            </h2>

            {/* Delivery Unit */}
            <div>
                <h3 className="text-base text-slate-700 mb-2 font-medium">Delivery Unit</h3>
                <p>
                    <span className={labelClass}>Name:</span>
                    {formData.deliveryUnitName || "—"}
                </p>
            </div>

            {/* Application Details */}
            <div>
                <h3 className="text-base text-slate-700 mb-2 font-medium">Application Details</h3>
                <p><span className={labelClass}>App ID:</span>{formData.appId || "—"}</p>
                <p><span className={labelClass}>Business App:</span>{appMetadata?.businessAppName || "—"}</p>
                <p><span className={labelClass}>Transaction Cycle:</span>{appMetadata?.transactionCycle || "—"}</p>
                <p><span className={labelClass}>Owner:</span>{appMetadata?.applicationOwner || "—"}</p>
                <p><span className={labelClass}>Architecture Type:</span>{appMetadata?.architectureType || "—"}</p>
                <p><span className={labelClass}>Application Type:</span>{appMetadata?.applicationType || "—"}</p>
                <p><span className={labelClass}>Install Type:</span>{appMetadata?.installType || "—"}</p>
                <p><span className={labelClass}>Status:</span>{appMetadata?.operationalStatus || "—"}</p>
            </div>

            {/* Jira Project */}
            <div>
                <h3 className="text-base text-slate-700 mb-1 font-medium">Jira Project</h3>
                {selectedJiraProject ? (
                    <p>
                        <span className="font-medium text-slate-800">
                            {selectedJiraProject.name}
                        </span>{" "}
                        <span className="text-slate-500">({selectedJiraProject.key})</span>
                    </p>
                ) : (
                    <p>{formData.jiraProject || "—"}</p>
                )}
            </div>

            {/* Repositories */}
            <div>
                <h3 className="text-base text-slate-700 mb-1 font-medium">Selected Repositories</h3>
                <ul className="list-disc ml-5">
                    {formData.repos.length > 0 ? (
                        formData.repos.map((r) => (
                            <li key={r}>{getLabelForRepo(r)}</li>
                        ))
                    ) : (
                        <li>None selected</li>
                    )}
                </ul>
            </div>

            {/* Target Environments */}
            <div>
                <h3 className="text-base text-slate-700 mb-1 font-medium">Target Environments</h3>
                <ul className="list-disc ml-5">
                    {formData.instances.length > 0 ? (
                        formData.instances.map((id, idx) => (
                            <li key={idx}>{getLabelForInstance(id)}</li>
                        ))
                    ) : (
                        <li>None selected</li>
                    )}
                </ul>
            </div>

            {/* Governance Artifacts */}
            <div>
                <h3 className="text-base text-slate-700 mb-1 font-medium">Governance Artifacts</h3>
                <p><span className={labelClass}>Roadmap:</span>{formData.roadmap || "—"}</p>
                <p><span className={labelClass}>Architecture Vision:</span>{formData.architectureVision || "—"}</p>
                <p><span className={labelClass}>Service Vision:</span>{formData.serviceVision || "—"}</p>
            </div>

            {/* Contacts */}
            <div>
                <h3 className="text-base text-slate-700 mb-1 font-medium">Assigned Contacts</h3>
                <ul className="list-disc ml-5">
                    {formData.contacts.length > 0 ? (
                        formData.contacts.map((c, idx) => (
                            <li key={idx}>
                                <span className="text-slate-800">{c.name}</span>{" "}
                                <span className="text-slate-600">({c.email})</span>{" — "}
                                <span className="italic text-slate-700">{c.role}</span>
                            </li>
                        ))
                    ) : (
                        <li>No contacts</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Step7_Review;
