import React from "react";

const labelClass = "inline-block w-44 text-slate-600";  // Adjust width as needed

const Step7_Review = ({ formData, appMetadata }) => {
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
                <p><span className={labelClass}>App ID:</span>{formData.appId}</p>
                <p>
                    <span className={labelClass}>Business App:</span>
                    {appMetadata?.business_application_name || "—"}
                </p>
                <p>
                    <span className={labelClass}>Transaction Cycle:</span>
                    {appMetadata?.transaction_cycle || "—"}
                </p>
                <p>
                    <span className={labelClass}>Owner:</span>
                    {appMetadata?.application_owner || "—"}
                </p>
                <p>
                    <span className={labelClass}>Architecture Type:</span>
                    {appMetadata?.architecture_type || "—"}
                </p>
                <p>
                    <span className={labelClass}>Application Type:</span>
                    {appMetadata?.application_type || "—"}
                </p>
                <p>
                    <span className={labelClass}>Install Type:</span>
                    {appMetadata?.install_type || "—"}
                </p>
                <p>
                    <span className={labelClass}>Status:</span>
                    {appMetadata?.operational_status || "—"}
                </p>
            </div>

            {/* Jira Project */}
            <div>
                <h3 className="text-base text-slate-700 mb-1 font-medium">Jira Project</h3>
                <p>{formData.jiraProject || "—"}</p>
            </div>

            {/* Selected Repositories */}
            <div>
                <h3 className="text-base text-slate-700 mb-1 font-medium">Selected Repositories</h3>
                <ul className="list-disc ml-5">
                    {formData.repos.length > 0 ? (
                        formData.repos.map((r) => <li key={r}>{r}</li>)
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
                        formData.instances.map((inst, idx) => {
                            if (typeof inst === "string") {
                                return <li key={idx}>{inst}</li>;
                            }
                            const name = inst.application_name || "Unnamed";
                            const env = inst.environment || "Unknown Env";
                            return <li key={idx}>{name} ({env})</li>;
                        })
                    ) : (
                        <li>None selected</li>
                    )}
                </ul>
            </div>

            {/* Governance Artifacts */}
            <div>
                <h3 className="text-base text-slate-700 mb-1 font-medium">Governance Artifacts</h3>
                <p>
                    <span className={labelClass}>Roadmap:</span>
                    {formData.roadmap || "—"}
                </p>
                <p>
                    <span className={labelClass}>Architecture Vision:</span>
                    {formData.architectureVision || "—"}
                </p>
                <p>
                    <span className={labelClass}>Service Vision:</span>
                    {formData.serviceVision || "—"}
                </p>
            </div>

            {/* Assigned Contacts */}
            <div>
                <h3 className="text-base text-slate-700 mb-1 font-medium">Assigned Contacts</h3>
                <ul className="list-disc ml-5">
                    {formData.contacts.length > 0 ? (
                        formData.contacts.map((c, idx) => (
                            <li key={idx}>
                                <span className="text-slate-800">{c.name}</span>
                                {" "}
                                <span className="text-slate-600">({c.email})</span>
                                {" — "}
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
